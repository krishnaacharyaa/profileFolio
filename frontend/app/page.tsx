import { User } from './types/user';
import { getSkillsData, getUserData } from './actions/user-actions';
import ProfileCard from './components/profile-card';
import { SkillRef } from './types/skillRef';

export default async function Home() {
  const user: User = await getUserData();
  const skills: SkillRef[] = await getSkillsData();

  return <ProfileCard user={user} skills={skills} />;
}
