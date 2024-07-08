'use client';
import React from 'react';
import Image from 'next/image';
import { StickyScroll } from '../ui/sticky-scroll-reveal';

const content = [
  {
    title: ' Beautiful Resumes',
    description:
      'Craft resumes that capture attention with their visual appeal and professional design. Our platform helps you create personalized resumes that highlight your skills and experiences effectively, ensuring you make a great first impression. With a range of templates and customization options, you can tailor your resume to suit any job application. Stand out from the competition with a resume that showcases your unique qualifications and personality.',
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        Beautiful Resumes
      </div>
    ),
  },
  {
    title: 'Comprehensive Portfolios',
    description:
      'Showcase your projects and achievements with a professional portfolio that reflects your expertise. Our tool allows you to create detailed and visually appealing portfolios that demonstrate your work, skills, and accomplishments. Whether you are a designer, developer, or creative professional, our platform offers the features you need to present your work in the best light. Impress potential clients and employers with a portfolio that tells your story and highlights your strengths.',
    content: (
      <div className="h-full w-full  flex items-center justify-center text-white">
        Comprehensive Portfolios
      </div>
    ),
  },
  {
    title: 'Github READMEs ',
    description:
      "Manage your projects with ease using our integrated version control system. Generate detailed and visually attractive GitHub README files that provide a clear overview of your project's features, usage, and setup instructions. Our platform simplifies the process of creating and maintaining documentation, ensuring your repositories are well-organized and professional. Keep track of changes, collaborate with others, and maintain high-quality project documentation effortlessly.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        Github READMEs
      </div>
    ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="p-10">
      <StickyScroll content={content} />
    </div>
  );
}
