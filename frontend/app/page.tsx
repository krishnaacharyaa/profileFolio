import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

export default async function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="pt-20 pb-32 text-center">
          <span className="inline-block px-4 py-1 mb-6 text-sm font-semibold tracking-wider text-indigo-700 uppercase bg-indigo-100 rounded-full">
            A Reliable Partner
          </span>
          <h1 className="mb-8 text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Elevate Your Professional Dev Presence
          </h1>
          <p className="max-w-2xl mx-auto mb-10 text-xl text-gray-600">
            A free and open-source profile builder that takes care of your portfolio, resume, and
            GitHub README — all in one place.
          </p>
          <Button size="lg" className="px-8 py-3 text-lg font-semibold">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>

        {/* How it Works Section */}
        <section className="py-20">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold tracking-wider text-indigo-700 uppercase bg-indigo-100 rounded-full">
              How it works
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Easy as 1-2-3</h2>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                title: 'Enter Your Details',
                description:
                  'Fill in your professional information, skills, and experiences in our user-friendly form.',
              },
              {
                title: 'Choose Top Templates',
                description:
                  'Select from our curated collection of modern, ATS-friendly templates for your portfolio and resume.',
              },
              {
                title: 'Showcase and Shine',
                description:
                  'Generate your polished profile, download your resume, and update your GitHub README with a single click.',
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="mt-4 mb-4 text-xl font-semibold text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Section */}
        <FeatureSection />

        {/* CTA Section */}
        <section className="py-20 bg-indigo-700 rounded-3xl my-20">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to boost your career?
            </h2>
            <p className="mb-8 text-xl text-indigo-100">
              Join thousands of developers who've already taken the leap.
            </p>
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg font-semibold">
              Start Building Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Product
              </h3>
              <ul className="mt-4 space-y-4">
                {['Features', 'Pricing', 'FAQ', 'Support'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Repeat for Company, Resources, and Legal sections */}
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; 2024 ProfileFolio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
function FeatureSection() {
  const features = [
    {
      title: 'Beautiful Resumes',
      icon: '📄',
      description: 'Create stunning resumes that stand out to employers.',
      subFeatures: [
        'ATS-friendly templates',
        'Custom sections and layouts',
        'One-click formatting',
      ],
    },
    {
      title: 'Comprehensive Portfolios',
      icon: '💼',
      description: 'Showcase your work and projects in a professional manner.',
      subFeatures: [
        'Customizable project showcases',
        'Integrated blog functionality',
        'SEO optimization tools',
      ],
    },
    {
      title: 'GitHub READMEs',
      icon: '📘',
      description: 'Generate detailed and attractive GitHub README files.',
      subFeatures: [
        'Dynamic stats integration',
        'Custom badge creation',
        'Automatic project highlighting',
      ],
    },
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold tracking-wider text-indigo-700 uppercase bg-indigo-100 rounded-full">
          Features
        </span>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">What we offer</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
            <ul className="mt-4 space-y-2">
              {feature.subFeatures.map((item, i) => (
                <li key={i} className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-2" /> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
