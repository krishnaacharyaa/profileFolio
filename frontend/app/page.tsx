import { User } from '../types/user';
import ProfileCard from '../components/profile-card';
import { SkillRef } from '../types/skillRef';
import { getSkillsData, getUserData } from '@/app/actions/user-actions';

export default async function Home() {
  const user: User = await getUserData();
  const skills: SkillRef[] = await getSkillsData();

  return <ProfileCard user={user} skills={skills} />;
}
