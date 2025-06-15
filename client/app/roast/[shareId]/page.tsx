import ReactionPage from '@/app/components/reactions';

export default function Page({ params }: { params: { shareId: string } }) {
	return <ReactionPage shareId={params.shareId} />;
}
