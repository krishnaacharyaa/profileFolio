// app/page.tsx

import Education from "@/components/portfolio-builder/Education";
import WorkExperience from "@/components/portfolio-builder/Experience";
import Header from "@/components/portfolio-builder/Header";
import Profile from "@/components/portfolio-builder/Profile";
import Projects from "@/components/portfolio-builder/Projects";
import Skills from "@/components/portfolio-builder/Skills";
import skillsData from "@/lib/data/skills.json"

interface Props {
  data: any; // Define a proper type based on your JSON structure
  skillsDetails: any[]; // Define a proper type based on your skills JSON structure
}

const Home: React.FC<Props> = async () => {
  const res = await fetch('http://localhost:3000/api/data');
  const data = await res.json();

  return (
    <div className='flex flex-col items-center'>
      <div className='w-full max-w-4xl p-4'>
         <Header {...data.basics} />
         <Profile {...data.basics} />
         <WorkExperience work={data.work} />
         <Education education={data.education} />
         <Skills skills={data.skills} skillsDetails={skillsData} />
         <Projects projects={data.projects}/>
      </div>
    </div>
  );
};

export default Home;
