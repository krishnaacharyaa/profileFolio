import React, { useState } from 'react';

interface SocialLinksProps {
    onSocialLinksChange: (links: SocialLinksData) => void;
}

export interface SocialLinksData {
    youtube: string;
    linkedin: string;
    stackoverflow: string;
    facebook: string;
    instagram: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ onSocialLinksChange }) => {
    const [links, setLinks] = useState<SocialLinksData>({
        youtube: '',
        linkedin: '',
        stackoverflow: '',
        facebook: '',
        instagram: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedLinks = { ...links, [name]: value };
        setLinks(updatedLinks);
        onSocialLinksChange(updatedLinks);
    };

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Social Links</h2>
            {Object.keys(links).map((platform) => (
                <div key={platform} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </label>
                    <input
                        type="url"
                        name={platform}
                        value={links[platform as keyof SocialLinksData]}
                        onChange={handleInputChange}
                        placeholder={`Enter your ${platform} profile URL`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            ))}
        </div>
    );
};

export default SocialLinks;