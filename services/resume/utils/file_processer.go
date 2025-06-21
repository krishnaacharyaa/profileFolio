package utils

import (
	"bytes"
	"fmt"
	"io"
	"log"
	"mime"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"

	"github.com/ledongthuc/pdf"
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
	log.Printf("Extracting text from file: %s, Content-Type: %s", filepath, contentType)

	mediaType, _, err := mime.ParseMediaType(contentType)
	if err != nil {
		log.Printf("Failed to parse Content-Type: %v", err)
		return "", fmt.Errorf("failed to parse Content-Type: %v", err)
	}

	switch mediaType {
	case "text/plain":
		content, err := os.ReadFile(filepath)
		if err != nil {
			log.Printf("Failed to read text file: %v", err)
			return "", fmt.Errorf("failed to read file: %v", err)
		}
		return string(content), nil
	case "application/pdf":
		f, r, err := pdf.Open(filepath)
		if err != nil {
			log.Printf("Failed to open PDF: %v", err)
			return "", fmt.Errorf("failed to open PDF: %v", err)
		}
		defer f.Close()

		var buf bytes.Buffer
		b, err := r.GetPlainText()
		if err != nil {
			log.Printf("Failed to extract PDF text: %v", err)
			return "", fmt.Errorf("failed to extract PDF text: %v", err)
		}
		_, err = io.Copy(&buf, b)
		if err != nil {
			log.Printf("Failed to read PDF text: %v", err)
			return "", fmt.Errorf("failed to read PDF text: %v", err)
		}

		text := strings.TrimSpace(buf.String())
		log.Printf("Extracted PDF text length: %d, sample: %s", len(text), truncate(text, 100))
		if text == "" {
			log.Printf("No readable text found in PDF")
			return "", fmt.Errorf("no readable text found in PDF")
		}
		return text, nil
	case "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
		// Implement DOCX extraction if needed (e.g., using github.com/unidoc/unioffice)
		log.Printf("DOCX extraction not implemented")
		return "", fmt.Errorf("DOCX extraction not supported")
	default:
		log.Printf("Unsupported Content-Type: %s", mediaType)
		return "", fmt.Errorf("unsupported Content-Type: %s", mediaType)
	}
}

func truncate(s string, n int) string {
	if len(s) <= n {
		return s
	}
	return s[:n] + "..."
}
