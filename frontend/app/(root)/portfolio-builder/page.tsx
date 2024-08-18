'use client'

import Sidebar from '@/components/common/Sidebar';
import PortfolioView from '@/components/portfolio-builder/PortfolioView';
import { FormProviders } from '@/lib/form-provider';
import { useState } from 'react';

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="h-full px-12">
      <FormProviders>
        <div className="mt-7 flex justify-between h-full">
          <Sidebar isLoading={isLoading} />
          <PortfolioView />
        </div>
      </FormProviders>
    </div>
  );
};

export default Page;
