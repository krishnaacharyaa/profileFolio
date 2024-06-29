// app/page.tsx

import Sidebar from "@/components/common/Sidebar";
import PortfolioView from "@/components/portfolio-builder/PortfolioView";


interface Props {
  data: any; // Define a proper type based on your JSON structure
  skillsDetails: any[]; // Define a proper type based on your skills JSON structure
}

const Home: React.FC<Props> = async () => {
  const res = await fetch('http://localhost:3000/api/data');
  const data = await res.json();

  return (
    <div className="flex justify-between p-4 gap-4 px-12">
      <Sidebar/>
      <PortfolioView/>
    </div>
  );
};

export default Home;
