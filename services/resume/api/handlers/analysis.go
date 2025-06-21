package handlers

import (
	"context"
	"errors"
	"fmt"
	"log"
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
	"github.com/inngest/inngestgo"
)

type ResumeRoasterHandler struct {
	service       *services.ResumeRoaster
	jobManager    *pkg.JobManager
	inngestClient inngestgo.Client
}

func NewResumeRoasterHandler(service *services.ResumeRoaster, cache pkg.CacheClient, inngestClient *inngestgo.Client) *ResumeRoasterHandler {
	return &ResumeRoasterHandler{
		service:       service,
		jobManager:    pkg.NewJobManager(cache),
		inngestClient: *inngestClient,
	}
}

func (h *ResumeRoasterHandler) AnalyzeResume(c *gin.Context) {
	file, header, err := c.Request.FormFile("resume")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get file from request"})
		return
	}
	defer file.Close()

	jobID, err := h.jobManager.CreateJob(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create job"})
		return
	}

	h.processResumeAsync(file, header, jobID)

	c.JSON(http.StatusAccepted, gin.H{
		"status": "processing",
		"jobId":  jobID,
	})
}

func (h *ResumeRoasterHandler) processResumeAsync(file multipart.File, header *multipart.FileHeader, jobID string) {
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
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

	trimmedText := text
	const maxTextLength = 100 * 1024 // 100 KB
	if len(trimmedText) > maxTextLength {
		log.Printf("Text too large for jobID %s, truncating from %d to %d bytes", jobID, len(trimmedText), maxTextLength)
		trimmedText = trimmedText[:maxTextLength]
	}
	log.Printf("Extracted text for jobID %s, length: %d, sample: %s", jobID, len(trimmedText))

	err = h.sendResumeAnalyserEvent(ctx, trimmedText, jobID)
	if err != nil {
		log.Printf("Failed to send api/account.created event for jobID %s: %v", jobID, err)
		// Optionally fail the job or continue based on your requirements
		// h.jobManager.FailJob(ctx, jobID, fmt.Errorf("failed to send event: %v", err))
		// return
	}

	return
}

// sendAccountCreatedEvent sends the api/account.created event using the Inngest client
func (h *ResumeRoasterHandler) sendResumeAnalyserEvent(ctx context.Context, text, jobId string) error {

	fmt.Printf("Sending resume analyser event %s %s", text, jobId)
	event := inngestgo.Event{
		Name: "api/resume-analyser",
		Data: map[string]interface{}{
			"text":  text,
			"jobId": jobId,
		},
	}

	_, err := h.inngestClient.Send(ctx, event)
	if err != nil {
		return fmt.Errorf("failed to send event: %v", err)
	}

	return nil
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
