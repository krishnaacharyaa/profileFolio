// app/components/Profile.tsx
import React from 'react';

interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

interface ProfileProps {
  summary: string;
  location: Location;
  profiles: { network: string; username: string; url: string }[];
}

const Profile: React.FC<ProfileProps> = ({ summary, location, profiles }) => (
  <section className='p-6 bg-gray-100'>
    <h2 className='text-2xl font-semibold mb-4'>About Me</h2>
    <p className='text-lg text-slate-500'>{summary}</p>
    <div className='text-lg text-slate-500'>
      <p>Address: {location.address}, {location.city}, {location.region}, {location.countryCode}, {location.postalCode}</p>
    </div>
    {/* <div>
      {profiles.map(profile => (
        <a key={profile.network} href={profile.url}>
          {profile.network}: {profile.username}
        </a>
      ))}
    </div> */}
  </section>
);

export default Profile;
