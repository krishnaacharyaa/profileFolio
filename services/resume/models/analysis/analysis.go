package analysis

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"profilefolio/pkg"

	"github.com/google/uuid"
)

type AnalysisRepository interface {
	Create(ctx context.Context, analysis *RoastAnalysis) (uuid.UUID, error)
	GetByID(ctx context.Context, id uuid.UUID) (*ResumeAnalysisRecord, error)
	IncrementViewCount(ctx context.Context, id uuid.UUID) error
	UpdateReactions(ctx context.Context, id int64, reaction string, prevReaction string) error
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
		`INSERT INTO resume_analyses (name, ai_risk, roast) 
		VALUES ($1, $2, $3) 
		RETURNING id`,
		analysis.Name,
		analysis.AIRisk,
		analysis.Roast,
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

	if len(reactionsJSON) > 0 {
		if err := json.Unmarshal(reactionsJSON, &analysis.Reactions); err != nil {
			return nil, fmt.Errorf("failed to unmarshal reactions: %w", err)
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

func (r *analysisRepo) UpdateReactions(ctx context.Context, id int64, reaction, prevReaction string) error {
	fmt.Printf("Id %d, reaction %s, prevReaction %s\n", id, reaction, prevReaction)
	if reaction == "" {
		return errors.New("reaction cannot be empty")
	}

	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return fmt.Errorf("begin tx: %w", err)
	}
	defer tx.Rollback()

	var query string
	var args []interface{}

	// Format as PostgreSQL text[] literal for jsonb_set path
	reactionPath := fmt.Sprintf("{%s}", reaction)
	if prevReaction == "" {
		query = `
			UPDATE resume_analyses
			SET reactions = jsonb_set(
				COALESCE(reactions, '{}'::jsonb),
				$1::text[],
				COALESCE((reactions->>$2)::int + 1, 1)::text::jsonb
			)
			WHERE id = $3
		`
		args = []interface{}{reactionPath, reaction, id}
	} else {
		prevReactionPath := fmt.Sprintf("{%s}", prevReaction)
		query = `
			UPDATE resume_analyses
			SET reactions = jsonb_set(
				jsonb_set(
					COALESCE(reactions, '{}'::jsonb),
					$1::text[],
					COALESCE((reactions->>$2)::int + 1, 1)::text::jsonb
				),
				$3::text[],
				GREATEST(COALESCE((reactions->>$4)::int, 1) - 1, 0)::text::jsonb
			)
			WHERE id = $5
		`
		args = []interface{}{reactionPath, reaction, prevReactionPath, prevReaction, id}
	}

	res, err := tx.ExecContext(ctx, query, args...)
	if err != nil {
		return fmt.Errorf("exec update: %w", err)
	}

	rowsAffected, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("rows affected check: %w", err)
	}
	if rowsAffected == 0 {
		return pkg.ErrItemNotFound
	}

	if err := tx.Commit(); err != nil {
		return fmt.Errorf("commit tx: %w", err)
	}

	return nil
}
