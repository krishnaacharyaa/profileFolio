import React, { useState } from 'react';

interface AboutData {
    working: string;
    learning: string;
    funFact: string;
}

interface AboutSectionProps {
    onUpdate: (data: AboutData) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onUpdate }) => {
    const [about, setAbout] = useState<AboutData>({
        working: '',
        learning: '',
        funFact: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAbout(prev => ({ ...prev, [name]: value }));
        onUpdate({ ...about, [name]: value });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">About Me</h2>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    🔭 I'm currently working on
                </label>
                <input
                    type="text"
                    name="working"
                    value={about.working}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    🌱 I'm currently learning
                </label>
                <input
                    type="text"
                    name="learning"
                    value={about.learning}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    ⚡ Fun fact
                </label>
                <input
                    type="text"
                    name="funFact"
                    value={about.funFact}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
        </div>
    );
};

export default AboutSection;