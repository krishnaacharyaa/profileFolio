package routes

import (
	"profilefolio/api/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterAnalysisRoutes(router *gin.RouterGroup, roasterHandler *handlers.ResumeRoasterHandler) {
	router.POST("/api/analyze", roasterHandler.AnalyzeResume)
	router.GET("/api/get", roasterHandler.GetAllAnalyses) // Now matches frontend calls
	router.GET("/api/analyses", roasterHandler.GetAllAnalyses)
	router.GET("/api/analyses/:id", roasterHandler.GetAnalysis)
	router.POST("/api/analyses/:id/react", roasterHandler.ReactToAnalysis)
	router.GET("/api/job-status/:job_id", roasterHandler.CheckJobStatus)
}
