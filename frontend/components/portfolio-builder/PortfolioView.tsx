import Education from '@/components/portfolio-builder/Education';
import WorkExperience from '@/components/portfolio-builder/Experience';
import Header from '@/components/portfolio-builder/Header';
import Profile from '@/components/portfolio-builder/Profile';
import Projects from '@/components/portfolio-builder/Projects';
import Skills from '@/components/portfolio-builder/Skills';
import skillsData from '@/lib/data/skills.json';
import Footer from './Footer';


export default async function () {
  const res = await fetch('http://localhost:3000/api/data');
  const data = await res.json();

  return (
    <div className="bg-white py-2 px-4 rounded  overflow-y-scroll h-screen">
          <Header {...data.basics} />
          <Profile {...data.basics} />
          <WorkExperience work={data.work} />
          <Education education={data.education} />
          <Skills skills={data.skills} skillsDetails={skillsData} />
          <Projects projects={data.projects} />
          <Footer languages={data.languages} interests={data.interests} certificates={data.certificates} />
      </div>
  );
};
