# ProfileFolio

ProfileFolio simplifies professional profile management by generating customized resumes, portfolios, and GitHub readmes tailored to user data and job descriptions. Empower your career journey with precision-crafted application materials, all in one place.

## Installation

<details>
<summary><h4>Install Using Docker</h4></summary>

1.  Fork and Clone the Repository
2.  Run Docker Compose
    ```bash
    docker-compose up --build
    ```
3.  Access the Application - Frontend: http://localhost:3000 - Backend: http://localhost:8080/api/user
</details>
<details>
<summary><h4>Install Manually</h4></summary>

4.  Open Mongodb atlas in localhost:27017
    Create `profileFolio` db and
    add this sample data in collection `users`

    ```
    {
        basics: {
            name: "John Doe",
            label: "Programmer",
            image: "",
            email: "john@gmail.com",
            phone: "(912) 555-4321",
            url: "https://johndoe.com",
            summary: "A summary of John Doe…",
            location: {
                address: "2712 Broadway St",
                postalCode: "CA 94115",
                city: "San Francisco",
                countryCode: "US",
                region: "California"
            },
            profiles: [{
                network: "Twitter",
                username: "john",
                url: "https://twitter.com/john"
            }]
        },
        work: [{
            name: "Company",
            position: "President",
            url: "https://company.com",
            startDate: "2013-01-01",
            endDate: "2014-01-01",
            summary: "Description…",
            highlights: [
                "Started the company"
            ]
        }],
        education: [{
            institution: "University",
            url: "https://institution.com/",
            area: "Software Development",
            studyType: "Bachelor",
            startDate: "2011-01-01",
            endDate: "2013-01-01",
            score: "4.0",
            courses: [
                "DB1101 - Basic SQL"
            ]
        }],
        projects: [{
            name: "Project",
            startDate: "2019-01-01",
            endDate: "2021-01-01",
            description: "Description...",
            highlights: [
                "Won award at AIHacks 2016"
            ],
            url: "https://project.com/"
        }]
    }
    ```

5.  ```bash
    cp ./backend/.env.sample ./backend/.env
    ```

6.  ```bash
    npm run installer
    ```
7.  ```bash
    npm start
    ```
8.  Access the Application - Frontend: http://localhost:3000 - Backend: http://localhost:8080/api/user
</details>

<details>
<summary><h4>Steps to start contributing</h4></summary>

To contribute to this project, you need to create a fork of the repository and then commit your changes to it. Follow these steps:

1. Fork the repository if haven't done already from [profileFolio](https://github.com/krishnaacharyaa/profileFolio)
2. Add your fork as a local project:

   ```sh
   git clone https://github.com/<your-username>/profileFolio.git
   ```

3. Add git remote controls:

   ```sh
   git remote add fork https://github.com/<your-username>/profileFolio.git
   git remote add upstream https://github.com/krishnaacharyaa/profileFolio.git
   ```

4. Verify that you have your two git remotes:

   ```sh
   git remote -v
   ```

5. **For every individual PR follow these 2 steps:**

   - To stay up to date with the central repository:

     ```sh
     git pull upstream main
     ```

   - Checkout a private from your main Branch

     ```sh
     # Switch to the main branch
     git switch main

     # Pull down any upstream changes
     git pull

     # Create a new branch to work on
     git switch --create bugfix/1234-name-of-the-issue
     ```

Commit your changes, then push the branch to your fork with `git push -u fork` and open a pull request on [the profileFolio repository](https://github.com/krishnaacharyaa/profileFolio) following the template provided.

</details>
