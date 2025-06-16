package handlers

import (
	"context"
	"errors"
	"fmt"
	"mime/multipart"
	"net/http"
	"os"
	"profilefolio/pkg"
	services "profilefolio/services"
	"profilefolio/utils"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

type ResumeRoasterHandler struct {
	service    *services.ResumeRoaster
	jobManager *pkg.JobManager
}

func NewResumeRoasterHandler(service *services.ResumeRoaster, cache pkg.CacheClient) *ResumeRoasterHandler {
	return &ResumeRoasterHandler{
		service:    service,
		jobManager: pkg.NewJobManager(cache),
	}
}

func (h *ResumeRoasterHandler) AnalyzeResume(c *gin.Context) {
	// 1. FIRST read the file in the main handler
	file, header, err := c.Request.FormFile("resume")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get file from request"})
		return
	}
	defer file.Close()

	// 2. Create job only AFTER file is successfully read
	jobID, err := h.jobManager.CreateJob(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create job"})
		return
	}

	// 3. Process in background with the ALREADY READ file data
	go h.processResumeAsync(file, header, jobID)

	c.JSON(http.StatusAccepted, gin.H{
		"status": "processing",
		"jobId": jobID,
	})
}

func (h *ResumeRoasterHandler) processResumeAsync(file multipart.File, header *multipart.FileHeader, jobID string) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Now we can safely process the file
	tempFile, err := utils.CreateTempFile(file, header)
	if err != nil {
		h.jobManager.FailJob(ctx, jobID, fmt.Errorf("failed to create temp file: %v", err))
		return
	}
	defer os.Remove(tempFile)

	text, err := utils.ExtractTextFromFile(tempFile, header.Header.Get("Content-Type"))
	if err != nil {
		h.jobManager.FailJob(ctx, jobID, fmt.Errorf("failed to extract text: %v", err))
		return
	}

	if strings.TrimSpace(text) == "" {
		h.jobManager.FailJob(ctx, jobID, fmt.Errorf("no readable text found"))
		return
	}

	result, err := h.service.RoastResume(ctx, text) // Pass timeout context
	if err != nil {
		h.jobManager.FailJob(ctx, jobID, fmt.Errorf("AI analysis failed: %v", err))
		return
	}

	h.jobManager.CompleteJob(ctx, jobID, result)
}

func (h *ResumeRoasterHandler) CheckJobStatus(c *gin.Context) {
	jobID := c.Param("job_id")
	if jobID == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "job_id is required"})
		return
	}

	result, err := h.jobManager.GetJobStatus(c.Request.Context(), jobID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, result)
}

func (h *ResumeRoasterHandler) GetAllAnalyses(c *gin.Context) {
	// Implementation from your original GET /api/analyses
	fmt.Printf("Hey hi")
	c.JSON(http.StatusOK, "Hey")
}

func (h *ResumeRoasterHandler) ReactToAnalysis(c *gin.Context) {
	// Extract and validate ID
	idStr := c.Param("id")
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	// Parse request body
	var req struct {
		Reaction     string `json:"reaction" binding:"required"`
		PrevReaction string `json:"prevReaction,omitempty"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	// Process reaction
	ctx := c.Request.Context()
	err = h.service.UpdateReaction(ctx, id, req.Reaction, req.PrevReaction)
	if err != nil {
		switch {
		case errors.Is(err, pkg.ErrItemNotFound):
			c.JSON(http.StatusNotFound, gin.H{"error": "Analysis not found"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update reaction"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Reaction updated successfully"})
}

func (h *ResumeRoasterHandler) GetAnalysis(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "analysis ID is required"})
		return
	}

	analysis, err := h.service.GetAnalysis(c.Request.Context(), id)
	if err != nil {
		switch err {
		case pkg.ErrItemNotFound:
			c.JSON(http.StatusNotFound, gin.H{"error": "analysis not found"})
		default:
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch analysis"})
		}
		return
	}

	c.JSON(http.StatusOK, analysis)
}
