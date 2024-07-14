package middleware

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
)

// Load the JWT secret from the environment
var jwtSecret = []byte(os.Getenv("NEXTAUTH_SECRET"))

// Define a custom type for the context key
type contextKey string

const userContextKey contextKey = "user"

func KeyFunc(token *jwt.Token) (interface{}, error) {
	// Validate the algorithm - ES256 is the default
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
	}
	// Return the secret signing key
	return jwtSecret, nil
}

func JwtVerify(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "authorization header is missing", http.StatusUnauthorized)
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == "" {
			http.Error(w, "bearer token is missing", http.StatusUnauthorized)
			return
		}

		// Parse and verify the token
		token, err := jwt.Parse(tokenString, KeyFunc)
		if err != nil {
			http.Error(w, "invalid token", http.StatusUnauthorized)
			return
		}

		// Token is valid, add user information to the request context
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			ctx := context.WithValue(r.Context(), userContextKey, claims)
			next.ServeHTTP(w, r.WithContext(ctx))
		} else {
			http.Error(w, "invalid token claims", http.StatusUnauthorized)
			return
		}
	})
}
