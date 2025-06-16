package utils

import (
	"bytes"
	"io"
	"mime"
	"mime/multipart"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

func CreateTempFile(file io.Reader, header *multipart.FileHeader) (string, error) {
	var buf bytes.Buffer
	if _, err := io.Copy(&buf, file); err != nil {
		return "", err
	}

	tempDir := os.TempDir()
	tempFile := filepath.Join(tempDir, header.Filename)
	if err := os.WriteFile(tempFile, buf.Bytes(), 0644); err != nil {
		return "", err
	}

	return tempFile, nil
}

func ExtractTextFromFile(filepath string, contentType string) (string, error) {
	content, err := os.ReadFile(filepath)
	if err != nil {
		return "", err
	}

	mediaType, _, err := mime.ParseMediaType(contentType)
	if err != nil {
		return "", err
	}

	switch mediaType {
	case "text/plain":
		return string(content), nil
	case "application/pdf":
		return extractTextFromPDF(content)
	case "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
		return extractTextFromDOCX(content)
	default:
		return string(content), nil
	}
}

func extractTextFromPDF(content []byte) (string, error) {
	// Basic text extraction - consider using a proper PDF library in production
	text := string(content)
	re := regexp.MustCompile(`[^\x20-\x7E\n\r\t]`)
	text = re.ReplaceAllString(text, " ")
	re = regexp.MustCompile(`\s+`)
	text = re.ReplaceAllString(text, " ")
	return strings.TrimSpace(text), nil
}

func extractTextFromDOCX(content []byte) (string, error) {
	// Basic text extraction - consider using a proper DOCX library in production
	text := string(content)
	re := regexp.MustCompile(`[^\x20-\x7E\n\r\t]`)
	text = re.ReplaceAllString(text, " ")
	re = regexp.MustCompile(`\s+`)
	text = re.ReplaceAllString(text, " ")
	return strings.TrimSpace(text), nil
}
