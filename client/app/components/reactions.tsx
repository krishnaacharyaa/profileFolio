'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnalysisById } from '../lib/resume';
import { RoastAnalysis } from '../types/resume';
import { Eye, Users, TrendingUp } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/constants/constants';

interface ReactionPageProps {
	shareId: string;
}

interface ReactionButton {
	emoji: string;
	label: string;
	color: string;
}

interface ReactionsObject {
	[emoji: string]: number;
}

const ReactionPage = ({ shareId }: ReactionPageProps) => {
	const router = useRouter();
	const [analysis, setAnalysis] = useState<RoastAnalysis | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [viewCount, setViewCount] = useState<number>(0);
	const [headerMessage, setHeaderMessage] = useState<string>('');
	const [subMessage, setSubMessage] = useState<string>('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [userReactions, setUserReactions] = useState<Set<string>>(new Set());
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Solution 1: Transform reactions array to object
	const transformReactionsToObject = (
		reactionsArray: number[]
	): ReactionsObject => {
		const reactionButtons: ReactionButton[] = [
			{ emoji: '💩', label: 'Trash', color: 'from-yellow-600 to-orange-600' },
			{ emoji: '🔥', label: 'Fire', color: 'from-red-500 to-orange-500' },
			{ emoji: '🤡', label: 'Clown', color: 'from-pink-500 to-purple-500' },
			{ emoji: '💀', label: 'Dead', color: 'from-gray-500 to-black' },
			{ emoji: '😂', label: 'LMAO', color: 'from-yellow-400 to-yellow-600' },
		];

		const reactionsObject: ReactionsObject = {};
		reactionButtons.forEach((reaction, index) => {
			reactionsObject[reaction.emoji] = reactionsArray[index] || 0;
		});

		return reactionsObject;
	};
	// Load user's previous reactions on mount
	useEffect(() => {
		const storedReactions = localStorage.getItem(`user_reactions_${shareId}`);
		if (storedReactions) {
			setUserReactions(new Set(JSON.parse(storedReactions)));
		}
	}, [shareId]);

	const handleReaction = async (emoji: string) => {
		if (isSubmitting) return;

		// Check if user already reacted with this emoji
		if (userReactions.has(emoji)) {
			// Optional: Show a toast or visual feedback
			console.log(`Already reacted with ${emoji}`);
			return;
		}

		setIsSubmitting(true);

		// Optimistically update UI
		setAnalysis(prev => {
			if (!prev) return prev;
			const newReactions = { ...prev.reactions };
			// Add safety check here
			newReactions[emoji] = (newReactions[emoji] || 0) + 1;
			return { ...prev, reactions: newReactions };
		});

		// Update user reactions
		const newUserReactions = new Set(userReactions);
		newUserReactions.add(emoji);
		setUserReactions(newUserReactions);

		// Save to localStorage
		localStorage.setItem(
			`user_reactions_${shareId}`,
			JSON.stringify([...newUserReactions])
		);

		try {
			const response = await fetch(
				`${API_BASE_URL}/api/analyses/${shareId}/react`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ reaction: emoji }),
				}
			);

			if (!response.ok) {
				throw new Error('Failed to submit reaction');
			}

			// Optional: Add visual feedback
			setShowConfetti(true);
			timeoutRef.current = setTimeout(() => setShowConfetti(false), 1500);

			// Store timeout ID for cleanup if needed
			// You can add this to a ref if you want to clear it on unmount
		} catch (err) {
			console.error('Reaction error:', err);

			// Rollback optimistic updates
			setAnalysis(prev => {
				if (!prev) return prev;
				const newReactions = { ...prev.reactions };
				// Add safety check here too
				newReactions[emoji] = Math.max(0, (newReactions[emoji] || 0) - 1);
				return { ...prev, reactions: newReactions };
			});

			// Rollback user reactions
			const rolledBackReactions = new Set(userReactions);
			rolledBackReactions.delete(emoji);
			setUserReactions(rolledBackReactions);
			localStorage.setItem(
				`user_reactions_${shareId}`,
				JSON.stringify([...rolledBackReactions])
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Updated reaction buttons rendering
	const reactionButtons = [
		{ emoji: '💩', label: 'Trash', color: 'from-yellow-600 to-orange-600' },
		{ emoji: '🔥', label: 'Fire', color: 'from-red-500 to-orange-500' },
		{ emoji: '🤡', label: 'Clown', color: 'from-pink-500 to-purple-500' },
		{ emoji: '💀', label: 'Dead', color: 'from-gray-500 to-black' },
		{ emoji: '😂', label: 'LMAO', color: 'from-yellow-400 to-yellow-600' },
	];

	const [showConfetti, setShowConfetti] = useState(false);

	// Load reaction from localStorage on mount
	useEffect(() => {
		const fetchAnalysis = async () => {
			try {
				const analysisData = await getAnalysisById(shareId);
				if (Array.isArray(analysisData.reactions)) {
					analysisData.reactions = transformReactionsToObject(
						analysisData.reactions
					);
				}
				setAnalysis(analysisData);

				// Simulate view count - you can replace this with actual API call
				setViewCount(analysisData.view_count || 1);

				// Generate consistent messages based on shareId and analysis data
				setHeaderMessage(getHeaderMessage(analysisData, shareId));
				setSubMessage(getSubMessage(analysisData));
			} catch {
				setError('Failed to load analysis');
			} finally {
				setLoading(false);
			}
		};
		fetchAnalysis();
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [shareId]);

	const getHeaderMessage = (analysisData: RoastAnalysis, id: string) => {
		const name = analysisData?.name?.trim();
		const hasName = name && name.length > 0 && name.toLowerCase() !== 'unknown';
		const firstName = hasName ? name.split(' ')[0] : null;

		const messages = [
			firstName ? `${firstName} got roasted ` : 'Someone got roasted ',
			firstName
				? `${firstName} didn't see this coming `
				: "They didn't see this coming ",
			firstName
				? `${firstName} just got exposed `
				: 'Someone just got exposed ',
			firstName
				? `${firstName} thought they were safe...`
				: 'They thought they were safe...',
			firstName ? `RIP ${firstName}'s career ` : "RIP someone's career ",
		];

		// Create a simple hash function to consistently select the same message for the same shareId
		const hash = id
			.split('')
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		return messages[hash % messages.length];
	};

	const getSubMessage = (analysisData: RoastAnalysis) => {
		const riskLevel = analysisData?.ai_risk || 0;
		if (riskLevel > 80) return 'The AI was absolutely ruthless';
		if (riskLevel > 60) return "This one's gonna leave a mark";
		if (riskLevel > 40) return "Ouch, that's gotta hurt";
		return 'Not terrible, but still brutal';
	};

	if (loading || !analysis) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 relative overflow-hidden">
				{/* Animated background particles */}
				<div className="absolute inset-0 pointer-events-none">
					{[...Array(50)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
							animate={{
								x: [0, Math.random() * 200 - 100],
								y: [0, Math.random() * 200 - 100],
								opacity: [0, 1, 0],
								scale: [0, 1, 0],
							}}
							transition={{
								duration: 3 + Math.random() * 2,
								repeat: Infinity,
								delay: Math.random() * 2,
							}}
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
							}}
						/>
					))}
				</div>

				{/* Pulsing background rings */}
				<motion.div
					className="absolute inset-0 flex items-center justify-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					{[...Array(3)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute border border-purple-500/20 rounded-full"
							animate={{
								scale: [1, 2, 1],
								opacity: [0.5, 0, 0.5],
							}}
							transition={{
								duration: 3,
								repeat: Infinity,
								delay: i * 0.5,
							}}
							style={{
								width: `${150 + i * 100}px`,
								height: `${150 + i * 100}px`,
							}}
						/>
					))}
				</motion.div>

				{/* Main loading content */}
				<motion.div
					className="relative z-10 text-center space-y-8 max-w-lg px-6"
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{/* Loading icon with rotation */}
					<motion.div
						className="flex justify-center"
						animate={{ rotate: 360 }}
						transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
					>
						<motion.div
							className="text-6xl sm:text-7xl"
							animate={{
								scale: [1, 1.2, 1],
								filter: [
									'drop-shadow(0 0 0px #ff0080)',
									'drop-shadow(0 0 20px #ff0080)',
									'drop-shadow(0 0 0px #ff0080)',
								],
							}}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							🔥
						</motion.div>
					</motion.div>

					{/* Loading text with typewriter effect */}
					<motion.div
						className="space-y-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						<motion.h2
							className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
							animate={{
								backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
							}}
							transition={{ duration: 3, repeat: Infinity }}
							style={{ backgroundSize: '200% 200%' }}
						>
							{error || 'Preparing the Roast...'}
						</motion.h2>

						{!error && (
							<motion.div
								className="space-y-3"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 1 }}
							>
								<motion.p
									className="text-white/80 text-lg font-medium"
									animate={{ opacity: [0.5, 1, 0.5] }}
									transition={{ duration: 2, repeat: Infinity }}
								>
									AI is analyzing the carnage...
								</motion.p>

								{/* Loading progress bar */}
								<div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
									<motion.div
										className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
										initial={{ width: '0%' }}
										animate={{ width: '100%' }}
										transition={{
											duration: 3,
											repeat: Infinity,
											ease: 'easeInOut',
										}}
									/>
								</div>
							</motion.div>
						)}
					</motion.div>

					{/* Loading stages animation */}
					{!error && (
						<motion.div
							className="flex justify-center space-x-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.5 }}
						>
							{['📊', '🤖', '💀'].map((emoji, index) => (
								<motion.div
									key={index}
									className="text-2xl sm:text-3xl"
									animate={{
										scale: [1, 1.3, 1],
										opacity: [0.3, 1, 0.3],
									}}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										delay: index * 0.3,
									}}
								>
									{emoji}
								</motion.div>
							))}
						</motion.div>
					)}

					{/* Floating action hints */}
					{!error && (
						<motion.div
							className="text-gray-400 text-sm space-y-2"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 2 }}
						>
							<motion.p
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 2.5, repeat: Infinity }}
							>
								🎯 Calculating destruction level...
							</motion.p>
							<motion.p
								animate={{ opacity: [0.5, 1, 0.5] }}
								transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
							>
								⚡ Preparing brutal honesty...
							</motion.p>
						</motion.div>
					)}

					{/* Error state enhancement */}
					{error && (
						<motion.div
							className="space-y-4"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.5 }}
						>
							<motion.div
								className="text-4xl"
								animate={{
									rotate: [0, -10, 10, -10, 0],
									scale: [1, 1.1, 1],
								}}
								transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
							>
								💥
							</motion.div>
							<p className="text-red-400 font-medium">
								Something went wrong! The roast might be too hot to handle.
							</p>
							<motion.button
								className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-medium"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => window.location.reload()}
							>
								Try Again 🔄
							</motion.button>
						</motion.div>
					)}
				</motion.div>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.98 }}
			animate={{ opacity: 1, scale: 1 }}
			className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 overflow-hidden relative"
		>
			{/* Background particles */}
			<div className="absolute inset-0 pointer-events-none">
				{[...Array(25)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-2 h-2 bg-white/10 rounded-full"
						animate={{
							x: [0, Math.random() * 100 - 50],
							y: [0, Math.random() * 100 - 50],
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: 3 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
					/>
				))}
			</div>

			{/* Confetti */}
			<AnimatePresence>
				{showConfetti && (
					<div className="absolute inset-0 pointer-events-none z-20">
						{[...Array(30)].map((_, i) => (
							<motion.div
								key={i}
								className="absolute text-xl sm:text-2xl"
								initial={{ x: '50vw', y: '50vh', scale: 0 }}
								animate={{
									x: Math.random() * window.innerWidth,
									y: Math.random() * window.innerHeight,
									scale: [0, 1, 0],
									rotate: 360,
								}}
								exit={{ opacity: 0 }}
								transition={{ duration: 2 }}
							>
								{['🎉', '✨', '💥', '🔥', '💀'][Math.floor(Math.random() * 5)]}
							</motion.div>
						))}
					</div>
				)}
			</AnimatePresence>

			{/* Content */}
			<div className="relative z-10 min-h-screen flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
				<motion.div
					className="w-full max-w-3xl space-y-6 sm:space-y-8 md:space-y-12"
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					{/* Header */}
					<div className="text-center space-y-3 sm:space-y-4">
						<motion.h1
							className="text-2xl sm:text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 px-2"
							animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
							transition={{ duration: 3, repeat: Infinity }}
							style={{ backgroundSize: '200% 200%' }}
						>
							{headerMessage}
						</motion.h1>
						<motion.p
							className="text-base sm:text-lg md:text-xl font-medium text-white/80 px-2"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
						>
							{subMessage}
						</motion.p>

						{/* Views highlight */}
						<motion.div
							className="flex justify-center px-2"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.6 }}
						>
							<div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 backdrop-blur-xl border border-purple-400/30 px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg max-w-full">
								<div className="flex items-center gap-2 text-white font-bold">
									<motion.span
										animate={{
											scale: [1, 1.2, 1],
											rotate: [0, -10, 10, 0],
										}}
										transition={{
											duration: 2,
											repeat: Infinity,
											repeatType: 'reverse',
										}}
										className="text-lg sm:text-xl"
									>
										👀
									</motion.span>
									<span className="text-sm sm:text-base md:text-lg text-center">
										{viewCount.toLocaleString()} people witnessed this carnage
									</span>
								</div>
							</div>
						</motion.div>
					</div>

					{/* Main analysis card */}
					<motion.div
						className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl space-y-6 sm:space-y-8"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8 }}
					>
						{/* Risk summary */}
						<div className="text-center space-y-3 sm:space-y-4">
							<motion.div
								className="text-4xl sm:text-5xl md:text-6xl"
								animate={{
									scale: [1, 1.1, 1],
									rotate: [0, 5, -5, 0],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									repeatType: 'reverse',
								}}
							>
								{analysis.ai_risk > 70
									? '💀'
									: analysis.ai_risk > 50
									? '🔥'
									: '🤔'}
							</motion.div>
							<div className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-xl p-3 sm:p-4 border border-red-500/30">
								<p className="text-lg sm:text-xl md:text-2xl font-bold text-white">
									AI Replaceability Score:{' '}
									<motion.span
										className="text-red-400 font-black text-xl sm:text-2xl md:text-3xl block sm:inline mt-1 sm:mt-0"
										animate={{
											textShadow: [
												'0 0 0px #ff0000',
												'0 0 10px #ff0000',
												'0 0 0px #ff0000',
											],
										}}
										transition={{ duration: 2, repeat: Infinity }}
									>
										{analysis.ai_risk}%
									</motion.span>
								</p>
							</div>
						</div>

						{/* Roast details */}
						<div className="bg-black/30 p-4 sm:p-6 rounded-xl border border-purple-500/30">
							<h3 className="text-lg sm:text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
								<span>🎯</span>
								The Brutal Verdict:
							</h3>
							<p className="text-white text-sm sm:text-base md:text-lg whitespace-pre-line leading-relaxed">
								{analysis.roast}
							</p>
						</div>

						{/* Reactions */}
						<div className="flex justify-center gap-2 sm:gap-3 md:gap-5 flex-wrap px-1">
							{reactionButtons.map((reaction, index) => {
								const hasReacted = userReactions.has(reaction.emoji);

								return (
									<motion.button
										key={reaction.emoji}
										onClick={() => handleReaction(reaction.emoji)}
										disabled={isSubmitting || hasReacted}
										className={`relative group text-2xl sm:text-3xl md:text-4xl p-2 sm:p-3 md:p-4 rounded-xl transition-all ${
											hasReacted
												? `bg-gradient-to-br ${reaction.color} shadow-2xl shadow-purple-500/50 cursor-not-allowed`
												: isSubmitting
												? 'opacity-50 cursor-not-allowed bg-white/10'
												: 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 hover:scale-110'
										}`}
										whileHover={
											!isSubmitting && !hasReacted ? { scale: 1.2 } : {}
										}
										whileTap={
											!isSubmitting && !hasReacted ? { scale: 0.9 } : {}
										}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 1.0 + index * 0.1 }}
									>
										<span className={hasReacted ? 'filter brightness-110' : ''}>
											{reaction.emoji}
										</span>
										<motion.div
											className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center shadow-lg"
											animate={{ scale: [1, 1.1, 1] }}
											transition={{ duration: 2, repeat: Infinity }}
										>
											{analysis?.reactions?.[reaction.emoji] || 0}
										</motion.div>
										<div className="absolute -bottom-8 sm:-bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-black/90 text-white px-2 sm:px-3 py-1 rounded-lg transition-opacity duration-200 whitespace-nowrap">
											{hasReacted
												? `You voted ${reaction.label}`
												: reaction.label}
										</div>
									</motion.button>
								);
							})}
						</div>
					</motion.div>

					{/* CTA */}
					<motion.button
						className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg md:text-xl shadow-xl relative group overflow-hidden"
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.95 }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.4 }}
						onClick={() => router.push('/')}
					>
						<motion.div
							className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
							animate={{ x: ['-100%', '100%'] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						/>
						<span className="relative z-10 flex justify-center items-center gap-2 px-2">
							<span className="text-center">
								🎯 Think you can handle the roast? Upload yours now!
							</span>
							<motion.span
								animate={{ x: [0, 5, 0] }}
								transition={{ repeat: Infinity, duration: 1 }}
								className="hidden sm:inline"
							>
								🔥
							</motion.span>
						</span>
					</motion.button>

					<motion.p
						className="text-center text-gray-400 text-xs sm:text-sm italic mt-3 sm:mt-4 px-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.6 }}
					>
						⚠️ Side effects may include: existential dread, career pivots, and
						uncontrollable laughter
					</motion.p>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default ReactionPage;
