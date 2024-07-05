import React from "react";
 interface Language {
    language: string;
    fluency: string;
}
  
interface Interest {
  name: string;
  keywords: string[];
}
interface Certificate {
  name: string;
  date: { $date: string };
  issuer: string;
  url: string;
}

interface FooterProps {
    languages: Language[];
    interests: Interest[];
    certificates: Certificate[];
  }

const Footer = () => (
  <footer className="bg-gray-200 p-8">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Certifications</h3>
          <ul className="list-disc list-inside">
              <li className="text-gray-700">
                <a href={'www'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {`Certified Kubernetes Administrator - CNCF`}
                </a> - {`CNCF `} (15/7/2020)
              </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Languages</h3>
          <ul className="list-disc list-inside">
              <li className="text-gray-700">
                {`English`} - {'Fluent'}
              </li>
              <li  className="text-gray-700">
                {`English`} - {'Fluent'}
              </li>
              <li className="text-gray-700">
                {`English`} - {'Fluent'}
              </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Interests</h3>
          <ul className="list-disc list-inside">
              <li className="text-gray-700">
                {'Traveling'}: {`Backpacking, Cultural Experiences`}
              </li>
              <li className="text-gray-700">
                {'Traveling'}: {`Backpacking, Cultural Experiences`}
              </li>
          </ul>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">Certifications</h3>
          <ul className="list-disc list-inside">
            {certificates.map((cert, index) => (
              <li key={index} className="text-gray-700">
                <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {cert.name}
                </a> - {cert.issuer} ({new Date(cert.date.$date).toLocaleDateString()})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Languages</h3>
          <ul className="list-disc list-inside">
            {languages.map((lang, index) => (
              <li key={index} className="text-gray-700">
                {lang.language} - {lang.fluency}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Interests</h3>
          <ul className="list-disc list-inside">
            {interests.map((interest, index) => (
              <li key={index} className="text-gray-700">
                {interest.name}: {interest.keywords.join(', ')}
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  </footer>
);

export default Footer;