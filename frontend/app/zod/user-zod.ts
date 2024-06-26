import { ObjectId } from 'mongodb';
import { z } from 'zod';

const LocationSchema = z.object({
  address: z.string({ required_error: 'Address is required' }),
  postalCode: z.string({ required_error: 'Postal code is required' }),
  city: z.string({ required_error: 'City is required' }),
  countryCode: z
    .string({ required_error: 'Country code is required' })
    .length(2, 'Country code must be 2 characters'),
  region: z.string({ required_error: 'Region is required' }),
});

const ProfileSchema = z.object({
  network: z.string({ required_error: 'Network is required' }),
  username: z.string({ required_error: 'Username is required' }),
  url: z.string({ required_error: 'URL is required' }).url('Invalid URL format'),
});

const WorkSchema = z.object({
  name: z.string({ required_error: 'Company name is required' }),
  position: z.string({ required_error: 'Position is required' }),
  url: z.string().url('Invalid URL format'),
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date().nullable(),
  summary: z.string({ required_error: 'Summary is required' }),
  highlights: z.array(z.string()).nullable(),
});

const EducationSchema = z.object({
  institution: z.string({ required_error: 'Institution name is required' }),
  url: z.string().url('Invalid URL format').nullable(),
  area: z.string({ required_error: 'Area of study is required' }),
  studyType: z.enum(['Remote', 'In-premise'], {
    required_error: 'Study type must be either "Remote" or "In-premise"',
  }),
  startDate: z.string({ required_error: 'Start date is required' }),
  endDate: z.string().nullable(),
  score: z.string().nullable(),
  courses: z.array(z.string()).nullable(),
});

const CertificateSchema = z.object({
  name: z.string({ required_error: 'Certificate name is required' }),
  date: z.string({ required_error: 'Date is required' }),
  issuer: z.string({ required_error: 'Issuer is required' }),
  url: z.string().url('Invalid URL format').nullable(),
});

const SkillSchema = z.object({
  name: z.string({ required_error: 'Skill name is required' }),
  level: z.enum(['Novice', 'Proficient', 'Expert'], { required_error: 'Skill level is required' }),
  keywords: z
    .array(z.instanceof(ObjectId), { required_error: 'Keyword cannot be empty' })
    .nullable(),
});

const LanguageSchema = z.object({
  language: z.string({ required_error: 'Language is required' }),
  fluency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Native'], {
    required_error: 'Fluency level is required',
  }),
});

const InterestSchema = z.object({
  name: z.string({ required_error: 'Interest name is required' }),
  keywords: z.array(z.string()).nullable(),
});

const ProjectSchema = z.object({
  name: z.string({ required_error: 'Project name is required' }),
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date().nullable(),
  description: z.string({ required_error: 'Description is required' }),
  highlights: z.array(z.string()).nullable(),
  githubUrl: z.string().url('Invalid URL format').nullable(),
  deployedUrl: z.string().url('Invalid URL format').nullable(),
  techStack: z.array(z.instanceof(ObjectId), { required_error: 'Tech stack cannot be empty' }),
});

const UserSchema = z.object({
  basics: z.object({
    name: z.string({ required_error: 'Name is required' }),
    label: z.string({ required_error: 'Label is required' }),
    image: z.string().url('Invalid URL format').nullable(),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
    phone: z.string({ required_error: 'Phone number is required' }),
    url: z.string().url('Invalid URL format').nullable(),
    summary: z.string({ required_error: 'Summary is required' }),
    location: LocationSchema,
    profiles: z.array(ProfileSchema).nullable(),
  }),
  work: z.array(WorkSchema).nullable(),
  education: z.array(EducationSchema).nullable(),
  certificates: z.array(CertificateSchema).nullable(),
  skills: z.array(SkillSchema).nullable(),
  languages: z.array(LanguageSchema).nullable(),
  interests: z.array(InterestSchema).nullable(),
  projects: z.array(ProjectSchema).nullable(),
});

export { UserSchema };
