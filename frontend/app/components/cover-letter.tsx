'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { fetchCoverLetter } from '../helper/ai';
import { getUserData } from '../actions/user-actions';

import { ScrollArea } from '@/components/ui/scroll-area';

export default function CoverLetter() {
  const [description, setDescription] = useState('');
  const [coverLetter, setCoverLetter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchCoverLetter = async () => {
    setIsLoading(true);
    console.log('the message is', coverLetter);
    const profile = await getUserData();
    console.log(profile);
    let letter = await fetchCoverLetter(description, profile);

    let coverLetterArray = letter.split('\\n');
    console.log('array', coverLetterArray);
    setCoverLetter(coverLetterArray);

    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto p-6 md:p-12">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Cover Letter Generator</h1>
        <p className="text-muted-foreground">
          Enter the job description below to generate a personalized cover letter.
        </p>
        <Textarea
          placeholder="Paste the job description here..."
          onChange={(e) => setCoverLetter(e.target.value)}
          className="border border-input rounded-md p-4 h-64 resize-none"
        />
        <Button onClick={handleFetchCoverLetter}>Generate</Button>
      </div>

      <div className="bg-background rounded-md border border-input p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Your Cover Letter</h2>

        <div className="prose text-muted-foreground">
          <ScrollArea className="h-[500px] w-[400px] rounded-md border p-4">
            {isLoading ? (
              <div>loading....</div>
            ) : (
              <div className="flex flex-col gap-1">
                {Array.isArray(coverLetter) &&
                  coverLetter.map((paragraph, idx) => (
                    <div key={idx} className="flex flex-row">
                      <p>{paragraph}</p>
                      <br />
                    </div>
                  ))}
              </div>
            )}
          </ScrollArea>
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent text-muted-foreground hover:text-primary"
          >
            <CopyIcon className="w-5 h-5" />
            <span className="sr-only">Copy</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent text-muted-foreground hover:text-primary"
          >
            <DownloadIcon className="w-5 h-5" />
            <span className="sr-only">Download</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function DownloadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
