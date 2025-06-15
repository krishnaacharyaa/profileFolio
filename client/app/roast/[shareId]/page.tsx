import ReactionPage from '@/app/components/reactions';

export default async function Page({ params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params; // Await params to resolve shareId
  return <ReactionPage shareId={shareId} />;
}