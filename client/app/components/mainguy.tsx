'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Share2, Loader2, AlertCircle } from 'lucide-react';
import { analyzeResume } from '../lib/resume';
import ResultsPage from './results';
import { RoastAnalysis } from '../types/resume';

export const ResumeAnalyzer = () => {
	const [file, setFile] = useState<File | null>(null);
	const [analysis, setAnalysis] = useState<RoastAnalysis | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [dragActive, setDragActive] = useState(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.type === 'dragenter' || e.type === 'dragover') {
			setDragActive(true);
		} else if (e.type === 'dragleave') {
			setDragActive(false);
		}
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setDragActive(false);
		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
			handleFile(e.dataTransfer.files[0]);
		}
	};

	const handleFile = (file: File) => {
		if (file.type !== 'application/pdf') {
			setError('Only PDF files are accepted. We have standards.');
			return;
		}
		setFile(file);
		setError(null);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			handleFile(e.target.files[0]);
		}
	};

	const handleAnalyze = async () => {
		if (!file) return;

		setLoading(true);
		setError(null);
		setAnalysis(null);

		try {
			const result = await analyzeResume(file);
			setAnalysis(result);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to analyze resume');
		} finally {
			setLoading(false);
		}
	};

	const resetAnalysis = () => {
		setFile(null);
		setAnalysis(null);
		setError(null);
	};

	if (analysis) {
		return <ResultsPage analysis={analysis} onReset={resetAnalysis} />;
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
		>
			{/* Animated background effects */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent"></div>
			<div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

			{/* Floating particles */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{[...Array(25)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
						animate={{
							x: [0, Math.random() * 200 - 100],
							y: [0, Math.random() * 200 - 100],
							opacity: [0, 1, 0],
							scale: [0, 1, 0],
						}}
						transition={{
							duration: 4 + Math.random() * 3,
							repeat: Infinity,
							delay: Math.random() * 3,
						}}
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
					/>
				))}
			</div>

			{/* Navigation */}
			<nav className="relative z-10 p-6">
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					className="flex justify-between items-center max-w-6xl mx-auto"
				>
					<motion.div
						className="flex items-center space-x-2"
						animate={{
							textShadow: [
								'0 0 10px rgba(234, 179, 8, 0.5)',
								'0 0 20px rgba(234, 179, 8, 0.8)',
								'0 0 10px rgba(234, 179, 8, 0.5)',
							],
						}}
						transition={{ duration: 2, repeat: Infinity }}
					>
						<motion.div
							animate={{
								rotate: [0, -10, 10, -10, 0],
								scale: [1, 1.1, 1, 1.1, 1],
							}}
							transition={{ duration: 3, repeat: Infinity }}
						>
							⚡
						</motion.div>
						<span className="text-2xl font-black bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
							ResumeRoast
						</span>
					</motion.div>

					<motion.div
						className="hidden md:flex items-center space-x-6 text-sm text-gray-300"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: 0.3 }}
					>
						<motion.span
							className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
							whileHover={{
								scale: 1.05,
								backgroundColor: 'rgba(255,255,255,0.15)',
							}}
						>
							<Upload className="h-4 w-4" />
							<span>Upload</span>
						</motion.span>
						<motion.span
							className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/5"
							whileHover={{ scale: 1.05 }}
						>
							🧠
							<span>Analyze</span>
						</motion.span>
						<motion.span
							className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/5"
							whileHover={{ scale: 1.05 }}
						>
							<Share2 className="h-4 w-4" />
							<span>Share</span>
						</motion.span>
					</motion.div>
				</motion.div>
			</nav>

			{/* Hero Section */}
			<div className="relative z-10 max-w-4xl mx-auto px-6 pt-8 pb-12">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
					className="text-center mb-12"
				>
					<motion.h1
						className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
						animate={{
							backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
							textShadow: [
								'0 0 20px rgba(147, 51, 234, 0.3)',
								'0 0 40px rgba(147, 51, 234, 0.6)',
								'0 0 20px rgba(147, 51, 234, 0.3)',
							],
						}}
						transition={{
							backgroundPosition: { duration: 4, repeat: Infinity },
							textShadow: { duration: 2, repeat: Infinity },
						}}
						style={{ backgroundSize: '200% 200%' }}
					>
						Get Roasted.
					</motion.h1>

					<motion.p
						className="text-xl md:text-2xl text-gray-300 mb-4 font-semibold"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.5 }}
					>
						Upload your resume. Let AI judge you.
					</motion.p>

					<motion.p
						className="text-lg text-gray-400 max-w-2xl mx-auto"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.7 }}
					>
						Find out how replaceable you are by ChatGPT, then share the pain
						with your friends.
						<motion.span
							className="text-purple-400 font-bold"
							animate={{
								color: ['#a855f7', '#ec4899', '#f59e0b', '#a855f7'],
							}}
							transition={{ duration: 3, repeat: Infinity }}
						>
							{' '}
							Because misery loves company.
						</motion.span>
					</motion.p>
				</motion.div>

				{/* Enhanced Upload Component */}
				{!loading ? (
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="max-w-lg mx-auto mb-16"
					>
						<motion.div
							className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-500 group ${
								dragActive
									? 'border-purple-400 bg-purple-500/20 shadow-2xl shadow-purple-500/25'
									: 'border-gray-600 hover:border-purple-500 bg-white/5 backdrop-blur-xl hover:bg-white/10'
							}`}
							onDragEnter={handleDrag}
							onDragLeave={handleDrag}
							onDragOver={handleDrag}
							onDrop={handleDrop}
							whileHover={{
								scale: 1.02,
								boxShadow: '0 25px 50px rgba(147, 51, 234, 0.25)',
							}}
							whileTap={{ scale: 0.98 }}
						>
							{/* Animated border effect */}
							<motion.div
								className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
								animate={{
									rotate: [0, 360],
								}}
								transition={{
									duration: 8,
									repeat: Infinity,
									ease: 'linear',
								}}
							/>

							<motion.div
								animate={{
									y: [0, -10, 0],
									rotate: [0, 5, -5, 0],
								}}
								transition={{ duration: 2, repeat: Infinity }}
								className="text-6xl mb-6"
							>
								{file ? '📑' : '📄'}
							</motion.div>

							{file ? (
								<>
									<motion.p
										className="text-white font-black text-xl mb-3"
										initial={{ scale: 0.9 }}
										animate={{ scale: 1 }}
									>
										{file.name}
									</motion.p>
									<p className="text-gray-400 text-base mb-6">
										Ready for brutal honesty
									</p>
								</>
							) : (
								<>
									<motion.p
										className="text-white font-black text-xl mb-3"
										animate={{
											scale: [1, 1.05, 1],
										}}
										transition={{ duration: 2, repeat: Infinity }}
									>
										Drop your resume here
									</motion.p>
									<p className="text-gray-400 text-base mb-6">
										or click to browse{' '}
										<span className="text-purple-400 font-semibold">
											(PDF only — we have standards)
										</span>
									</p>
								</>
							)}

							{error && (
								<motion.div
									className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-xl flex items-center justify-center"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
								>
									<AlertCircle className="w-5 h-5 text-red-400 mr-2" />
									<span className="text-red-200">{error}</span>
								</motion.div>
							)}

							<motion.button
								onClick={
									file ? handleAnalyze : () => fileInputRef.current?.click()
								}
								disabled={loading}
								className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300 mt-6 w-full"
								whileHover={{
									scale: 1.05,
									boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)',
								}}
								whileTap={{ scale: 0.95 }}
							>
								{loading ? (
									<>
										<Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
										Analyzing...
									</>
								) : file ? (
									'🔥 Roast My Resume'
								) : (
									'💥 Choose File & Get Wrecked'
								)}
							</motion.button>

							<input
								ref={fileInputRef}
								type="file"
								accept=".pdf"
								onChange={handleFileChange}
								className="hidden"
							/>
						</motion.div>

						<motion.div
							className="mt-6 text-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1 }}
						>
							<p className="text-gray-400 text-sm font-medium">
								We'll roast your resume harder than your last performance review
								🔥
							</p>
						</motion.div>
					</motion.div>
				) : (
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
				)}

				{/* Enhanced Features with animations */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6 }}
					className="grid md:grid-cols-3 gap-8 mb-16"
				>
					{[
						{
							icon: '📤',
							title: 'Upload & Pray',
							desc: 'Drop your resume and prepare for digital destruction',
							color: 'from-purple-500/20 to-blue-500/20',
							border: 'border-purple-500/30',
						},
						{
							icon: '🤖',
							title: 'AI Annihilation',
							desc: 'Our AI analyzes and serves you reality with premium memes',
							color: 'from-yellow-500/20 to-orange-500/20',
							border: 'border-yellow-500/30',
						},
						{
							icon: '💀',
							title: 'Share the Carnage',
							desc: 'Send to friends and watch their dreams crumble too',
							color: 'from-pink-500/20 to-red-500/20',
							border: 'border-pink-500/30',
						},
					].map((feature, index) => (
						<motion.div
							key={index}
							className={`relative text-center p-8 rounded-3xl bg-gradient-to-br ${feature.color} backdrop-blur-xl border ${feature.border} group overflow-hidden`}
							initial={{ opacity: 0, y: 20, scale: 0.9 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ delay: 0.8 + index * 0.2 }}
							whileHover={{
								scale: 1.05,
								rotateY: 5,
								boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
							}}
						>
							<motion.div
								className="text-5xl mb-4 relative z-10"
								animate={{
									rotate: [0, -10, 10, 0],
									scale: [1, 1.2, 1],
								}}
								transition={{
									duration: 3,
									repeat: Infinity,
									delay: index * 0.5,
								}}
							>
								{feature.icon}
							</motion.div>
							<h3 className="text-xl font-black text-white mb-3 relative z-10">
								{feature.title}
							</h3>
							<p className="text-gray-300 relative z-10 font-medium">
								{feature.desc}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.div>
	);
};
