import { z } from "zod";

const Links = z.object({
    url: z.string(),
    social: z.string(),
})

const UserInputSchema = z.object({
    personalInfo: z.object({
        name: z.string().min(3, { message: "Don't you have a good name?" }),
        email: z.string().email(),
        phone: z.string(),
        jobTitle: z.string(),
        summary: z.string(),
        address: z.string(),
        links: z.array(Links)        
    }),
    skills: z.object({
        languages: z.string(),
        libraries: z.string(),
        tools: z.string(),
        databases: z.string(),
    }),
})

export { UserInputSchema };