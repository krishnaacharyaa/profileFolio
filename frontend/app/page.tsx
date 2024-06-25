import { User } from './types/user';
import { getUserData } from './actions/user-actions';
import ProfileCard from './components/profile-card';

export default async function Home() {
  const user: User = await getUserData();

  return <ProfileCard user={user} />;
}
