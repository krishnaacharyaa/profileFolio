'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAnalysisById } from '../lib/resume';
import { RoastAnalysis } from '../types/resume';

interface ReactionPageProps {
	shareId: string;
}
// interface RoastAnalysis {
// 	id: number;
// 	name: string;
// 	ai_risk: number;
// 	roast: string;
// 	created_at: string;
// }

const ReactionPage = ({ shareId }: ReactionPageProps) => {
	const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
	const [showConfetti, setShowConfetti] = useState(false);
	const [analysis, setAnalysis] = useState<RoastAnalysis | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchAnalysis = async () => {
			try {
				// Convert shareId to number if your backend expects numeric IDs
				const analysisData = await getAnalysisById(parseInt(shareId));
				setAnalysis(analysisData);
			} catch (err) {
				setError('Failed to load analysis');
				console.error(err);
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

	if (loading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 flex items-center justify-center">
				<div className="text-white text-2xl">Loading roast analysis...</div>
			</div>
		);
	}

	if (error || !analysis) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 flex items-center justify-center">
				<div className="text-white text-2xl">
					{error || 'Analysis not found'}
				</div>
			</div>
		);
	}

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 relative overflow-hidden"
		>
			{/* Animated background particles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(20)].map((_, i) => (
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

			{/* Confetti explosion */}
			<AnimatePresence>
				{showConfetti && (
					<div className="absolute inset-0 pointer-events-none">
						{[...Array(30)].map((_, i) => (
							<motion.div
								key={i}
								className="absolute text-2xl"
								initial={{
									x: '50vw',
									y: '50vh',
									scale: 0,
									rotate: 0,
								}}
								animate={{
									x: Math.random() * window.innerWidth,
									y: Math.random() * window.innerHeight,
									scale: [0, 1, 0],
									rotate: 360,
								}}
								exit={{ opacity: 0 }}
								transition={{
									duration: 2,
									ease: 'easeOut',
								}}
							>
								{['🎉', '✨', '💥', '🔥', '💀'][Math.floor(Math.random() * 5)]}
							</motion.div>
						))}
					</div>
				)}
			</AnimatePresence>

			<div className="relative z-10 min-h-screen flex items-center justify-center p-4">
				<motion.div
					className="max-w-2xl w-full"
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					{/* Header with glitch effect */}
					<motion.div
						className="text-center mb-12"
						animate={{
							textShadow: [
								'0 0 10px rgba(147, 51, 234, 0.5)',
								'0 0 20px rgba(147, 51, 234, 0.8)',
								'0 0 10px rgba(147, 51, 234, 0.5)',
							],
						}}
						transition={{ duration: 2, repeat: Infinity }}
					>
						<motion.h1
							className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4"
							animate={{
								backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
							}}
							transition={{ duration: 3, repeat: Infinity }}
							style={{ backgroundSize: '200% 200%' }}
						>
							{analysis.name} survived the meme verdict...
						</motion.h1>
						<motion.p
							className="text-2xl md:text-3xl font-bold text-white"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
						>
							Will you?
						</motion.p>
					</motion.div>

					{/* Roast result with glassmorphism */}
					<motion.div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl">
						<div className="text-center mb-8">
							<motion.div className="text-6xl mb-4">
								{analysis.ai_risk > 70
									? '💀'
									: analysis.ai_risk > 50
									? '🔥'
									: '🤔'}
							</motion.div>
							<motion.div className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl p-6 border border-red-500/30">
								<p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
									AI gave {analysis.name} a{' '}
									<span className="text-red-400 font-black text-3xl">
										{analysis.ai_risk}%
									</span>{' '}
									replaceable score
								</p>
							</motion.div>
						</div>

						{/* Roast content */}
						<div className="mb-8 bg-black/30 p-6 rounded-xl border border-purple-500/30">
							<h3 className="text-xl font-bold text-purple-300 mb-4">
								The Brutal Verdict:
							</h3>
							<p className="text-white text-lg whitespace-pre-line">
								{analysis.roast}
							</p>
						</div>

						{/* Enhanced reaction buttons */}
						<div className="mb-8">
							<motion.p
								className="text-center text-gray-300 mb-6 text-lg"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.8 }}
							>
								React with the below emojis if you agree
							</motion.p>

							<div className="flex justify-center gap-4 flex-wrap">
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
										className={`relative group text-4xl md:text-5xl p-4 md:p-6 rounded-2xl transition-all duration-300 ${
											selectedReaction === reaction.emoji
												? `bg-gradient-to-br ${reaction.color} shadow-2xl shadow-purple-500/50`
												: 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
										}`}
										whileHover={{
											scale: 1.2,
											rotate: [-5, 5, -5, 0],
											transition: { duration: 0.3 },
										}}
										whileTap={{ scale: 0.9 }}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.9 + index * 0.1 }}
									>
										<motion.span
											animate={
												selectedReaction === reaction.emoji
													? {
															scale: [1, 1.3, 1],
															rotate: [0, 360, 0],
													  }
													: {}
											}
											transition={{ duration: 0.6 }}
										>
											{reaction.emoji}
										</motion.span>

										{/* Reaction count (fake) */}
										<motion.div
											className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
											initial={{ scale: 0 }}
											animate={{
												scale: selectedReaction === reaction.emoji ? 1 : 0,
											}}
										>
											{Math.floor(Math.random() * 99) + 1}
										</motion.div>

										{/* Hover tooltip */}
										<div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
											{reaction.label}
										</div>
									</motion.button>
								))}
							</div>
						</div>
					</motion.div>

					{/* CTA Button with insane animations */}
					<motion.button
						// onClick={() => setCurrentPage('upload')}
						className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-6 rounded-2xl font-black text-xl md:text-2xl shadow-2xl group"
						whileHover={{
							scale: 1.05,
							boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)',
						}}
						whileTap={{ scale: 0.95 }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.2 }}
					>
						{/* Animated background */}
						<motion.div
							className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
							animate={{
								x: ['-100%', '100%'],
							}}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: 'easeInOut',
							}}
						/>

						<span className="relative z-10 flex items-center justify-center gap-3">
							👉 Upload yours — unless you're scared.
							<motion.span
								animate={{ x: [0, 5, 0] }}
								transition={{ duration: 1, repeat: Infinity }}
							>
								🔥
							</motion.span>
						</span>
					</motion.button>

					{/* Bottom meme text */}
					<motion.p
						className="text-center text-gray-400 mt-6 text-sm italic"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1.5 }}
					>
						*Warning: May cause existential crisis and career changes
					</motion.p>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default ReactionPage;
