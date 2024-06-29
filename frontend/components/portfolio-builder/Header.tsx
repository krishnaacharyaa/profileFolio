// // app/components/Header.tsx
// import React from 'react';
// import { FaLinkedin, FaTwitter, FaEnvelope ,FaGithub,FaMobile } from 'react-icons/fa';

// interface Profile {
//   network: string;
//   username: string;
//   url: string;
// }

// interface HeaderProps {
//   name: string;
//   label: string;
//   image: string;
//   email: string;
//   phone: string;
//   url: string;
//   profiles:Profile[];
// }

// // const Header: React.FC<HeaderProps> = ({ name, label, image, email, phone, url }) => (
// //   <header className=''>
// //     <div className="">
// //          <img className="rounded-full w-16 h-16" src={"https://images.pexels.com/photos/764529/pexels-photo-764529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt={`${name}'s photo`} />
// //     </div>
// //     <div>
// //         <h1>{name}</h1>
// //         <p>{label}</p>
// //         <a href={`mailto:${email}`}>{email}</a>
// //         <p>{phone}</p>
// //         <a href={url}>{url}</a>
// //     </div>
// //   </header>
// // );


// const Header: React.FC<HeaderProps> = ({ name, label, image, email, phone, url ,profiles}) => (
//   <header className='flex flex-col items-left p-4 bg-gray-100 rounded-lg shadow-md'>
//     <div className="mb-4">
//       <img 
//         className="rounded-full w-32 h-32 object-cover shadow-lg" 
//         src={"https://images.pexels.com/photos/764529/pexels-photo-764529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
//         alt={`${name}'s photo`} 
//       />
//     </div>
//     {/* <div className='text-left'>
//       <h1 className='text-2xl font-bold text-gray-900'>{name}</h1>
//       <p className='text-lg text-gray-600'>{label}</p>
//       <a href={`mailto:${email}`} className='text-blue-500 hover:underline'>{email}</a>
//       <p className='text-gray-600'>{phone}</p>
//       <a href={url} className='text-blue-500 hover:underline'>{url}</a>
//     </div> */}

// <div className='text-left'>
//       <h1 className='text-2xl font-bold text-gray-900'>{name}</h1>
//       <p className='text-lg text-gray-600'>{label}</p>
//       <div className='flex items-center space-x-4'>
//         <a href={`mailto:${email}`} className='text-blue-500 hover:underline flex items-center'>
//           <FaEnvelope className='mr-2' /> {email}
//         </a>
//         <p className='text-blue-500 hover:underline flex items-center'>
//            <FaMobile className='mr-2'/>{phone}
//         </p>
//         <a href={url} className='text-blue-500 hover:underline'>{url}</a>
//       </div>
//       {/* <div className='flex items-center space-x-4 mt-2'>
//         <a href={profiles.LinkedIn} className='text-blue-700 hover:underline flex items-center'>
//           <FaLinkedin className='mr-2' /> LinkedIn
//         </a>
//         <a href={url} className='text-blue-500 hover:underline flex items-center'>
//           <FaGithub className='mr-2' /> Github
//         </a>
//       </div> */}
//       <div className='flex items-center space-x-4 mt-2'>
//         {profiles.map(profile=>{
//           if(profile.network==='LinkedIn'){
//             return(
//               <a key={profile.network} href={profile.url} className='text-blue-700 hover:underline flex items-center'>
//                 <FaLinkedin className='mr-2'/>LinkedIn
//               </a>
//             )
//           } else if(profile.network==='Github'){
//             return (
//               <a key={profile.network} href={profile.url} className='text-blue-500 hover:underline flex items-center'>
//                 <FaGithub className='mr-2' /> GitHub
//               </a>
//             );
//           }
//           return null;
//         })}
//       </div>

//     </div>
//   </header>
// );


// export default Header;

import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope, FaMobile } from 'react-icons/fa';

interface Profile {
  network: string;
  username: string;
  url: string;
}

interface HeaderProps {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  profiles: Profile[];
}

const Header: React.FC<HeaderProps> = ({ name, label, image, email, phone, url, profiles }) => (
  <header className='flex flex-col items-start p-4 bg-gray-100 rounded-lg shadow-md'>
    <div className="mb-4">
      <img 
        className="rounded-full w-32 h-32 object-cover shadow-lg" 
        src={"https://images.pexels.com/photos/764529/pexels-photo-764529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} 
        alt={`${name}'s photo`} 
      />
    </div>
    <div className='text-left'>
      <h1 className='text-2xl font-bold text-gray-900'>{name}</h1>
      <p className='text-lg text-gray-600'>{label}</p>
      <div className='flex items-center space-x-4'>
        <a href={`mailto:${email}`} className='text-blue-500 hover:underline flex items-center'>
          <FaEnvelope className='mr-2' /> {email}
        </a>
        <p className='text-blue-500 hover:underline flex items-center'>
          <FaMobile className='mr-2'/>{phone}
        </p>
        <a href={url} className='text-blue-500 hover:underline'>{url}</a>
      </div>
      <div className='flex items-center space-x-4 mt-2'>
        {profiles.map(profile => {
          if (profile.network === 'LinkedIn') {
            return (
              <a key={profile.network} href={profile.url} className='text-blue-700 hover:underline flex items-center'>
                <FaLinkedin className='mr-2' /> LinkedIn
              </a>
            );
          } else if (profile.network === 'GitHub') {
            return (
              <a key={profile.network} href={profile.url} className='text-blue-500 hover:underline flex items-center'>
                <FaGithub className='mr-2' /> GitHub
              </a>
            );
          }
          return null;
        })}
      </div>
    </div>
  </header>
);

export default Header;

