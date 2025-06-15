import React, { useState, useEffect } from 'react';
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


interface ResultsPageProps {
	analysis: RoastAnalysis;
	onReset: () => void;
}
const ResultsPage = ({ analysis, onReset }: ResultsPageProps) => {
	// const [analysis, setResult] = useState<RoastAnalysis | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showShareOptions, setShowShareOptions] = useState(false);

	const shareUrl = `${window.location.origin}/roast/abc123def456`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(shareUrl);
		alert("Link copied! Now go ruin someone's day 😈");
	};

	const shareOnTwitter = () => {
		const text = `I just got roasted by AI and I'm ${analysis?.ai_risk_percentage}% replaceable 💀 Can you do worse?`;
		window.open(
			`https://twitter.com/intent/tweet?text=${encodeURIComponent(
				text
			)}&url=${encodeURIComponent(shareUrl)}`,
			'_blank'
		);
	};

	if (!isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 flex items-center justify-center relative overflow-hidden">
				{/* Animated background particles */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					{[...Array(30)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-1 h-1 bg-white/20 rounded-full"
							animate={{
								x: [0, Math.random() * 200 - 100],
								y: [0, Math.random() * 200 - 100],
								opacity: [0, 1, 0],
							}}
							transition={{
								duration: 4 + Math.random() * 2,
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

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center space-y-8 relative z-10"
				>
					<motion.div
						animate={{
							rotate: 360,
							scale: [1, 1.2, 1],
						}}
						transition={{
							rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
							scale: { duration: 2, repeat: Infinity },
						}}
						className="text-8xl mb-8"
					>
						🤖
					</motion.div>

					<div className="space-y-4">
						<motion.h2
							className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
							animate={{
								backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
							}}
							transition={{ duration: 3, repeat: Infinity }}
							style={{ backgroundSize: '200% 200%' }}
						>
							Analyzing your career choices...
						</motion.h2>
						<motion.p
							className="text-gray-300 text-xl"
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{ duration: 1.5, repeat: Infinity }}
						>
							This might hurt more than your last performance review
						</motion.p>
					</div>

					{/* Enhanced loading bar */}
					<motion.div className="w-80 h-3 bg-gray-800 rounded-full mx-auto overflow-hidden border border-purple-500/30">
						<motion.div
							className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"
							initial={{ width: 0 }}
							animate={{ width: '100%' }}
							transition={{ duration: 3, ease: 'easeInOut' }}
						/>
					</motion.div>
				</motion.div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 relative overflow-hidden">
			{/* Animated background particles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
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
							duration: 4 + Math.random() * 2,
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

			<div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
				{/* Header with glitch effect */}
				<motion.div
					initial={{ opacity: 0, y: -30 }}
					animate={{ opacity: 1, y: 0 }}
					className="text-center mb-16"
				>
					<motion.h1
						className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
						animate={{
							backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
							textShadow: [
								'0 0 20px rgba(147, 51, 234, 0.5)',
								'0 0 40px rgba(147, 51, 234, 0.8)',
								'0 0 20px rgba(147, 51, 234, 0.5)',
							],
						}}
						transition={{
							backgroundPosition: { duration: 4, repeat: Infinity },
							textShadow: { duration: 2, repeat: Infinity },
						}}
						style={{ backgroundSize: '200% 200%' }}
					>
						The AI Has Spoken.
					</motion.h1>
					<motion.p
						className="text-gray-300 text-xl md:text-2xl font-semibold"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
					>
						{analysis?.name
							? `${analysis.name}, prepare for impact...`
							: 'Brace yourself...'}
					</motion.p>
				</motion.div>

				{/* Main Roast Section */}
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ delay: 0.4 }}
					className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl"
				>
					{/* Replaceability Score with enhanced animation */}
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
						className="text-center mb-12"
					>
						<div className="relative inline-block mb-6">
							<svg
								className="h-48 w-48 transform -rotate-90"
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
										strokeDasharray: `${
											analysis!.ai_risk_percentage * 2.512
										} 251.2`,
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
										className="text-5xl font-black text-white mb-2"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 1.5 }}
									>
										{analysis!.ai_risk_percentage}%
									</motion.div>
									<div className="text-gray-400 font-semibold">
										AI Replaceable
									</div>
								</div>
							</div>
						</div>

						{/* Epic Roast Section */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1.8 }}
							className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl p-8 border border-red-500/30 mb-8"
						>
							<motion.div
								className="text-4xl mb-4"
								animate={{
									rotate: [0, -10, 10, -5, 0],
									scale: [1, 1.1, 1, 1.05, 1],
								}}
								transition={{ duration: 2, repeat: Infinity }}
							>
								🔥
							</motion.div>
							<h3 className="text-2xl font-bold text-orange-300 mb-4">
								The Roast:
							</h3>
							<p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
								{analysis!.roast}
							</p>
						</motion.div>
					</motion.div>
				</motion.div>

				{/* Stats Grid - 3 columns without AI Risk */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 2.4 }}
					className="grid grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto"
				>
					{[
						{
							value: `${analysis!.tech_score}/10`,
							label: 'Tech Score',
							icon: <Brain className="h-6 w-6" />,
							color: 'text-blue-400',
							bg: 'from-blue-500/20 to-cyan-500/20',
						},
						{
							value: `${analysis!.gpt_overlap}/10`,
							label: 'GPT Overlap',
							icon: <Target className="h-6 w-6" />,
							color: 'text-yellow-400',
							bg: 'from-yellow-500/20 to-orange-500/20',
						},
						{
							value: `${analysis!.buzzword_bingo}/10`,
							label: 'Buzzword Bingo',
							icon: <Zap className="h-6 w-6" />,
							color: 'text-purple-400',
							bg: 'from-purple-500/20 to-pink-500/20',
						},
					].map((stat, index) => (
						<motion.div
							key={stat.label}
							className={`bg-gradient-to-br ${stat.bg} backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:scale-105 transition-transform`}
							whileHover={{ y: -5 }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 2.6 + index * 0.1 }}
						>
							<div className={`${stat.color} mb-2 flex justify-center`}>
								{stat.icon}
							</div>
							<div className={`text-3xl font-bold ${stat.color} mb-1`}>
								{stat.value}
							</div>
							<div className="text-gray-300 text-sm font-semibold">
								{stat.label}
							</div>
						</motion.div>
					))}
				</motion.div>

				{/* Analysis Sections - Side by Side */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 2.8 }}
					className="grid md:grid-cols-2 gap-8 mb-12"
				>
					{/* What's Not Terrible */}
					<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
						<h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
							<TrendingUp className="mr-3 h-6 w-6" />
							What's Not Terrible
						</h3>
						<ul className="space-y-4">
							{analysis!.whats_not_terrible.map((strength, index) => (
								<motion.li
									key={index}
									className="text-gray-300 flex items-start text-lg"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 3 + index * 0.2 }}
								>
									<span className="text-green-400 mr-3 text-xl">✓</span>
									{strength}
								</motion.li>
							))}
						</ul>
					</div>

					{/* Red Flags */}
					<div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
						<h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center">
							<AlertTriangle className="mr-3 h-6 w-6" />
							Red Flags
						</h3>
						<ul className="space-y-4">
							{analysis!.red_flags.map((flag, index) => (
								<motion.li
									key={index}
									className="text-gray-300 flex items-start text-lg"
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 3.2 + index * 0.2 }}
								>
									<span className="text-red-400 mr-3 text-xl">⚠</span>
									{flag}
								</motion.li>
							))}
						</ul>
					</div>
				</motion.div>

				{/* Share Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 3.4 }}
					className="text-center mb-8"
				>
					<motion.button
						onClick={() => setShowShareOptions(!showShareOptions)}
						className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-4 px-12 rounded-2xl font-black text-xl shadow-2xl group"
						whileHover={{
							scale: 1.05,
							boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)',
						}}
						whileTap={{ scale: 0.95 }}
					>
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
							<Share2 className="h-6 w-6" />
							Now roast your friends
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
							className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-8"
						>
							<h3 className="text-2xl font-bold text-white mb-6 text-center">
								Share the carnage
							</h3>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<motion.button
									onClick={copyToClipboard}
									className="flex items-center justify-center gap-3 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all hover:scale-105"
									whileHover={{ y: -2 }}
									whileTap={{ scale: 0.95 }}
								>
									<Copy className="h-5 w-5" />
									Copy Link
								</motion.button>
								<motion.button
									onClick={shareOnTwitter}
									className="flex items-center justify-center gap-3 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl text-white font-semibold transition-all hover:scale-105"
									whileHover={{ y: -2 }}
									whileTap={{ scale: 0.95 }}
								>
									<Twitter className="h-5 w-5" />
									Tweet This L
								</motion.button>
								<motion.button
									className="flex items-center justify-center gap-3 px-6 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-white font-semibold transition-all hover:scale-105"
									whileHover={{ y: -2 }}
									whileTap={{ scale: 0.95 }}
								>
									<MessageCircle className="h-5 w-5" />
									Text Someone
								</motion.button>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Try Again - Centered */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 3.6 }}
					className="text-center"
				>
					<motion.button
						className="flex items-center justify-center gap-3 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:text-white font-semibold transition-all hover:scale-105 mx-auto"
						whileHover={{ y: -2 }}
						whileTap={{ scale: 0.95 }}
					>
						<RotateCcw className="h-5 w-5" />
						Try Another Resume (if you dare)
					</motion.button>
				</motion.div>

				{/* Bottom meme text */}
				<motion.p
					className="text-center text-gray-500 mt-8 text-sm italic"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 4 }}
				>
					*Results may cause existential crisis, career pivots, or sudden urges
					to learn actual skills
				</motion.p>
			</div>
		</div>
	);
};

export default ResultsPage;
