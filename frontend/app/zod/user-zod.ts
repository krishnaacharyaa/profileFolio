import { z } from 'zod';

const LocationSchema = z.object({
  address: z.string({ required_error: 'Address is required' }).min(1, { message: 'Address cannot be empty' }),
  postalCode: z.string({ required_error: 'Postal code is required' }).min(1, { message: 'Postal code cannot be empty' }).max(6, { message: 'Postal code cannot exceed 6 characters' }),
  city: z.string({ required_error: 'City is required' }).min(1, { message: 'City name cannot be empty' }),
  countryCode: z.string({ required_error: 'Input is required' }).regex(/^[A-Z]{2}$/, 'Input must be 2 uppercase letters.'),
  // region: z.string({ required_error: 'Region is required' }),
});

const ProfileSchema = z.object({
  network: z.string({ required_error: 'Network is required' }).min(1, { message: 'Platform name cannot be empty' }),
  username: z.string({ required_error: 'Username is required' }).min(1, { message: 'Username cannot be empty' }),
  url: z.string({ required_error: 'URL is required' }).url('Invalid URL format'),
});

const WorkSchema = z.object({
  name: z.string({ required_error: 'Company name is required' }).min(1, { message: 'Company name cannot be empty' }),
  position: z.string({ required_error: 'Position is required' }).min(1, { message: 'Company name cannot be empty' }),
  url: z.string().url('Invalid URL format'),
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date(),
  summary: z.string({ required_error: 'Summary is required' }),
  highlights: z.array(z.string()).nullable(),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after the start date",
  path: ["endDate"],
});

const EducationSchema = z.object({
  institution: z.string({ required_error: 'Institution name is required' }),
  url: z.string().url('Invalid URL format').nullable().default(""),
  area: z.string({ required_error: 'Area of study is required' }).min(1, { message: 'Area cannot be empty' }),
  studyType: z.enum(['Remote', 'In-premise'], {
    required_error: 'Study type must be either "Remote" or "In-premise"',
  }),
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date({ required_error: 'Start date is required' }),
  score: z.string().nullable().default(""),
  // courses: z.array(z.string()).nullable(),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after the start date",
  path: ["endDate"],
});

const CertificateSchema = z.object({
  name: z.string({ required_error: 'Certificate name is required' }).min(1, { message: 'Certificate name cannot be empty' }),
  date: z.date({ required_error: 'Date is required' }),
  issuer: z.string({ required_error: 'Issuer is required' }).min(1, { message: 'Issuer name cannot be empty' }),
  url: z.string().url('Invalid URL format').nullable(),
});

const SkillSchema = z.object({
  name: z.string({ required_error: 'Skill name is required' }).min(1, { message: 'Skill name cannot be empty' }),
  level: z.enum(['Novice', 'Proficient', 'Expert'], { required_error: 'Skill level is required' }),
  // keywords: z
  //   .array(z.string(), { required_error: 'Keyword cannot be empty' })
  //   .nullable(),
});

const LanguageSchema = z.object({
  language: z.string({ required_error: 'Language is required' }).min(1, { message: 'Language cannot be empty' }),
  fluency: z.enum(["Beginner", "Intermediate", "Advanced", "Native"], { required_error: 'fluency is required' }),
});

// const InterestSchema = z.object({
//   name: z.string({ required_error: 'Interest name is required' }),
//   keywords: z.array(z.string()).nullable(),
// });

const ProjectSchema = z.object({
  name: z.string({ required_error: 'Project name is required' }).min(1, { message: 'Project name cannot be empty' }),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string({ required_error: 'Description is required' }).min(1, { message: 'Description cannot be empty' }),
  // highlights: z.array(z.string()).nullable(),
  githubUrl: z.string().url('Invalid URL format').nullable(),
  deployedUrl: z.string().url('Invalid URL format').nullable().optional(),
  // techStack: z.array(z.string(), { required_error: 'Tech stack cannot be empty' }),
}).refine(data => data.endDate > data.startDate, {
  message: "End date must be after the start date",
  path: ["endDate"],
});

const UserSchema = z.object({
  basics: z.object({
    name: z.string({ required_error: 'Name is required' }).min(1, { message: 'Name cannot be empty' }),
    current_role: z.string({ required_error: 'Role is required' }).min(1, { message: 'Role cannot be empty' }),
    image: z.string().url('Invalid URL format'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
    phone: z.string({ required_error: 'Phone number is required' }).regex(/^[0-9]{10}$/, 'Invalid phone number. It should be 10 digits.'),
    url: z.string().url('Invalid URL format'),
    summary: z.string({ required_error: 'Summary is required' }).min(1, { message: 'Summary cannot be empty' }).max(80, { message: `can't exceed 80 characters` }),
    location: LocationSchema,
    profiles: z.array(ProfileSchema).nullable().optional(),
    languages: z.array(LanguageSchema).nullable().optional(),
    // interests: z.array(InterestSchema).nullable()
  }),
  work: z.array(WorkSchema).nonempty(),
  education: z.object({
    educationArr: z.array(EducationSchema).nonempty(),
    certificates: z.array(CertificateSchema).nullable()
  }),
  projects: z.object({
    projectsArr: z.array(ProjectSchema).nonempty(),
    skills: z.array(SkillSchema).nullable()
  }),
});

export { UserSchema };