export function calculateProfileCompletion(userData: any): number {
  let completedFields = 0;
  const totalFields = 10; // Adjust this number based on criteria

  if (userData.basics.name) completedFields++;
  if (userData.basics.label) completedFields++;
  if (userData.basics.image) completedFields++;
  if (userData.basics.email) completedFields++;
  if (userData.basics.phone) completedFields++;
  if (userData.basics.url) completedFields++;
  if (userData.projects && userData.projects.length > 0 && userData.projects[0].githubUrl)
    completedFields++;
  if (userData.education && userData.education.length > 0) completedFields++;
  if (userData.certificates && userData.certificates.length > 0) completedFields++;
  if (userData.skills && userData.skills.length > 0) completedFields++;

  return Math.round((completedFields / totalFields) * 100);
}
