const defaultUserInputs = {
  basics: {
    summary: 'Enthusiastic software developer with a passion for creating innovative solutions.',
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '1234567890',
    label: 'Software Developer',
    profiles: [
      {
        url: 'https://linkedin.com/in/johndoe',
        network: 'linkedin',
      },
      {
        url: 'https://github.com/johndoe',
        network: 'github',
      },
    ],
  },
  skills: [
    {
      name: 'languages',
      techStack: 'Java, Javascript, Typescript, Python',
    },
    {
      name: 'libraries',
      techStack: 'React.js, Node.js, TailwindCss, Next.js, Scss, Hono',
    },
    {
      name: 'tools',
      techStack: 'Git, Vscode, firebase, cloudinary,Razorpay, Cloudflare',
    },
    {
      name: 'databases',
      techStack: 'MongoDb, Postgress , Mysql',
    },
  ],
  education: [
    {
      institution: 'Tech University',
      url: 'https://techuniversity.edu',
      studyType: 'Bachelor',
      area: 'Computer Science',
      score: '3.8',
      scoreType: 'gpa',
      startDate: '2021-09-30T18:30:00.000Z',
      endDate: '2024-07-30T18:30:00.000Z',
    },
  ],
  work: [
    {
      name: 'Tech Solutions Inc.',
      position: 'Junior Developer',
      url: 'https://techsolutions.com',
      startDate: '2021-09-30T18:30:00.000Z',
      endDate: '2024-07-30T18:30:00.000Z',
      summary: 'Developing and maintaining web applications for various clients',
    },
  ],
  projects: [
    {
      name: 'E-commerce Platform',
      startDate: '2021-09-30T18:30:00.000Z',
      endDate: '2024-07-30T18:30:00.000Z',
      description:
        'Developed a full-stack e-commerce platform with user authentication and payment integration',
      technologies: 'React, Node.js, Express, MongoDB',
      githubUrl: 'https://github.com/johndoe/ecommerce-platform',
      deployedUrl: 'https://myecommerceproject.com',
    },
  ],
  languages: [
    {
      language: 'English',
      fluency: 'native',
    },
    {
      language: 'Spanish',
      fluency: 'intermediate',
    },
  ],
  certificates: [
    {
      name: 'AWS Certified Developer – Associate',
      date: '15-12-2023',
      issuer: 'Amazon Web Services',
      url: 'https://aws.amazon.com/certification/certified-developer-associate/',
    },
  ],
};
export default defaultUserInputs;
