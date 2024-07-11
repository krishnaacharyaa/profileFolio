// import { User } from '../types/user';
// import ProfileCard from '../components/profile-card';
// import { SkillRef } from '../types/skillRef';
// import { getSkillsData, getUserData } from '@/app/actions/user-actions';

//export default async function Home() {
//  const user: User = await getUserData();
//  const skills: SkillRef[] = await getSkillsData();

// return <ProfileCard user={user} skills={skills} />;
//}


'use client'

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { getSession } from 'next-auth/react';

export default function Home() {
  const [data, setData] = useState(null);
  const { data: session, status } = useSession()
  useEffect(() => {
    const fetchData = async () => {
      const session: any = await getSession();
      if (session) {
        const token = session?.token;
        console.log(token)

        const response = await fetch('http://localhost:8080/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setData(userData);
          console.log(userData)

        } else {
          console.error('Failed to fetch user data');
        }
      }
    };

    fetchData();
  }, []);

  if (status === "authenticated") {
    return (
      <div className="w-screen">
        <div className="m-5">

          <p>This page is an example of how to fetch user details from backend.</p>
          <p>See console.log for more info.</p>
          <p className="">Signed in as {" "}
            <span className="w-[50px] bg-red-500">
              session token : {session?.token}
            </span></p>
        </div>
      </div>
    )
  }

  return <a href="/api/auth/signin">Sign in</a>
}
