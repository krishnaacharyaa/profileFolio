import Sidebar from '@/components/common/Sidebar';
import PortfolioView from '@/components/portfolio-builder/PortfolioView';
import { FormProviders } from '@/lib/form-provider';

const Page = () => {
  return (
    <div className="h-full px-12">
      <FormProviders>
        <div className="mt-7 flex justify-between h-full gap-8 mb-4">
          <Sidebar />
          <PortfolioView />
        </div>
        
      </FormProviders>
    </div>
  );
};

export default Page;
