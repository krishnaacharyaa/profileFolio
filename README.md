# ProfileFolio

ProfileFolio simplifies professional profile management by generating customized resumes, portfolios, and GitHub readmes tailored to user data and job descriptions. Empower your career journey with precision-crafted application materials, all in one place.

## Getting Started

<details>
<summary><strong>Install Using Docker</strong></summary>

1.  Fork and Clone the Repository
2.  Run below commands to sping up docker container
    ```bash
    cd frontend && npm i
    ```
    ```bash
    docker-compose up --build
    ```
3.  Access the Application 
    - Frontend : http://localhost:3000 
    - Backend  : http://localhost:8080/api/test

</details>

> [!NOTE]   
> The manual installation steps below assume you already have Go, MongoDB and NodeJS installed on your machine. Please find links below to install any missing components.
> * Node JS - https://nodejs.org/en
> * GO      - https://go.dev/doc/install
> * MongoDB - https://www.mongodb.com/try/download/community 
>
> If you are using a window system, run the `setup.bat` file by double clicking it, this will execute the manual installation steps for you.

<details>
<summary><strong>Install Manually</strong></summary>

**1.  Fork and Clone the Repository**

**2.  Open Mongodb atlas on localhost:27017,
  Create the `profileFolio` database and add this sample data to the `users` collection**
___
```json
{
  "_id": { "$oid": "667b885950aa1b4215433ff4" },
  "basics": {
    "name": "Jane Smith",
    "username": "jsmith49",
    "label": "Software Engineer",
    "image": "https://janesmith.com/photo.jpg",
    "email": "jane.smith@gmail.com",
    "phone": "(123) 456-7890",
    "url": "https://janesmith.com",
    "summary": "Experienced software engineer with a passion for developing innovative programs.",
    "location": {
      "address": "123 Main St",
      "postalCode": "12345",
      "city": "Metropolis",
      "countryCode": "US",
      "region": "NY"
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "username": "janesmith",
        "url": "https://linkedin.com/in/janesmith"
      },
      {
        "network": "GitHub",
        "username": "janesmith",
        "url": "https://github.com/janesmith"
      }
    ]
  },
 "resumes" : [
    {
      "_id": {
      "$oid": "667b988850aa1b4215433ffe"
    },
    "name": "Resume 1",
    "isDefault": false,
    "basics": {
      "name": "Jane Smith",
      "username": "jsmith49",
      "label": "Software Engineer",
      "image": "https://janesmith.com/photo.jpg",
      "email": "jane.smith@gmail.com",
      "phone": "(123) 456-7890",
      "url": "https://janesmith.com",
      "summary": "Experienced software engineer with a passion for developing innovative programs.",
      "location": {
        "address": "123 Main St",
        "postalCode": "12345",
        "city": "Metropolis",
        "countryCode": "US",
        "region": "NY"
      },
      "profiles": [
        {
          "network": "LinkedIn",
          "username": "janesmith",
          "url": "https://linkedin.com/in/janesmith"
        },
        {
          "network": "GitHub",
          "username": "janesmith",
          "url": "https://github.com/janesmith"
        }
      ]
    }
    }
  ],
  "work": [
    {
      "name": "TechCorp",
      "position": "Senior Developer",
      "url": "https://techcorp.com",
      "startDate": {
        "$date": "2018-05-01T00:00:00Z"
      },
      "endDate": null,
      "summary": "Developed and maintained various web applications.",
      "highlights": [
        "Led a team of developers to create a new e-commerce platform.",
        "Implemented a continuous integration and deployment pipeline."
      ]
    }
  ],
  "education": [
    {
      "institution": "State University",
      "url": "https://stateuniversity.edu",
      "area": "Computer Science",
      "studyType": "Bachelor",
      "startDate": {
        "$date": "2010-09-01T00:00:00Z"
      },
      "endDate": {
        "$date": "2014-06-01T00:00:00Z"
      },
      "score": "3.8",
      "scoreType": "CGPA",
      "courses": [
        "CS101 - Introduction to Computer Science",
        "CS202 - Data Structures",
        "CS303 - Algorithms"
      ]
    }
  ],
  "certificates": [
    {
      "name": "Certified Kubernetes Administrator",
      "date": { "$date": "2020-07-15T00:00:00Z" },
      "issuer": "CNCF",
      "url": "https://cncf.io/certified-kubernetes-administrator"
    }
  ],
  "skills": [
    {
      "name": "Web Development",
      "level": "Expert",
      "keywords": [
        { "$oid": "667b888850aa1b4215433ff8" },
        { "$oid": "667b888850aa1b4215433ff9" },
        { "$oid": "667b888850aa1b4215433ffa" }
      ]
    }
  ],
  "languages": [
    {
      "language": "English",
      "fluency": "Native"
    },
    {
      "language": "Spanish",
      "fluency": "Intermediate"
    }
  ],
  "interests": [
    {
      "name": "Traveling",
      "keywords": ["Backpacking", "Cultural Experiences"]
    }
  ],
  "projects": [
    {
      "name": "Personal Portfolio",
      "startDate": {
        "$date": "2020-01-01T00:00:00Z"
      },
      "endDate": {
        "$date": "2020-06-01T00:00:00Z"
      },
      "description": "Developed a personal portfolio website to showcase my projects and skills.",
      "highlights": [
        "Designed and implemented a responsive user interface.",
        "Integrated a blog section to share technical articles."
      ],
      "githubUrl": "https://github.com/janesmith/portfolio",
      "deployedUrl": "https://janesmith.com",
      "techStack": [
        { "$oid": "667b888850aa1b4215433ff8" },
        { "$oid": "667b888850aa1b4215433ff9" },
        { "$oid": "667b888850aa1b4215433ffa" }
      ]
    }
  ]

}
```

**3. Add this sample data to the `skills` collection**
___

```json
[
  {
    "_id": {
      "$oid": "667b888850aa1b4215433ff8"
    },
    "name": "typescript",
    "level": "intermediate"
  },
  {
    "_id": {
      "$oid": "667b888850aa1b4215433ff9"
    },
    "name": "javascript",
    "level": "intermediate"
  },
  {
    "_id": {
      "$oid": "667b888850aa1b4215433ffa"
    },
    "name": "node",
    "level": "intermediate"
  }
]
```

**4. Copy the `.env` files for both Go and NextJS**
___

```bash
cp ./backend/.env.sample ./backend/.env
```

```bash
cp ./frontend/.env.sample ./frontend/.env
```

  For a windows based system use the following commands
___

```cmd
copy /Y frontend\.env.sample frontend\.env
```

```cmd
copy /Y backend\.env.sample backend\.env
```

**5. Install necesaary dependecies for both frontend and backend**
___

```bash
npm run installer
```

**6. Launch the backend server**
___

```bash
npm run start-backend
```

**7. Launch the frontend application**
___

```bash
npm run start-frontend
```

- Access the Application 
  - Frontend  : http://localhost:3000 
  - Backend   : http://localhost:8080/api/test

</details>
<hr>

<details>
<summary><strong>Steps to Start Contributing</strong></summary>

To contribute to this project, follow these steps:

1. **Fork the Repository**:

   - Fork the repository from [profileFolio](https://github.com/krishnaacharyaa/profileFolio) to your GitHub account.

2. **Clone Your Fork**:

   - Clone your forked repository locally:

     ```sh
     git clone https://github.com/<your-username>/profileFolio.git
     ```

3. **Add Remote Repositories**:

   - Set up remotes for tracking changes from the original repository and pushing your changes:

     ```sh
     cd profileFolio
     git remote add upstream https://github.com/krishnaacharyaa/profileFolio.git
     git remote -v  # Verify remotes
     ```

   > Steps from 4th point, needs to followed with each new PR

4. **Stay Up-to-Date**:

- Before starting your work or submitting a pull request, sync your fork with the original repository:

  ```sh
   git pull upstream main
  ```

5. **Create a New Branch**:

   - Create a new branch for your work, naming it appropriately:

     ```sh
     # Switch to the main branch
     git switch main

     # Pull down any upstream changes
     git pull

     # Create a new branch to work on
     git switch --create bugfix/1234-name-of-the-issue
     ```

6. **Make Changes**:

   - Make your changes locally. Commit them using clear and concise messages.

7. **Push Changes and Open Pull Request**:

   - Push your branch to your forked repository:

     ```sh
     git push -u origin feature/1234-short-description
     ```

   - Open a pull request on the [profileFolio repository](https://github.com/krishnaacharyaa/profileFolio), following the template provided.

</details>
