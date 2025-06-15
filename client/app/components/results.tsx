'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	Share2,
	Copy,
	Twitter,
	MessageCircle,
	RotateCcw,
	TrendingUp,
	AlertTriangle,
	Zap,
	Target,
	Brain,
} from 'lucide-react';
import { RoastAnalysis } from '../types/resume';
import { toast } from 'sonner';
interface ResultsPageProps {
	analysis: RoastAnalysis;
	onReset: () => void;
}

const ResultsPage = ({ analysis, onReset }: ResultsPageProps) => {
	const [showShareOptions, setShowShareOptions] = useState(false);

	console.log({ analysis });
	const shareUrl =
		typeof window !== 'undefined'
			? `${window.location.origin}/roast/${analysis.id}`
			: '';

	const copyToClipboard = () => {
		if (typeof navigator !== 'undefined' && navigator.clipboard) {
			navigator.clipboard
				.writeText(shareUrl)
				.then(() => {
					toast.success("Link copied! 🔥 Now go ruin someone's day 😈", {
						duration: 3000,
					});
				})
				.catch(err => {
					toast.error('Failed to copy link');
					console.error('Failed to copy:', err);
				});
		} else {
			toast.error('Clipboard access not available');
		}
	};

	const shareOnTwitter = () => {
		const text = `I just got roasted by AI and I'm ${analysis?.ai_risk}% replaceable 💀 Can you do worse?`;
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(
				text
			)}&url=${encodeURIComponent(shareUrl)}`,
			'_blank'
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 relative overflow-hidden">
			{/* Animated background particles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(15)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 md:w-2 md:h-2 bg-white/10 rounded-full"
						animate={{
							x: [0, Math.random() * 50 - 25],
							y: [0, Math.random() * 50 - 25],
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

			<div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-8 sm:mb-12"
				>
					<motion.h1
						className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
						animate={{
							backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
						}}
						transition={{
							backgroundPosition: { duration: 4, repeat: Infinity },
						}}
						style={{ backgroundSize: '200% 200%' }}
					>
						The AI Has Spoken.
					</motion.h1>
					<motion.p
						className="text-gray-300 text-base sm:text-lg md:text-xl font-semibold px-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
					>
						{analysis?.name
							? `${analysis.name}, prepare for impact...`
							: 'Brace yourself...'}
					</motion.p>
				</motion.div>

				{/* Main Content Container */}
				<div className="space-y-6 sm:space-y-8">
					{/* Replaceability Score Section */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.4 }}
						className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8"
					>
						<div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
							{/* Score Circle */}
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
								className="flex-shrink-0"
							>
								<div className="relative">
									<svg
										className="h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 transform -rotate-90"
										viewBox="0 0 100 100"
									>
										<circle
											cx="50"
											cy="50"
											r="40"
											stroke="currentColor"
											strokeWidth="8"
											fill="none"
											className="text-gray-700/50"
										/>
										<motion.circle
											cx="50"
											cy="50"
											r="40"
											stroke="currentColor"
											strokeWidth="8"
											fill="none"
											className="text-red-500"
											strokeLinecap="round"
											initial={{ strokeDasharray: '0 251.2' }}
											animate={{
												strokeDasharray: `${analysis.ai_risk * 2.512} 251.2`,
											}}
											transition={{ delay: 1, duration: 2.5, ease: 'easeOut' }}
											style={{
												filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))',
											}}
										/>
									</svg>
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="text-center">
											<motion.div
												className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-1"
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												transition={{ delay: 1.5 }}
											>
												{analysis.ai_risk}%
											</motion.div>
											<div className="text-gray-400 font-semibold text-xs sm:text-sm">
												AI Replaceable
											</div>
										</div>
									</div>
								</div>
							</motion.div>

							{/* Roast Text */}
							<motion.div
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 1.8 }}
								className="flex-1 w-full lg:w-auto"
							>
								<div className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-red-500/30">
									<motion.div
										className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 text-center lg:text-left"
										animate={{
											rotate: [0, -5, 5, -3, 0],
											scale: [1, 1.05, 1, 1.02, 1],
										}}
										transition={{ duration: 2, repeat: Infinity }}
									>
										🔥
									</motion.div>
									<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-300 mb-3 sm:mb-4 text-center lg:text-left">
										The Roast:
									</h3>
									<p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed text-center lg:text-left">
										{analysis.roast}
									</p>
								</div>
							</motion.div>
						</div>
					</motion.div>

					{/* Stats Grid */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 2.4 }}
						className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6"
					>
						{[
							{
								value: `${analysis.tech_score}/10`,
								label: 'Tech Score',
								icon: <Brain className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
								color: 'text-blue-400',
								bg: 'from-blue-500/20 to-cyan-500/20',
							},
							{
								value: `${analysis.gpt_overlap}/10`,
								label: 'GPT Overlap',
								icon: (
									<Target className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
								),
								color: 'text-yellow-400',
								bg: 'from-yellow-500/20 to-orange-500/20',
							},
							{
								value: `${analysis.buzzword_bingo}/10`,
								label: 'Buzzword Bingo',
								icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />,
								color: 'text-purple-400',
								bg: 'from-purple-500/20 to-pink-500/20',
							},
						].map((stat, index) => (
							<motion.div
								key={stat.label}
								className={`bg-gradient-to-br ${stat.bg} backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center hover:scale-105 transition-transform`}
								whileHover={{ y: -3 }}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 2.6 + index * 0.1 }}
							>
								<div
									className={`${stat.color} mb-1 sm:mb-2 flex justify-center`}
								>
									{stat.icon}
								</div>
								<div
									className={`text-lg sm:text-2xl md:text-3xl font-bold ${stat.color} mb-1`}
								>
									{stat.value}
								</div>
								<div className="text-gray-300 text-xs sm:text-sm font-semibold">
									{stat.label}
								</div>
							</motion.div>
						))}
					</motion.div>

					{/* Analysis Sections */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 2.8 }}
						className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8"
					>
						{/* What's Not Terrible */}
						<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
							<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 mb-4 sm:mb-6 flex items-center">
								<TrendingUp className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
								What's Not Terrible
							</h3>
							<ul className="space-y-2 sm:space-y-3 md:space-y-4">
								{analysis.whats_not_terrible.map((strength, index) => (
									<motion.li
										key={index}
										className="text-gray-300 flex items-start text-sm sm:text-base md:text-lg"
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 3 + index * 0.2 }}
									>
										<span className="text-green-400 mr-2 sm:mr-3 text-base sm:text-lg md:text-xl flex-shrink-0">
											✓
										</span>
										<span className="flex-1">{strength}</span>
									</motion.li>
								))}
							</ul>
						</div>

						{/* Red Flags */}
						<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8">
							<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-red-400 mb-4 sm:mb-6 flex items-center">
								<AlertTriangle className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
								Red Flags
							</h3>
							<ul className="space-y-2 sm:space-y-3 md:space-y-4">
								{analysis.red_flags.map((flag, index) => (
									<motion.li
										key={index}
										className="text-gray-300 flex items-start text-sm sm:text-base md:text-lg"
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: 3.2 + index * 0.2 }}
									>
										<span className="text-red-400 mr-2 sm:mr-3 text-base sm:text-lg md:text-xl flex-shrink-0">
											⚠
										</span>
										<span className="flex-1">{flag}</span>
									</motion.li>
								))}
							</ul>
						</div>
					</motion.div>

					{/* Share Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 3.4 }}
						className="text-center"
					>
						<motion.button
							onClick={() => setShowShareOptions(!showShareOptions)}
							className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-3 sm:py-4 px-6 sm:px-8 md:px-12 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg md:text-xl shadow-2xl group w-full sm:w-auto"
							whileHover={{
								scale: 1.02,
								boxShadow: '0 10px 30px rgba(147, 51, 234, 0.4)',
							}}
							whileTap={{ scale: 0.98 }}
						>
							<span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
								<Share2 className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
								<span className="hidden sm:inline">Now roast your friends</span>
								<span className="sm:hidden">Share the roast</span>
								<motion.span
									animate={{ rotate: [0, 15, -15, 0] }}
									transition={{ duration: 2, repeat: Infinity }}
								>
									🔥
								</motion.span>
							</span>
						</motion.button>
					</motion.div>

					{/* Share Options */}
					<AnimatePresence>
						{showShareOptions && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8"
							>
								<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
									Share the carnage
								</h3>
								<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
									<motion.button
										onClick={copyToClipboard}
										className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg sm:rounded-xl text-white font-semibold transition-all hover:scale-105 flex-1"
										whileHover={{ y: -2 }}
										whileTap={{ scale: 0.95 }}
									>
										<Copy className="h-4 w-4 sm:h-5 sm:w-5" />
										<span className="text-sm sm:text-base">Copy Link</span>
									</motion.button>
									<motion.button
										onClick={shareOnTwitter}
										className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg sm:rounded-xl text-white font-semibold transition-all hover:scale-105 flex-1"
										whileHover={{ y: -2 }}
										whileTap={{ scale: 0.95 }}
									>
										<Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
										<span className="text-sm sm:text-base">
											Tweet Your irreplacibality
										</span>
									</motion.button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>

					{/* Try Again Button */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 3.6 }}
						className="text-center"
					>
						<motion.button
							onClick={onReset}
							className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-2 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-gray-300 hover:text-white font-semibold transition-all hover:scale-105 mx-auto"
							whileHover={{ y: -2 }}
							whileTap={{ scale: 0.95 }}
						>
							<RotateCcw className="h-4 w-4 sm:h-5 sm:w-5" />
							<span className="text-sm sm:text-base">
								Try Another Resume (if you dare)
							</span>
						</motion.button>
					</motion.div>

					{/* Bottom meme text */}
					<motion.p
						className="text-center text-gray-500 text-xs sm:text-sm italic px-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 4 }}
					>
						*Results may cause existential crisis, career pivots, or sudden
						urges to learn actual skills
					</motion.p>
				</div>
			</div>
		</div>
	);
};

export default ResultsPage;
