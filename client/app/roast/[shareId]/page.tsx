import ReactionPage from '@/app/components/reactions';
import { getAnalysisById } from '@/app/lib/resume';
import { Metadata } from 'next';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ shareId: string }>;
}): Promise<Metadata> {
	// Await the params since they're now a Promise in Next.js 15
	const { shareId } = await params;
	const analysis = await getAnalysisById(shareId);

	// Generate dynamic titles and descriptions based on risk level
	const getTitle = (risk: number, name?: string) => {
		const baseName = name ? `${name}'s` : 'This';
		if (risk > 80) return `${baseName} Resume Got Absolutely Destroyed 🔥`;
		if (risk > 60) return `${baseName} Resume Got Roasted Hard 💀`;
		if (risk > 40) return `${baseName} Resume Got Some Burns 🤡`;
		return `${baseName} Resume Got Lightly Toasted 😅`;
	};

	const getDescription = (risk: number) => {
		if (risk > 80)
			return 'The AI recruiter showed no mercy! See how bad it was...';
		if (risk > 60) return 'The roast was brutal! See what the AI had to say...';
		if (risk > 40)
			return 'The AI had some strong opinions about this resume...';
		return 'The AI had some feedback about this resume...';
	};

	const title = getTitle(analysis.ai_risk, analysis.name);
	const description = getDescription(analysis.ai_risk);

	// Your static image URL
	const imageUrl =
		'https://github.com/user-attachments/assets/23117414-d462-4f3e-934d-6ce4025969fa';

	return {
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			images: [
				{
					url: imageUrl,
					width: 1200,
					height: 630,
					alt: title,
				},
			],
			url: `https://profilefolio-eosin.vercel.app/roast/${shareId}`,
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: title,
			description: description,
			images: [imageUrl],
		},
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ shareId: string }>;
}) {
	// Await the params since they're now a Promise in Next.js 15
	const { shareId } = await params;
	return <ReactionPage shareId={shareId} />;
}
