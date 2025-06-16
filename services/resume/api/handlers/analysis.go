package handlers

import (
	"errors"
	"net/http"
	"os"
	services "profilefolio/internal"
	"profilefolio/pkg"
	"profilefolio/utils"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type ResumeRoasterHandler struct {
	service *services.ResumeRoaster
}

func NewResumeRoasterHandler(service *services.ResumeRoaster) *ResumeRoasterHandler {
	return &ResumeRoasterHandler{service: service}
}

func (h *ResumeRoasterHandler) AnalyzeResume(c *gin.Context) {
	file, header, err := c.Request.FormFile("resume")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to get file from request"})
		return
	}
	defer file.Close()

	// Create temporary file
	tempFile, err := utils.CreateTempFile(file, header)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to process file"})
		return
	}
	defer os.Remove(tempFile)

	// Extract text from file
	text, err := utils.ExtractTextFromFile(tempFile, header.Header.Get("Content-Type"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to extract text from file"})
		return
	}

	if strings.TrimSpace(text) == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No readable text found in the file"})
		return
	}

	// Analyze with AI
	result, err := h.service.RoastResume(c.Request.Context(), text)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to analyze resume"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func (h *ResumeRoasterHandler) GetAllAnalyses(c *gin.Context) {
	// Implementation from your original GET /api/analyses
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
