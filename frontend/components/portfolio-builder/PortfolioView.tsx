import Education from '@/components/portfolio-builder/Education';
import WorkExperience from '@/components/portfolio-builder/Experience';
import Header from '@/components/portfolio-builder/Header';
import Profile from '@/components/portfolio-builder/Profile';
import Projects from '@/components/portfolio-builder/Projects';
import Skills from '@/components/portfolio-builder/Skills';
import Footer from './Footer';


export default function () {
  return (
    <div className="bg-white py-2 px-4 rounded  overflow-y-scroll h-screen">
          <Header/>
          <Profile />
          <Education/>
          <WorkExperience />
          <Projects/>
          <Skills />
          <Footer/>
      </div>
  );
};
