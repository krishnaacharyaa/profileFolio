package pkg

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
)

const (
	jobPrefix      = "resume_job:"
	defaultExpiry  = 24 * time.Hour
	pollingTimeout = 30 * time.Second
)

type JobStatus string

const (
	StatusProcessing JobStatus = "processing"
	StatusCompleted  JobStatus = "completed"
	StatusFailed     JobStatus = "failed"
)

type JobResult struct {
	Status JobStatus   `json:"status"`
	Data   interface{} `json:"data,omitempty"`
	Error  string      `json:"error,omitempty"`
}

type JobManager struct {
	cache CacheClient
}

func NewJobManager(cache CacheClient) *JobManager {
	return &JobManager{cache: cache}
}

// CreateJob creates a new job and returns its ID
func (jm *JobManager) CreateJob(ctx context.Context) (string, error) {
	jobID := uuid.New().String()
	key := jobPrefix + jobID

	initialStatus := JobResult{
		Status: StatusProcessing,
	}

	if err := jm.cache.Set(ctx, key, initialStatus, defaultExpiry); err != nil {
		return "", fmt.Errorf("failed to create job: %w", err)
	}

	return jobID, nil
}

// GetJobStatus retrieves the current status of a job
func (jm *JobManager) GetJobStatus(ctx context.Context, jobID string) (JobResult, error) {
	key := jobPrefix + jobID
	var result JobResult

	found, err := jm.cache.Get(ctx, key, &result)
	if err != nil {
		return JobResult{}, fmt.Errorf("failed to get job status: %w", err)
	}

	if !found {
		return JobResult{}, errors.New("job not found")
	}

	return result, nil
}

// CompleteJob marks a job as completed with the given result
func (jm *JobManager) CompleteJob(ctx context.Context, jobID string, result interface{}) error {
	key := jobPrefix + jobID

	jobResult := JobResult{
		Status: StatusCompleted,
		Data:   result,
	}

	return jm.cache.Set(ctx, key, jobResult, defaultExpiry)
}

// FailJob marks a job as failed with the given error
func (jm *JobManager) FailJob(ctx context.Context, jobID string, err error) error {
	key := jobPrefix + jobID

	jobResult := JobResult{
		Status: StatusFailed,
		Error:  err.Error(),
	}

	return jm.cache.Set(ctx, key, jobResult, defaultExpiry)
}
