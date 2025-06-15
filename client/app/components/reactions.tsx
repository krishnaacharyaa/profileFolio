'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnalysisById } from '../lib/resume';
import { RoastAnalysis } from '../types/resume';

interface ReactionPageProps {
	shareId: string;
}

const ReactionPage = ({ shareId }: ReactionPageProps) => {
	const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
	const [showConfetti, setShowConfetti] = useState(false);
	const [analysis, setAnalysis] = useState<RoastAnalysis | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAnalysis = async () => {
			try {
				const analysisData = await getAnalysisById(parseInt(shareId));
				setAnalysis(analysisData);
			} catch (err) {
				setError('Failed to load analysis');
			} finally {
				setLoading(false);
			}
		};
		fetchAnalysis();
	}, [shareId]);

	const handleReaction = (emoji: string) => {
		setSelectedReaction(emoji);
		setShowConfetti(true);
		setTimeout(() => setShowConfetti(false), 2000);
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
					<div className="text-center space-y-2">
						<motion.h1
							className="text-4xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
							animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
							transition={{ duration: 3, repeat: Infinity }}
							style={{ backgroundSize: '200% 200%' }}
						>
							“The roast is in. {analysis.name} made it out... barely.”
						</motion.h1>
						<p className="text-2xl md:text-3xl font-bold text-white">
							Will you?
						</p>
					</div>

					{/* Main analysis card */}
					<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl space-y-8">
						{/* Risk summary */}
						<div className="text-center space-y-4">
							<div className="text-6xl">
								{analysis.ai_risk > 70
									? '💀'
									: analysis.ai_risk > 50
									? '🔥'
									: '🤔'}
							</div>
							<div className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-xl p-4 border border-red-500/30">
								<p className="text-xl md:text-2xl font-bold text-white">
									AI gave{' '}
									<span className="text-red-400 font-black text-3xl">
										{analysis.ai_risk}%
									</span>{' '}
									replaceability score
								</p>
							</div>
						</div>

						{/* Roast details */}
						<div className="bg-black/30 p-6 rounded-xl border border-purple-500/30">
							<h3 className="text-xl font-bold text-purple-300 mb-3">
								The Brutal Verdict:
							</h3>
							<p className="text-white text-base md:text-lg whitespace-pre-line">
								{analysis.roast}
							</p>
						</div>

						{/* Reactions */}
						<div className="space-y-4">
							<p className="text-center text-gray-300 text-base md:text-lg">
								React if you agree 👇
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
										emoji: '👨🏻‍💻',
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
												: 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20'
										}`}
										whileHover={{ scale: 1.2 }}
										whileTap={{ scale: 0.9 }}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.8 + index * 0.1 }}
									>
										<span>{reaction.emoji}</span>
										{/* Fake count */}
										<div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
											{Math.floor(Math.random() * 99) + 1}
										</div>
										{/* Tooltip */}
										<div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-black/80 text-white px-2 py-1 rounded">
											{reaction.label}
										</div>
									</motion.button>
								))}
							</div>
						</div>
					</div>

					{/* CTA */}
					<motion.button
						className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl relative group overflow-hidden"
						whileHover={{ scale: 1.03 }}
						whileTap={{ scale: 0.95 }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.2 }}
					>
						<motion.div
							className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
							animate={{ x: ['-100%', '100%'] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						/>
						<span className="relative z-10 flex justify-center items-center gap-2">
							👉 Upload yours — unless you're scared.{' '}
							<motion.span
								animate={{ x: [0, 5, 0] }}
								transition={{ repeat: Infinity, duration: 1 }}
							>
								🔥
							</motion.span>
						</span>
					</motion.button>

					<p className="text-center text-gray-400 text-sm italic mt-4">
						*Warning: May cause existential crisis and career changes
					</p>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default ReactionPage;
