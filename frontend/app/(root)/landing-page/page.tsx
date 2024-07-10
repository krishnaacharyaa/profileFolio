import FeatureSection from '@/components/landing-page/feature-section';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <div className="bg-white text-gray-800">
      <div className="container mx-auto p-6 bg-white">
        <div className="text-center my-20">
          <div className="mx-auto mb-4 border-black border-2 w-fit p-1 px-4 rounded-md text-sm">
            A Reliable Partner
          </div>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Elevate Your Professional Dev Presence
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            A free and open-source profile builder that takes care of the portfolio, resume and
            github readme for you.
          </p>
          <Button>Get Started</Button>
        </div>

        <div className="my-4">
          <div className="mx-auto mb-4 border-black border-2 w-fit p-1 px-4 rounded-md text-sm">
            How it works
          </div>
          <div className="text-2xl font-bold mb-12 mx-auto w-fit">Easy as that</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="bg-white w-full items-center justify-center space-x-2 rounded-lg border-2 flex flex-col border-b-4 border-black p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Your Details</h3>
                <p className="text-gray-700">
                  Take a moment to provide us with your personal and professional information.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="bg-white w-full items-center justify-center space-x-2 rounded-lg border-2 flex flex-col border-b-4 border-black p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Choose Top Templates</h3>
                <p className="text-gray-700">
                  Select from our expertly designed templates for portfolios, resumes, and GitHub
                  READMEs.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="bg-white w-full items-center justify-center space-x-2 rounded-lg border-2 flex flex-col border-b-4 border-black p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Showcase and Shine</h3>
                <p className="text-gray-700">
                  Share your profile link, download your resume, and impress in your job interviews.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FeatureSection />
      <footer className="bg-white shadow-md mt-20">
        <div className="container mx-auto p-6 text-center">
          <p className="text-gray-600">&copy; 2024 ProfileFolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
