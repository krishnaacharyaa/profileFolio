import { StickyScrollRevealDemo } from '@/components/landing-page/sticky-scroll';
import { Button } from '@/components/ui/button';

export default async function Home() {
  return (
    <div className="bg-white text-gray-800">
      <header className=" drop-shadow">
        <div className="container mx-auto p-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">ProfileFolio</h1>
          <div>
            <Button className="bg-primary mr-4">Sign In</Button>
            <Button variant={'secondary'}>Sign Up</Button>
          </div>
        </div>
      </header>

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
              <div className=" w-full bg-white items-center justify-center space-x-2 rounded-lg border-2 flex flex-col border-b-4  border-black p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 ">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Beautiful Resumes </h3>
                <p className="text-gray-700">
                  Create stunning resumes that stand out to employers.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="bg-white w-full items-center justify-center space-x-2 rounded-lg border-2 flex flex-col border-b-4  border-black p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 ">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Comprehensive Portfolios </h3>
                <p className="text-gray-700">
                  Showcase your work and projects in a professional manner.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="bg-white w-full items-center justify-center space-x-2 rounded-lg border-2 flex flex-col border-b-4  border-black p-3 text-center hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 ">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Github READMEs </h3>
                <p className="text-gray-700">
                  Generate detailed and attractive GitHub README files.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StickyScrollRevealDemo />
      <footer className="bg-white shadow-md mt-20">
        <div className="container mx-auto p-6 text-center">
          <p className="text-gray-600">&copy; 2024 ProfileFolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
