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
  url: z.string({ required_error: 'URL is required' }).url('Invalid URL format'),
  startDate: z.string({ required_error: 'Start date is required' }),
  endDate: z.string().optional(),
  summary: z.string({ required_error: 'Summary is required' }),
  highlights: z
    .array(z.string({ required_error: 'Highlight cannot be empty' }))
    .nonempty('At least one highlight is required'),
});

const EducationSchema = z.object({
  institution: z.string({ required_error: 'Institution name is required' }),
  url: z.string().url('Invalid URL format').optional(),
  area: z.string({ required_error: 'Area of study is required' }),
  studyType: z.string({ required_error: 'Study type is required' }),
  startDate: z.string({ required_error: 'Start date is required' }),
  endDate: z.string().optional(),
  score: z.string().optional(),
  courses: z.array(z.string({ required_error: 'Course name cannot be empty' })).optional(),
});

const CertificateSchema = z.object({
  name: z.string({ required_error: 'Certificate name is required' }),
  date: z.string({ required_error: 'Date is required' }),
  issuer: z.string({ required_error: 'Issuer is required' }),
  url: z.string().url('Invalid URL format').optional(),
});

const SkillSchema = z.object({
  name: z.string({ required_error: 'Skill name is required' }),
  level: z.string({ required_error: 'Skill level is required' }),
  keywords: z.array(z.string({ required_error: 'Keyword cannot be empty' })).optional(),
});

const LanguageSchema = z.object({
  language: z.string({ required_error: 'Language is required' }),
  fluency: z.string({ required_error: 'Fluency level is required' }),
});

const InterestSchema = z.object({
  name: z.string({ required_error: 'Interest name is required' }),
  keywords: z.array(z.string({ required_error: 'Keyword cannot be empty' })).optional(),
});

const ProjectSchema = z.object({
  name: z.string({ required_error: 'Project name is required' }),
  startDate: z.string({ required_error: 'Start date is required' }),
  endDate: z.string({ required_error: 'End date is required' }),
  description: z.string({ required_error: 'Description is required' }),
  highlights: z.array(z.string({ required_error: 'Highlight cannot be empty' })).optional(),
  githubUrl: z.string().url('Invalid URL format').optional(),
  deployedUrl: z.string().url('Invalid URL format').optional(),
});

const UserSchema = z.object({
  basics: z.object({
    name: z.string({ required_error: 'Name is required' }),
    label: z.string({ required_error: 'Label is required' }),
    image: z.string().url('Invalid URL format').optional(),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
    phone: z.string({ required_error: 'Phone number is required' }),
    url: z.string().url('Invalid URL format').optional(),
    summary: z.string({ required_error: 'Summary is required' }),
    location: LocationSchema,
    profiles: z.array(ProfileSchema).optional(),
  }),
  work: z.array(WorkSchema).optional(),
  education: z.array(EducationSchema).optional(),
  certificates: z.array(CertificateSchema).optional(),
  skills: z.array(SkillSchema).optional(),
  languages: z.array(LanguageSchema).optional(),
  interests: z.array(InterestSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
});

export { UserSchema };
