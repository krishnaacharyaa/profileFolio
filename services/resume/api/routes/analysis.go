package routes

import (
	"profilefolio/api/handlers"

	"github.com/gin-gonic/gin"
)

func RegisterAnalysisRoutes(router *gin.RouterGroup, roasterHandler *handlers.ResumeRoasterHandler) {
	router.POST("/analyze", roasterHandler.AnalyzeResume)
	router.GET("/get", roasterHandler.GetAllAnalyses)
	router.GET("/analyses", roasterHandler.GetAllAnalyses)
	router.GET("/analyses/:id", roasterHandler.GetAnalysis)
	router.POST("/analyses/:id/react", roasterHandler.ReactToAnalysis)
}
