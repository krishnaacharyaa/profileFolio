import * as templates from './templates'; 
import { SocialLinksData } from '@/app/components/SocialLinks';
import toast from "react-hot-toast";

type TemplateName = keyof typeof templates;

export const generateMarkdown = (aboutData: {
    working: string;
    learning: string;
    funFact: string;
},
    skills: string[],
    socialLinks: SocialLinksData,
    templateName: string): string => {
        const template = (templates as any)[templateName] || templates.template1;
        return template(aboutData, skills, socialLinks);
};

export const copyMarkdown = (markdown: string) => {
    console.log('Button Cliked');
    navigator.clipboard.writeText(markdown);
    toast.success("Copied!")
}

export const downloadMarkdown = (markdown: string) => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // alert for download
    toast.success("Downloading!")
};