package analysis

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"profilefolio/pkg"
	"strconv"

	"github.com/google/uuid"
)

type AnalysisRepository interface {
	Create(ctx context.Context, analysis *RoastAnalysis) (uuid.UUID, error)
	GetByID(ctx context.Context, id uuid.UUID) (*ResumeAnalysisRecord, error)
	IncrementViewCount(ctx context.Context, id uuid.UUID) error
	AddReaction(ctx context.Context, id uuid.UUID, reaction string) error
}

type analysisRepo struct {
	db pkg.Database
}

func NewAnalysisRepository(db pkg.Database) AnalysisRepository {
	return &analysisRepo{db: db}
}

func (r *analysisRepo) Create(ctx context.Context, analysis *RoastAnalysis) (uuid.UUID, error) {
	var id uuid.UUID
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO resume_analyses (name, ai_risk, roast, reactions) 
		VALUES ($1, $2, $3, $4) 
		RETURNING id`,
		analysis.Name,
		analysis.AIRisk,
		analysis.Roast,
		`[0,0,0,0,0]`, // Initialize with zero reactions
	).Scan(&id)

	if err != nil {
		return uuid.Nil, fmt.Errorf("failed to create analysis: %w", err)
	}
	return id, nil
}

func (r *analysisRepo) GetByID(ctx context.Context, id uuid.UUID) (*ResumeAnalysisRecord, error) {
	var analysis ResumeAnalysisRecord
	var reactionsJSON []byte

	err := r.db.QueryRowContext(ctx,
		`SELECT id, name, ai_risk, roast, analysis_date, view_count, reactions 
		FROM resume_analyses WHERE id = $1`,
		id,
	).Scan(
		&analysis.Id,
		&analysis.Name,
		&analysis.AIRisk,
		&analysis.Roast,
		&analysis.AnalysisDate,
		&analysis.ViewCount,
		&reactionsJSON,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, errors.New("analysis not found")
		}
		return nil, fmt.Errorf("failed to get analysis: %w", err)
	}

	// Parse reactions JSON array
	if len(reactionsJSON) > 0 {
		var tempReactions []int8
		if err := json.Unmarshal(reactionsJSON, &tempReactions); err != nil {
			return nil, fmt.Errorf("failed to unmarshal reactions: %w", err)
		}
		// Copy to fixed array
		for i := 0; i < 5 && i < len(tempReactions); i++ {
			analysis.Reactions[i] = tempReactions[i]
		}
	}

	return &analysis, nil
}

func (r *analysisRepo) IncrementViewCount(ctx context.Context, id uuid.UUID) error {
	result, err := r.db.ExecContext(ctx,
		`UPDATE resume_analyses 
        SET view_count = view_count + 1 
        WHERE id = $1`,
		id,
	)
	if err != nil {
		return fmt.Errorf("failed to increment view count: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to check rows affected: %w", err)
	}

	if rowsAffected == 0 {
		return fmt.Errorf("no analysis found with id %s", id.String())
	}

	return nil
}

func (r *analysisRepo) AddReaction(ctx context.Context, id uuid.UUID, reaction string) error {
	reactionIndex, exists := ReactionToIndex[reaction]
	if !exists {
		pkg.Error("Invalid reaction type: %s", reaction)
		return errors.New("invalid reaction type")
	}

	pkg.ContextLog(ctx, "Attempting to update reaction for analysis %s with %s (index %d)",
		id, reaction, reactionIndex)

	query := `
		UPDATE resume_analyses 
		SET reactions = jsonb_set(
			reactions, 
			$1::text[], 
			((reactions->>$2)::int + 1)::text::jsonb
		)
		WHERE id = $3
	`

	indexPath := fmt.Sprintf("{%d}", reactionIndex)
	indexStr := strconv.Itoa(reactionIndex)

	pkg.ContextLog(ctx, "Executing SQL: %s with params: path=%s, index=%s, id=%s",
		query, indexPath, indexStr, id)

	result, err := r.db.ExecContext(ctx, query, indexPath, indexStr, id)
	if err != nil {
		pkg.Error("Failed to execute reaction update for %s: %v", id, err)
		return fmt.Errorf("failed to update reaction: %w", err)
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		pkg.Error("Failed to get rows affected for %s: %v", id, err)
		return fmt.Errorf("failed to check rows affected: %w", err)
	}

	pkg.ContextLog(ctx, "Rows affected: %d for analysis %s", rowsAffected, id)

	if rowsAffected == 0 {
		pkg.Error("No analysis found with ID: %s", id)
		return pkg.ErrItemNotFound
	}

	pkg.ContextLog(ctx, "Successfully updated reaction %s for analysis %s", reaction, id)
	return nil
}
