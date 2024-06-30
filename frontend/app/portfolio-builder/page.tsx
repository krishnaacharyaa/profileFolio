
import Sidebar from "@/components/common/Sidebar";
import PortfolioView from "@/components/portfolio-builder/PortfolioView";


const Page = async () => {

  return (
    <div className="flex justify-between p-4 gap-4 px-12">
      <Sidebar/>
      <PortfolioView/>
    </div>
  );
};

export default Page;