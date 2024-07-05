import Sidebar from '@/components/common/Sidebar';
import PortfolioView from '@/components/portfolio-builder/PortfolioView';
import { FormProviders } from '@/lib/form-provider';

const Page = () => {
  return (
    <div className="h-full px-12">
      <FormProviders>
        <div className="mt-7 flex justify-between h-full">
          <Sidebar />
          <PortfolioView />
        </div>
        <button type="submit" className="border-2 border-black rounded-md p-4">
          Submit
        </button>
      </FormProviders>
    </div>
  );
};

export default Page;
