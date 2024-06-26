package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Location struct {
    Address     string `json:"address"`
    PostalCode  string `json:"postalCode"`
    City        string `json:"city"`
    CountryCode string `json:"countryCode"`
    Region      string `json:"region"`
}

type Profile struct {
    Network  string `json:"network"`
    Username string `json:"username"`
    URL      string `json:"url"`
}

type WorkExperience struct {
    Name       string   `json:"name"`
    Position   string   `json:"position"`
    URL        string   `json:"url,omitempty"`
    StartDate  primitive.DateTime   `json:"startDate"`
    EndDate    *primitive.DateTime  `json:"endDate,omitempty"`
    Summary    string   `json:"summary"`
    Highlights []string `json:"highlights,omitempty"`
}

type EducationDetail struct {
    Institution string   `json:"institution"`
    URL         string   `json:"url,omitempty"`
    Area        string   `json:"area"`
    StudyType   string   `json:"studyType"`
    StartDate   primitive.DateTime   `json:"startDate"`
    EndDate     *primitive.DateTime  `json:"endDate,omitempty"`
    Score       *string  `json:"score,omitempty"`
    Courses     []string `json:"courses,omitempty"`
}

type Certificate struct {
    Name   string `json:"name"`
    Date   primitive.DateTime `json:"date"`
    Issuer string `json:"issuer"`
    URL    string `json:"url,omitempty"`
}

type Skill struct {
    Name     string               `json:"name"`
    Level    string               `json:"level"`
    Keywords []primitive.ObjectID `json:"keywords,omitempty"`
}

type Language struct {
    Language string `json:"language"`
    Fluency  string `json:"fluency"`
}

type Interest struct {
    Name     string   `json:"name"`
    Keywords []string `json:"keywords,omitempty"`
}

type Project struct {
    Name        string                `json:"name"`
    StartDate   primitive.DateTime    `json:"startDate"`
    EndDate     *primitive.DateTime   `json:"endDate,omitempty"`
    Description string                `json:"description"`
    Highlights  []string              `json:"highlights,omitempty"`
    GithubURL   string                `json:"githubUrl,omitempty"`
    DeployedURL string                `json:"deployedUrl,omitempty"`
    TechStack   []primitive.ObjectID  `json:"techStack,omitempty"`
}

type User struct {
    ID           primitive.ObjectID  `bson:"_id,omitempty" json:"-"`
    Basics       struct {
        Name     string     `json:"name"`
        Label    string     `json:"label"`
        Image    string     `json:"image,omitempty"`
        Email    string     `json:"email"`
        Phone    string     `json:"phone"`
        URL      string     `json:"url,omitempty"`
        Summary  string     `json:"summary"`
        Location Location   `json:"location"`
        Profiles []Profile  `json:"profiles,omitempty"`
    } `json:"basics"`
    Work         []WorkExperience   `json:"work,omitempty"`
    Education    []EducationDetail  `json:"education,omitempty"`
    Certificates []Certificate      `json:"certificates,omitempty"`
    Skills       []Skill            `json:"skills,omitempty"`
    Languages    []Language         `json:"languages,omitempty"`
    Interests    []Interest         `json:"interests,omitempty"`
    Projects     []Project          `json:"projects,omitempty"`
}


type SkillCollection struct {
    ID   primitive.ObjectID `bson:"_id" json:"id"`
    Name string             `bson:"name" json:"name"`
}
