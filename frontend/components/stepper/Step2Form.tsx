import React from 'react';
import WorkExp from '@/components/Fields/WorkExpField';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Step2FormProps{
  notExp : boolean
}

const Step2Form: React.FC<Step2FormProps> = ({notExp}) => {
  return (
    <div className="flex flex-col my-6 w-4/5">
      <Tabs defaultValue="Work" className="w-full p-2">
        <TabsList>
          <TabsTrigger value="Work">Work Details</TabsTrigger>
        </TabsList>
        <TabsContent value="Work"><WorkExp notExp={notExp}/></TabsContent>
      </Tabs>
    </div>
  );
};

export default Step2Form;
