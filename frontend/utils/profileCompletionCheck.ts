//export type UserData = z.infer<typeof UserSchema>;

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

// get API endpoint BE
export const fetchUserData = async () => {
  const session: any = await getServerSession(authOptions);
  try {
    const response = await fetch('http://localhost:8080/api/user', {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const calculateProfileCompletion = (userData: any) => {
  let completedFields = 0;
  const totalFields = 10; // Adjust based on your criteria

  // Check if specific fields are filled
  if (userData.basics?.name) completedFields++; // name
  if (userData.basics?.label) completedFields++; // label Role
  if (userData.basics?.image) completedFields++; // image
  if (userData.basics?.email) completedFields++; // Email
  if (userData.basics?.phone) completedFields++; // phone
  if (userData.basics?.url) completedFields++; // url
  if (userData.projects[0]?.githubUrl) completedFields++; // github
  if (userData.education[0]?.institution) completedFields++; //  education
  if (userData.certificates[0]?.name) completedFields++; //  certificates
  if (userData.projects[0].techStack.length > 2) completedFields++; //  skills

  return (completedFields / totalFields) * 100;
};

