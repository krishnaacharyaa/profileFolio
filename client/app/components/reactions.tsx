'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnalysisById } from '../lib/resume';
import { RoastAnalysis } from '../types/resume';
import { Eye, Users, TrendingUp } from 'lucide-react';

import { useRouter } from 'next/navigation';

interface ReactionPageProps {
	shareId: string;
}

const ReactionPage = ({ shareId }: ReactionPageProps) => {
	const router = useRouter();
	const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
	const [prevReaction, setPrevReaction] = useState<string | null>(null);
	const [showConfetti, setShowConfetti] = useState(false);
	const [analysis, setAnalysis] = useState<RoastAnalysis | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [viewCount, setViewCount] = useState<number>(0);
	const reactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Load reaction from localStorage on mount
	useEffect(() => {
		const storedReaction = localStorage.getItem(`reaction_${shareId}`);
		if (storedReaction) {
			setSelectedReaction(storedReaction);
			setPrevReaction(null);
		}

		const fetchAnalysis = async () => {
			try {
				const analysisData = await getAnalysisById(parseInt(shareId));
				setAnalysis(analysisData);
				// Simulate view count - you can replace this with actual API call
				setViewCount(
					analysisData.view_count || Math.floor(Math.random() * 500) + 50
				);
			} catch {
				setError('Failed to load analysis');
			} finally {
				setLoading(false);
			}
		};
		fetchAnalysis();
	}, [shareId]);

	const handleReaction = (emoji: string) => {
		if (selectedReaction === emoji) return;

		if (reactionTimeoutRef.current) {
			clearTimeout(reactionTimeoutRef.current);
		}

		localStorage.setItem(`reaction_${shareId}`, emoji);
		setPrevReaction(selectedReaction);
		setSelectedReaction(emoji);
		setShowConfetti(true);
		setTimeout(() => setShowConfetti(false), 2000);

		setAnalysis(prev =>
			prev
				? {
						...prev,
						reactions: {
							...prev.reactions,
							...(prevReaction
								? {
										[prevReaction]: Math.max(
											0,
											(prev.reactions[prevReaction] || 0) - 1
										),
								  }
								: {}),
							[emoji]: (prev.reactions[emoji] || 0) + 1,
						},
				  }
				: prev
		);

		reactionTimeoutRef.current = setTimeout(async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/analyses/${shareId}/react`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							reaction: emoji,
							prevReaction: prevReaction || '',
						}),
					}
				);
				if (!response.ok) {
					throw new Error('Failed to submit reaction');
				}
			} catch (err) {
				console.error('Reaction error:', err);
				setAnalysis(prev =>
					prev
						? {
								...prev,
								reactions: {
									...prev.reactions,
									...(prevReaction
										? {
												[prevReaction]: (prev.reactions[prevReaction] || 0) + 1,
										  }
										: {}),
									[emoji]: Math.max(0, (prev.reactions[emoji] || 0) - 1),
								},
						  }
						: prev
				);
				setPrevReaction(null);
				localStorage.setItem(`reaction_${shareId}`, prevReaction || '');
			}
		}, 3000);
	};

	const getHeaderMessage = () => {
		const name = analysis?.name?.trim();
		const hasName = name && name.length > 0 && name.toLowerCase() !== 'unknown';

		if (hasName) {
			return `${name}'s resume just got absolutely demolished`;
		}
		return 'Another resume just got absolutely demolished';
	};

	const getSubMessage = () => {
		const riskLevel = analysis?.ai_risk || 0;
		if (riskLevel > 80) return 'The AI showed no mercy 💀';
		if (riskLevel > 60) return "The future isn't looking bright 🔥";
		if (riskLevel > 40) return "There's still hope... maybe 🤔";
		return 'Not bad, but could be better ✨';
	};

	if (loading || !analysis) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
				<div className="text-white text-xl md:text-2xl">
					{error || 'Loading roast analysis...'}
				</div>
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
								className="absolute text-2xl"
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
			<div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
				<motion.div
					className="w-full max-w-3xl space-y-12"
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					{/* Header */}
					<div className="text-center space-y-6">
						<motion.h1
							className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
							animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
							transition={{ duration: 3, repeat: Infinity }}
							style={{ backgroundSize: '200% 200%' }}
						>
							{getHeaderMessage()}
						</motion.h1>
						<motion.p
							className="text-xl md:text-2xl font-bold text-white/90"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
						>
							{getSubMessage()}
						</motion.p>

						{/* Stats bar */}
						<motion.div
							className="flex justify-center items-center gap-6 text-sm text-white/60"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
						>
							<div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
								<Eye size={16} />
								<span>{viewCount.toLocaleString()} views</span>
							</div>
							<div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
								<Users size={16} />
								<span>
									{Object.values(analysis.reactions).reduce((a, b) => a + b, 0)}{' '}
									reactions
								</span>
							</div>
							<div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
								<TrendingUp size={16} />
								<span>Trending</span>
							</div>
						</motion.div>
					</div>

					{/* Main analysis card */}
					<motion.div
						className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8"
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.8 }}
					>
						{/* Risk summary */}
						<div className="text-center space-y-4">
							<motion.div
								className="text-6xl"
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
							<div className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-xl p-4 border border-red-500/30">
								<p className="text-xl md:text-2xl font-bold text-white">
									AI Replaceability Score:{' '}
									<motion.span
										className="text-red-400 font-black text-3xl"
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
						<div className="bg-black/30 p-6 rounded-xl border border-purple-500/30">
							<h3 className="text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
								<span>🎯</span>
								The Brutal Verdict:
							</h3>
							<p className="text-white text-base md:text-lg whitespace-pre-line leading-relaxed">
								{analysis.roast}
							</p>
						</div>

						{/* Reactions */}
						<div className="space-y-4">
							<p className="text-center text-gray-300 text-base md:text-lg font-medium">
								How did the AI do? Drop your reaction 👇
							</p>
							<div className="flex justify-center gap-3 md:gap-5 flex-wrap">
								{[
									{
										emoji: '💩',
										label: 'Trash',
										color: 'from-yellow-600 to-orange-600',
									},
									{
										emoji: '🔥',
										label: 'Fire',
										color: 'from-red-500 to-orange-500',
									},
									{
										emoji: '🤡',
										label: 'Clown',
										color: 'from-pink-500 to-purple-500',
									},
									{
										emoji: '💀',
										label: 'Dead',
										color: 'from-gray-500 to-black',
									},
									{
										emoji: '😂',
										label: 'LMAO',
										color: 'from-yellow-400 to-yellow-600',
									},
								].map((reaction, index) => (
									<motion.button
										key={reaction.emoji}
										onClick={() => handleReaction(reaction.emoji)}
										className={`relative group text-3xl md:text-4xl p-4 rounded-xl transition-all ${
											selectedReaction === reaction.emoji
												? `bg-gradient-to-br ${reaction.color} shadow-2xl shadow-purple-500/50`
												: 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40'
										}`}
										whileHover={{ scale: 1.2 }}
										whileTap={{ scale: 0.9 }}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 1.0 + index * 0.1 }}
									>
										<span>{reaction.emoji}</span>
										<motion.div
											className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg"
											animate={{ scale: [1, 1.1, 1] }}
											transition={{ duration: 2, repeat: Infinity }}
										>
											{Math.abs(analysis.reactions[reaction.emoji] || 0)}
										</motion.div>
										<div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-black/90 text-white px-3 py-1 rounded-lg transition-opacity duration-200 whitespace-nowrap">
											{reaction.label}
										</div>
									</motion.button>
								))}
							</div>
						</div>
					</motion.div>

					{/* CTA */}
					<motion.button
						className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl relative group overflow-hidden"
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
						<span className="relative z-10 flex justify-center items-center gap-2">
							🎯 Think you can handle the roast? Upload yours now!{' '}
							<motion.span
								animate={{ x: [0, 5, 0] }}
								transition={{ repeat: Infinity, duration: 1 }}
							>
								🔥
							</motion.span>
						</span>
					</motion.button>

					<motion.p
						className="text-center text-gray-400 text-sm italic mt-4"
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
