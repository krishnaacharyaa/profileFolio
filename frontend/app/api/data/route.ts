// app/api/data/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const data = {
    _id: { "$oid": "667b885950aa1b4215433ff4" },
    basics: {
      name: "Jane Smith",
      label: "Software Engineer",
    //   image: "https://janesmith.com/photo.jpg",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYVx6CB56pxO8gwlzLLOkV8fPN0jfF3T_98w&s",
      email: "jane.smith@gmail.com",
      phone: "(123) 456-7890",
      url: "https://janesmith.com",
      summary: "Experienced software engineer with a passion for developing innovative programs.",
      location: {
        address: "123 Main St",
        postalCode: "12345",
        city: "Metropolis",
        countryCode: "US",
        region: "NY"
      },
      profiles: [
        {
          network: "LinkedIn",
          username: "janesmith",
          url: "https://linkedin.com/in/janesmith"
        },
        {
          network: "GitHub",
          username: "janesmith",
          url: "https://github.com/janesmith"
        }
      ]
    },
    work: [
      {
        name: "TechCorp",
        position: "Senior Developer",
        url: "https://techcorp.com",
        startDate: {
          "$date": "2018-05-01T00:00:00Z"
        },
        endDate: null,
        summary: "Developed and maintained various web applications.",
        highlights: [
          "Led a team of developers to create a new e-commerce platform.",
          "Implemented a continuous integration and deployment pipeline."
        ]
      }
    ],
    education: [
      {
        institution: "State University",
        url: "https://stateuniversity.edu",
        area: "Computer Science",
        studyType: "Bachelor",
        startDate: {
          "$date": "2010-09-01T00:00:00Z"
        },
        endDate: {
          "$date": "2014-06-01T00:00:00Z"
        },
        score: "3.8",
        courses: [
          "CS101 - Introduction to Computer Science",
          "CS202 - Data Structures",
          "CS303 - Algorithms"
        ]
      }
    ],
    certificates: [
      {
        name: "Certified Kubernetes Administrator",
        date: { "$date": "2020-07-15T00:00:00Z" },
        issuer: "CNCF",
        url: "https://cncf.io/certified-kubernetes-administrator"
      }
    ],
    skills: [
      {
        name: "Web Development",
        level: "Expert",
        keywords: [
          { "$oid": "667b888850aa1b4215433ff8" },
          { "$oid": "667b888850aa1b4215433ff9" },
          { "$oid": "667b888850aa1b4215433ffa" }
        ]
      }
    ],
    languages: [
      {
        language: "English",
        fluency: "Native"
      },
      {
        language: "Spanish",
        fluency: "Intermediate"
      }
    ],
    interests: [
      {
        name: "Traveling",
        keywords: [
          "Backpacking",
          "Cultural Experiences"
        ]
      }
    ],
    projects: [
      {
        name: "Personal Portfolio",
        startDate: {
          "$date": "2020-01-01T00:00:00Z"
        },
        endDate: {
          "$date": "2020-06-01T00:00:00Z"
        },
        description: "Developed a personal portfolio website to showcase my projects and skills.",
        highlights: [
          "Designed and implemented a responsive user interface.",
          "Integrated a blog section to share technical articles."
        ],
        githubUrl: "https://github.com/janesmith/portfolio",
        deployedUrl: "https://janesmith.com",
        techStack: [
          { "$oid": "667b888850aa1b4215433ff8" },
          { "$oid": "667b888850aa1b4215433ff9" },
          { "$oid": "667b888850aa1b4215433ffa" }
        ]
      }
    ]
  };
  
  return NextResponse.json(data);
}

