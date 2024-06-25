// mongodb-init/init.js
db = db.getSiblingDB('profileFolio'); // Use the profileFolio database
db.createUser({
    user: "admin",
    pwd: "password",
    roles: [
        {
            role: "readWrite",
            db: "profileFolio"
        }
    ]
});

db.users.insertOne({
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
});
