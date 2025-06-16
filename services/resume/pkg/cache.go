package pkg

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/go-redis/redis/v8"
)

// RedisConfig holds Redis connection configuration
type RedisConfig struct {
	Addr     string
	Password string
	DB       int
}

func LoadRedisConfigFromEnv() (*RedisConfig, error) {
	// First check for Upstash URL (common in Vercel deployments)
	if upstashURL := os.Getenv("UPSTASH_REDIS_URL"); upstashURL != "" {
		return parseUpstashURL(upstashURL)
	}

	// Fall back to standard Redis config
	addr := os.Getenv("REDIS_ADDR")
	if addr == "" {
		addr = "localhost:6379" // default value
	}

	password := os.Getenv("REDIS_PASSWORD")

	dbStr := os.Getenv("REDIS_DB")
	db := 0 // default DB
	if dbStr != "" {
		var err error
		db, err = strconv.Atoi(dbStr)
		if err != nil {
			return nil, fmt.Errorf("invalid REDIS_DB value: %w", err)
		}
	}

	return &RedisConfig{
		Addr:     addr,
		Password: password,
		DB:       db,
	}, nil
}

// parseUpstashURL handles Upstash-specific URL format
// Format: redis://<username>:<password>@<host>:<port>
func parseUpstashURL(url string) (*RedisConfig, error) {
	parsed, err := redis.ParseURL(url)
	if err != nil {
		return nil, fmt.Errorf("invalid Redis URL: %w", err)
	}

	password := parsed.Password
	addr := parsed.Addr // includes port

	// Upstash typically uses DB 0 and includes password in URL
	return &RedisConfig{
		Addr:     addr,
		Password: password,
		DB:       0, // Upstash usually only has DB 0
	}, nil
}

// NewRedisCacheFromEnv creates a new Redis cache client using environment variables
func NewRedisCacheFromEnv() (*RedisCache, error) {
	config, err := LoadRedisConfigFromEnv()
	if err != nil {
		return nil, err
	}

	return NewRedisCache(config.Addr, config.Password, config.DB)
}

// CacheClient defines the interface for cache operations
type CacheClient interface {
	Set(ctx context.Context, key string, value interface{}, expiration time.Duration) error
	Get(ctx context.Context, key string, dest interface{}) (bool, error)
	Delete(ctx context.Context, key string) error
	Ping(ctx context.Context) error
}

// RedisCache implements CacheClient using Redis
type RedisCache struct {
	client *redis.Client
}

// NewRedisCache creates a new Redis cache client
func NewRedisCache(addr, password string, db int) (*RedisCache, error) {
	client := redis.NewClient(&redis.Options{
		Addr:     addr,
		Password: password,
		DB:       db,
	})

	// Verify connection
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := client.Ping(ctx).Err(); err != nil {
		return nil, fmt.Errorf("failed to connect to Redis: %w", err)
	}

	return &RedisCache{client: client}, nil
}

// Set stores a value in cache with expiration
func (r *RedisCache) Set(ctx context.Context, key string, value interface{}, expiration time.Duration) error {
	jsonData, err := json.Marshal(value)
	if err != nil {
		return fmt.Errorf("failed to marshal value: %w", err)
	}

	if err := r.client.Set(ctx, key, jsonData, expiration).Err(); err != nil {
		return fmt.Errorf("failed to set value in cache: %w", err)
	}

	return nil
}

// Get retrieves a value from cache
func (r *RedisCache) Get(ctx context.Context, key string, dest interface{}) (bool, error) {
	val, err := r.client.Get(ctx, key).Result()
	if errors.Is(err, redis.Nil) {
		return false, nil // Key doesn't exist
	} else if err != nil {
		return false, fmt.Errorf("failed to get value from cache: %w", err)
	}

	if err := json.Unmarshal([]byte(val), dest); err != nil {
		return false, fmt.Errorf("failed to unmarshal cached value: %w", err)
	}

	return true, nil
}

// Delete removes a key from cache
func (r *RedisCache) Delete(ctx context.Context, key string) error {
	if err := r.client.Del(ctx, key).Err(); err != nil {
		return fmt.Errorf("failed to delete key from cache: %w", err)
	}
	return nil
}

// Ping checks the connection to Redis
func (r *RedisCache) Ping(ctx context.Context) error {
	return r.client.Ping(ctx).Err()
}

// Close closes the Redis connection
func (r *RedisCache) Close() error {
	return r.client.Close()
}
