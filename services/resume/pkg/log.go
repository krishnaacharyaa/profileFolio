package pkg

import (
	"context"
	"fmt"
	"os"
	"time"
)

// Log writes a formatted message to stdout with timestamp
func Log(format string, args ...interface{}) {
	timestamp := time.Now().Format("2006/01/02 15:04:05")
	message := fmt.Sprintf(format, args...)
	fmt.Printf("%s %s\n", timestamp, message)
}

// ContextLog writes a formatted message with context values
func ContextLog(ctx context.Context, format string, args ...interface{}) {
	timestamp := time.Now().Format("2006/01/02 15:04:05")

	// Get request ID from context if available
	requestID := "unknown"
	if id, ok := ctx.Value("request_id").(string); ok {
		requestID = id
	}

	message := fmt.Sprintf(format, args...)
	fmt.Printf("%s [%s] %s\n", timestamp, requestID, message)
}

// Error writes an error message to stderr
func Error(format string, args ...interface{}) {
	timestamp := time.Now().Format("2006/01/02 15:04:05")
	message := fmt.Sprintf(format, args...)
	fmt.Fprintf(os.Stderr, "%s ERROR: %s\n", timestamp, message)
}
