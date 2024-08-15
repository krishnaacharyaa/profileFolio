import React from 'react';
import WorkExp from '@/components/Fields/WorkExpField';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const Step2Form = () => {
  return (
    <div className="flex flex-col my-6 w-4/5">
      <Tabs defaultValue="Work" className="w-full p-2">
        <TabsList>
          <TabsTrigger value="Work">Work Details</TabsTrigger>
        </TabsList>
        <TabsContent value="Work"><WorkExp /></TabsContent>
      </Tabs>
    </div>
  );
};

export default Step2Form;
