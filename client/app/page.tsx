// 'use client';
// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Upload, Share2 } from 'lucide-react';
// import ResultsPage from './components/results';
'use client';
import { ResumeAnalyzer } from './components/mainguy';

// interface AnalysisResult {
// 	score: number;
// 	meme: string;
// 	techScore: number;
// 	gptOverlap: number;
// 	savageInsight: string;
// 	improvements: string[];
// }

// const Home: React.FC = () => {

// 	const [uploadedFile, setUploadedFile] = useState<File | null>(null);
// 	const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
// 	const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
// 		null
// 	);
// 	const [dragActive, setDragActive] = useState<boolean>(false);
// 	const [shareUrl, setShareUrl] = useState<string>('');
// 	const fileInputRef = useRef<HTMLInputElement>(null);

// 	// Mock analysis results - in production, this would call your Go backend
// 	const mockAnalyze = (): AnalysisResult => {
// 		const roasts: AnalysisResult[] = [
// 			{
// 				score: 78,
// 				meme: "You're 78% replaceable by ChatGPT... and maybe your manager agrees 👀",
// 				techScore: 6.2,
// 				gptOverlap: 89,
// 				savageInsight:
// 					"Your 'proficient in Excel' really screams 'I can make pie charts' energy",
// 				improvements: [
// 					'Learn to code (for real this time)',
// 					"Stop calling yourself a 'ninja'",
// 					'Maybe try a different career?',
// 				],
// 			},
// 			{
// 				score: 45,
// 				meme: "Congrats! You're only 45% replaceable 🎉 ...the other 55% is just pure chaos",
// 				techScore: 8.7,
// 				gptOverlap: 34,
// 				savageInsight:
// 					'Your GitHub shows 3 commits this year. Two were README typos.',
// 				improvements: [
// 					'Ship something. Anything.',
// 					"Stop overthinking your 'perfect' portfolio",
// 					'Maybe talk to users?',
// 				],
// 			},
// 			{
// 				score: 92,
// 				meme: '92% replaceable? Even the intern could do your job with less coffee ☕',
// 				techScore: 3.1,
// 				gptOverlap: 95,
// 				savageInsight: '5 years experience, 1 year repeated 5 times',
// 				improvements: [
// 					'Learn literally anything new',
// 					"Stop putting 'team player' on everything",
// 					'Consider management?',
// 				],
// 			},
// 		];

// 		return roasts[Math.floor(Math.random() * roasts.length)];
// 	};

// 	const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		if (e.type === 'dragenter' || e.type === 'dragover') {
// 			setDragActive(true);
// 		} else if (e.type === 'dragleave') {
// 			setDragActive(false);
// 		}
// 	};

// 	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
// 		e.preventDefault();
// 		e.stopPropagation();
// 		setDragActive(false);

// 		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// 			handleFile(e.dataTransfer.files[0]);
// 		}
// 	};

// 	const handleFile = (file: File) => {
// 		if (file.type === 'application/pdf') {
// 			setUploadedFile(file);
// 			analyzeResume(file);
// 		} else {
// 			alert('Only PDF files allowed. We have standards here.');
// 		}
// 	};

// 	const analyzeResume = async (file: File) => {
// 		setIsAnalyzing(true);
// 		setCurrentPage('analyzing');

// 		// Simulate AI analysis
// 		setTimeout(() => {
// 			const result = mockAnalyze();
// 			setAnalysisResult(result);
// 			setIsAnalyzing(false);
// 			setCurrentPage('reaction');

// 			// Generate mock share URL
// 			const mockId = Math.random().toString(36).substring(7);
// 			setShareUrl(`https://resumeroaster.dev/roast/${mockId}`);
// 		}, 3000);
// 	};

// 	const shareWithFriend = () => {
// 		navigator.clipboard.writeText(
// 			shareUrl + '\n\n"Just got roasted by AI. Your turn 🔥"'
// 		);
// 		alert("Link copied! Now go destroy your friend's ego 😈");
// 	};

// const UploadPage: React.FC = () => (
// 	<motion.div
// 		initial={{ opacity: 0 }}
// 		animate={{ opacity: 1 }}
// 		className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
// 	>
// 		{/* Animated background effects */}
// 		<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent"></div>
// 		<div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

// 		{/* Floating particles */}
// 		<div className="absolute inset-0 overflow-hidden pointer-events-none">
// 			{[...Array(25)].map((_, i) => (
// 				<motion.div
// 					key={i}
// 					className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
// 					animate={{
// 						x: [0, Math.random() * 200 - 100],
// 						y: [0, Math.random() * 200 - 100],
// 						opacity: [0, 1, 0],
// 						scale: [0, 1, 0],
// 					}}
// 					transition={{
// 						duration: 4 + Math.random() * 3,
// 						repeat: Infinity,
// 						delay: Math.random() * 3,
// 					}}
// 					style={{
// 						left: `${Math.random() * 100}%`,
// 						top: `${Math.random() * 100}%`,
// 					}}
// 				/>
// 			))}
// 		</div>

// 		{/* Navigation */}
// 		<nav className="relative z-10 p-6">
// 			<motion.div
// 				initial={{ opacity: 0, y: -20 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				className="flex justify-between items-center max-w-6xl mx-auto"
// 			>
// 				<motion.div
// 					className="flex items-center space-x-2"
// 					animate={{
// 						textShadow: [
// 							'0 0 10px rgba(234, 179, 8, 0.5)',
// 							'0 0 20px rgba(234, 179, 8, 0.8)',
// 							'0 0 10px rgba(234, 179, 8, 0.5)',
// 						],
// 					}}
// 					transition={{ duration: 2, repeat: Infinity }}
// 				>
// 					<motion.div
// 						animate={{
// 							rotate: [0, -10, 10, -10, 0],
// 							scale: [1, 1.1, 1, 1.1, 1],
// 						}}
// 						transition={{ duration: 3, repeat: Infinity }}
// 					>
// 						⚡
// 					</motion.div>
// 					<span className="text-2xl font-black bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent">
// 						ResumeRoast
// 					</span>
// 				</motion.div>

// 				<motion.div
// 					className="hidden md:flex items-center space-x-6 text-sm text-gray-300"
// 					initial={{ opacity: 0, x: 20 }}
// 					animate={{ opacity: 1, x: 0 }}
// 					transition={{ delay: 0.3 }}
// 				>
// 					<motion.span
// 						className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
// 						whileHover={{
// 							scale: 1.05,
// 							backgroundColor: 'rgba(255,255,255,0.15)',
// 						}}
// 					>
// 						<Upload className="h-4 w-4" />
// 						<span>Upload</span>
// 					</motion.span>
// 					<motion.span
// 						className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/5"
// 						whileHover={{ scale: 1.05 }}
// 					>
// 						🧠
// 						<span>Analyze</span>
// 					</motion.span>
// 					<motion.span
// 						className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/5"
// 						whileHover={{ scale: 1.05 }}
// 					>
// 						<Share2 className="h-4 w-4" />
// 						<span>Share</span>
// 					</motion.span>
// 				</motion.div>
// 			</motion.div>
// 		</nav>

// 		{/* Hero Section */}
// 		<div className="relative z-10 max-w-4xl mx-auto px-6 pt-8 pb-12">
// 			<motion.div
// 				initial={{ opacity: 0, y: 30 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ delay: 0.2 }}
// 				className="text-center mb-12"
// 			>
// 				<motion.h1
// 					className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
// 					animate={{
// 						backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
// 						textShadow: [
// 							'0 0 20px rgba(147, 51, 234, 0.3)',
// 							'0 0 40px rgba(147, 51, 234, 0.6)',
// 							'0 0 20px rgba(147, 51, 234, 0.3)',
// 						],
// 					}}
// 					transition={{
// 						backgroundPosition: { duration: 4, repeat: Infinity },
// 						textShadow: { duration: 2, repeat: Infinity },
// 					}}
// 					style={{ backgroundSize: '200% 200%' }}
// 				>
// 					Get Roasted.
// 				</motion.h1>

// 				<motion.p
// 					className="text-xl md:text-2xl text-gray-300 mb-4 font-semibold"
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}
// 					transition={{ delay: 0.5 }}
// 				>
// 					Upload your resume. Let AI judge you.
// 				</motion.p>

// 				<motion.p
// 					className="text-lg text-gray-400 max-w-2xl mx-auto"
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}
// 					transition={{ delay: 0.7 }}
// 				>
// 					Find out how replaceable you are by ChatGPT, then share the pain
// 					with your friends.
// 					<motion.span
// 						className="text-purple-400 font-bold"
// 						animate={{
// 							color: ['#a855f7', '#ec4899', '#f59e0b', '#a855f7'],
// 						}}
// 						transition={{ duration: 3, repeat: Infinity }}
// 					>
// 						{' '}
// 						Because misery loves company.
// 					</motion.span>
// 				</motion.p>
// 			</motion.div>

// 			{/* Enhanced Upload Component */}
// 			<motion.div
// 				initial={{ opacity: 0, y: 30 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ delay: 0.4 }}
// 				className="max-w-lg mx-auto mb-16"
// 			>
// 				<motion.div
// 					className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-500 group ${
// 						dragActive
// 							? 'border-purple-400 bg-purple-500/20 shadow-2xl shadow-purple-500/25'
// 							: 'border-gray-600 hover:border-purple-500 bg-white/5 backdrop-blur-xl hover:bg-white/10'
// 					}`}
// 					onDragEnter={handleDrag}
// 					onDragLeave={handleDrag}
// 					onDragOver={handleDrag}
// 					onDrop={handleDrop}
// 					whileHover={{
// 						scale: 1.02,
// 						boxShadow: '0 25px 50px rgba(147, 51, 234, 0.25)',
// 					}}
// 					whileTap={{ scale: 0.98 }}
// 				>
// 					{/* Animated border effect */}
// 					<motion.div
// 						className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"
// 						animate={{
// 							rotate: [0, 360],
// 						}}
// 						transition={{
// 							duration: 8,
// 							repeat: Infinity,
// 							ease: 'linear',
// 						}}
// 					/>

// 					<motion.div
// 						animate={{
// 							y: [0, -10, 0],
// 							rotate: [0, 5, -5, 0],
// 						}}
// 						transition={{ duration: 2, repeat: Infinity }}
// 						className="text-6xl mb-6"
// 					>
// 						📄
// 					</motion.div>

// 					<motion.p
// 						className="text-white font-black text-xl mb-3"
// 						animate={{
// 							scale: [1, 1.05, 1],
// 						}}
// 						transition={{ duration: 2, repeat: Infinity }}
// 					>
// 						Drop your resume here
// 					</motion.p>
// 					<p className="text-gray-400 text-base mb-6">
// 						or click to browse{' '}
// 						<span className="text-purple-400 font-semibold">
// 							(PDF only — we have standards)
// 						</span>
// 					</p>

// 					<motion.button
// 						onClick={() => fileInputRef.current?.click()}
// 						className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl group-hover:shadow-purple-500/50 transition-all duration-300"
// 						whileHover={{
// 							scale: 1.1,
// 							boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)',
// 						}}
// 						whileTap={{ scale: 0.95 }}
// 					>
// 						{/* Animated background */}
// 						<motion.div
// 							className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
// 							animate={{
// 								x: ['-100%', '100%'],
// 							}}
// 							transition={{
// 								duration: 1.5,
// 								repeat: Infinity,
// 								ease: 'easeInOut',
// 							}}
// 						/>
// 						<span className="relative z-10 flex items-center gap-2">
// 							💥 Choose File & Get Wrecked
// 						</span>
// 					</motion.button>

// 					<input
// 						ref={fileInputRef}
// 						type="file"
// 						accept=".pdf"
// 						onChange={e =>
// 							e.target.files?.[0] && handleFile(e.target.files[0])
// 						}
// 						className="hidden"
// 					/>
// 				</motion.div>

// 				<motion.div
// 					className="mt-6 text-center"
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}
// 					transition={{ delay: 1 }}
// 				>
// 					<p className="text-gray-400 text-sm font-medium">
// 						We'll roast your resume harder than your last performance review
// 						🔥
// 					</p>
// 				</motion.div>
// 			</motion.div>

// 			{/* Enhanced Features with insane animations */}
// 			<motion.div
// 				initial={{ opacity: 0, y: 30 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ delay: 0.6 }}
// 				className="grid md:grid-cols-3 gap-8 mb-16"
// 			>
// 				{[
// 					{
// 						icon: '📤',
// 						title: 'Upload & Pray',
// 						desc: 'Drop your resume and prepare for digital destruction',
// 						color: 'from-purple-500/20 to-blue-500/20',
// 						border: 'border-purple-500/30',
// 					},
// 					{
// 						icon: '🤖',
// 						title: 'AI Annihilation',
// 						desc: 'Our AI analyzes and serves you reality with premium memes',
// 						color: 'from-yellow-500/20 to-orange-500/20',
// 						border: 'border-yellow-500/30',
// 					},
// 					{
// 						icon: '💀',
// 						title: 'Share the Carnage',
// 						desc: 'Send to friends and watch their dreams crumble too',
// 						color: 'from-pink-500/20 to-red-500/20',
// 						border: 'border-pink-500/30',
// 					},
// 				].map((feature, index) => (
// 					<motion.div
// 						key={index}
// 						className={`relative text-center p-8 rounded-3xl bg-gradient-to-br ${feature.color} backdrop-blur-xl border ${feature.border} group overflow-hidden`}
// 						initial={{ opacity: 0, y: 20, scale: 0.9 }}
// 						animate={{ opacity: 1, y: 0, scale: 1 }}
// 						transition={{ delay: 0.8 + index * 0.2 }}
// 						whileHover={{
// 							scale: 1.05,
// 							rotateY: 5,
// 							boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
// 						}}
// 					>
// 						{/* Animated background glow */}
// 						<motion.div
// 							className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
// 							animate={{
// 								rotate: [0, 360],
// 							}}
// 							transition={{
// 								duration: 10,
// 								repeat: Infinity,
// 								ease: 'linear',
// 							}}
// 						/>

// 						<motion.div
// 							className="text-5xl mb-4 relative z-10"
// 							animate={{
// 								rotate: [0, -10, 10, 0],
// 								scale: [1, 1.2, 1],
// 							}}
// 							transition={{
// 								duration: 3,
// 								repeat: Infinity,
// 								delay: index * 0.5,
// 							}}
// 						>
// 							{feature.icon}
// 						</motion.div>
// 						<h3 className="text-xl font-black text-white mb-3 relative z-10">
// 							{feature.title}
// 						</h3>
// 						<p className="text-gray-300 relative z-10 font-medium">
// 							{feature.desc}
// 						</p>
// 					</motion.div>
// 				))}
// 			</motion.div>

// 			{/* CTAs Section */}
// 			<motion.div
// 				initial={{ opacity: 0, y: 30 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ delay: 1.2 }}
// 				className="text-center space-y-6"
// 			>
// 				<motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
// 					<motion.button
// 						className="relative overflow-hidden bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-4 rounded-2xl font-black text-lg shadow-2xl group flex-1 sm:flex-none"
// 						whileHover={{
// 							scale: 1.05,
// 							boxShadow: '0 20px 40px rgba(245, 158, 11, 0.4)',
// 						}}
// 						whileTap={{ scale: 0.95 }}
// 					>
// 						<motion.div
// 							className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
// 							animate={{
// 								x: ['-100%', '100%'],
// 							}}
// 							transition={{
// 								duration: 1.5,
// 								repeat: Infinity,
// 								ease: 'easeInOut',
// 							}}
// 						/>
// 						<span className="relative z-10 flex items-center justify-center gap-2">
// 							💡 Suggest Features
// 						</span>
// 					</motion.button>

// 					<motion.button
// 						className="relative overflow-hidden bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-2xl group flex-1 sm:flex-none"
// 						whileHover={{
// 							scale: 1.05,
// 							boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)',
// 						}}
// 						whileTap={{ scale: 0.95 }}
// 					>
// 						<motion.div
// 							className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
// 							animate={{
// 								x: ['-100%', '100%'],
// 							}}
// 							transition={{
// 								duration: 1.5,
// 								repeat: Infinity,
// 								ease: 'easeInOut',
// 								delay: 0.5,
// 							}}
// 						/>
// 						<span className="relative z-10 flex items-center justify-center gap-2">
// 							🤝 Contribute Code
// 						</span>
// 					</motion.button>
// 				</motion.div>

// 				<motion.p
// 					className="text-gray-400 text-sm italic max-w-md mx-auto"
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}
// 					transition={{ delay: 1.5 }}
// 				>
// 					*Help us make this roasting experience even more devastating
// 				</motion.p>
// 			</motion.div>
// 		</div>

// 		{/* Enhanced Footer */}
// 		<motion.footer
// 			className="relative z-10 text-center py-8 text-gray-500 text-sm"
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			transition={{ delay: 1.8 }}
// 		>
// 			<motion.p
// 				animate={{
// 					textShadow: [
// 						'0 0 5px rgba(147, 51, 234, 0.3)',
// 						'0 0 10px rgba(147, 51, 234, 0.5)',
// 						'0 0 5px rgba(147, 51, 234, 0.3)',
// 					],
// 				}}
// 				transition={{ duration: 3, repeat: Infinity }}
// 			>
// 				Made with 💀 in LA. Prepare to be humbled.
// 			</motion.p>
// 		</motion.footer>
// 	</motion.div>
// );

// 	const AnalyzingPage: React.FC = () => (
// 		<motion.div
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center p-4"
// 		>
// 			<div className="text-center">
// 				<motion.div
// 					animate={{ rotate: 360 }}
// 					transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
// 					className="text-6xl mb-6"
// 				>
// 					🤖
// 				</motion.div>

// 				<motion.h2
// 					initial={{ opacity: 0, y: 20 }}
// 					animate={{ opacity: 1, y: 0 }}
// 					className="text-3xl font-bold text-white mb-4"
// 				>
// 					Analyzing your career choices...
// 				</motion.h2>

// 				<motion.div
// 					initial={{ width: 0 }}
// 					animate={{ width: '100%' }}
// 					transition={{ duration: 3 }}
// 					className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden"
// 				>
// 					<div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
// 				</motion.div>

// 				<motion.p
// 					animate={{ opacity: [0.5, 1, 0.5] }}
// 					transition={{ duration: 1.5, repeat: Infinity }}
// 					className="text-gray-300"
// 				>
// 					This might hurt a little...
// 				</motion.p>
// 			</div>
// 		</motion.div>
// 	);

// const ReactionPage: React.FC = () => {
// 	const [selectedReaction, setSelectedReaction] = useState<string | null>(
// 		null
// 	);
// 	const [showConfetti, setShowConfetti] = useState(false);

// 	const handleReaction = (emoji: string) => {
// 		setSelectedReaction(emoji);
// 		setShowConfetti(true);
// 		setTimeout(() => setShowConfetti(false), 2000);
// 	};

// 	return (
// 		<motion.div
// 			initial={{ opacity: 0, scale: 0.95 }}
// 			animate={{ opacity: 1, scale: 1 }}
// 			className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 relative overflow-hidden"
// 		>
// 			{/* Animated background particles */}
// 			<div className="absolute inset-0 overflow-hidden pointer-events-none">
// 				{[...Array(20)].map((_, i) => (
// 					<motion.div
// 						key={i}
// 						className="absolute w-2 h-2 bg-white/10 rounded-full"
// 						animate={{
// 							x: [0, Math.random() * 100 - 50],
// 							y: [0, Math.random() * 100 - 50],
// 							opacity: [0, 1, 0],
// 						}}
// 						transition={{
// 							duration: 3 + Math.random() * 2,
// 							repeat: Infinity,
// 							delay: Math.random() * 2,
// 						}}
// 						style={{
// 							left: `${Math.random() * 100}%`,
// 							top: `${Math.random() * 100}%`,
// 						}}
// 					/>
// 				))}
// 			</div>

// 			{/* Confetti explosion */}
// 			<AnimatePresence>
// 				{showConfetti && (
// 					<div className="absolute inset-0 pointer-events-none">
// 						{[...Array(30)].map((_, i) => (
// 							<motion.div
// 								key={i}
// 								className="absolute text-2xl"
// 								initial={{
// 									x: '50vw',
// 									y: '50vh',
// 									scale: 0,
// 									rotate: 0,
// 								}}
// 								animate={{
// 									x: Math.random() * window.innerWidth,
// 									y: Math.random() * window.innerHeight,
// 									scale: [0, 1, 0],
// 									rotate: 360,
// 								}}
// 								exit={{ opacity: 0 }}
// 								transition={{
// 									duration: 2,
// 									ease: 'easeOut',
// 								}}
// 							>
// 								{
// 									['🎉', '✨', '💥', '🔥', '💀'][
// 										Math.floor(Math.random() * 5)
// 									]
// 								}
// 							</motion.div>
// 						))}
// 					</div>
// 				)}
// 			</AnimatePresence>

// 			<div className="relative z-10 min-h-screen flex items-center justify-center p-4">
// 				<motion.div
// 					className="max-w-2xl w-full"
// 					initial={{ y: 50, opacity: 0 }}
// 					animate={{ y: 0, opacity: 1 }}
// 					transition={{ delay: 0.2 }}
// 				>
// 					{/* Header with glitch effect */}
// 					<motion.div
// 						className="text-center mb-12"
// 						animate={{
// 							textShadow: [
// 								'0 0 10px rgba(147, 51, 234, 0.5)',
// 								'0 0 20px rgba(147, 51, 234, 0.8)',
// 								'0 0 10px rgba(147, 51, 234, 0.5)',
// 							],
// 						}}
// 						transition={{ duration: 2, repeat: Infinity }}
// 					>
// 						<motion.h1
// 							className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4"
// 							animate={{
// 								backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
// 							}}
// 							transition={{ duration: 3, repeat: Infinity }}
// 							style={{ backgroundSize: '200% 200%' }}
// 						>
// 							${'{'}friend's name{'}'} survived the meme verdict...
// 						</motion.h1>
// 						<motion.p
// 							className="text-2xl md:text-3xl font-bold text-white"
// 							initial={{ opacity: 0 }}
// 							animate={{ opacity: 1 }}
// 							transition={{ delay: 0.5 }}
// 						>
// 							Will you?
// 						</motion.p>
// 					</motion.div>

// 					{/* Roast result with glassmorphism */}
// 					<motion.div
// 						className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 shadow-2xl"
// 						initial={{ scale: 0.9, opacity: 0 }}
// 						animate={{ scale: 1, opacity: 1 }}
// 						transition={{ delay: 0.3 }}
// 					>
// 						<div className="text-center mb-8">
// 							<motion.div
// 								className="text-6xl mb-4"
// 								animate={{
// 									rotate: [0, -10, 10, -10, 0],
// 									scale: [1, 1.1, 1, 1.1, 1],
// 								}}
// 								transition={{ duration: 2, repeat: Infinity }}
// 							>
// 								💀
// 							</motion.div>
// 							<motion.div
// 								className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl p-6 border border-red-500/30"
// 								whileHover={{ scale: 1.02 }}
// 							>
// 								<p className="text-xl md:text-2xl font-bold text-white leading-relaxed">
// 									AI gave your friend a{' '}
// 									<span className="text-red-400 font-black text-3xl">
// 										68%
// 									</span>{' '}
// 									replaceable score
// 								</p>
// 							</motion.div>
// 						</div>

// 						{/* Enhanced reaction buttons */}
// 						<div className="mb-8">
// 							<motion.p
// 								className="text-center text-gray-300 mb-6 text-lg"
// 								initial={{ opacity: 0 }}
// 								animate={{ opacity: 1 }}
// 								transition={{ delay: 0.8 }}
// 							>
// 								React with the below emojis if you agree
// 							</motion.p>

// 							<div className="flex justify-center gap-4 flex-wrap">
// 								{[
// 									{
// 										emoji: '💩',
// 										label: 'Trash',
// 										color: 'from-yellow-600 to-orange-600',
// 									},
// 									{
// 										emoji: '🔥',
// 										label: 'Fire',
// 										color: 'from-red-500 to-orange-500',
// 									},
// 									{
// 										emoji: '🤡',
// 										label: 'Clown',
// 										color: 'from-pink-500 to-purple-500',
// 									},
// 									{
// 										emoji: '💀',
// 										label: 'Dead',
// 										color: 'from-gray-500 to-black',
// 									},
// 									{
// 										emoji: '😂',
// 										label: 'LMAO',
// 										color: 'from-yellow-400 to-yellow-600',
// 									},
// 								].map((reaction, index) => (
// 									<motion.button
// 										key={reaction.emoji}
// 										onClick={() => handleReaction(reaction.emoji)}
// 										className={`relative group text-4xl md:text-5xl p-4 md:p-6 rounded-2xl transition-all duration-300 ${
// 											selectedReaction === reaction.emoji
// 												? `bg-gradient-to-br ${reaction.color} shadow-2xl shadow-purple-500/50`
// 												: 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
// 										}`}
// 										whileHover={{
// 											scale: 1.2,
// 											rotate: [-5, 5, -5, 0],
// 											transition: { duration: 0.3 },
// 										}}
// 										whileTap={{ scale: 0.9 }}
// 										initial={{ opacity: 0, y: 20 }}
// 										animate={{ opacity: 1, y: 0 }}
// 										transition={{ delay: 0.9 + index * 0.1 }}
// 									>
// 										<motion.span
// 											animate={
// 												selectedReaction === reaction.emoji
// 													? {
// 															scale: [1, 1.3, 1],
// 															rotate: [0, 360, 0],
// 													  }
// 													: {}
// 											}
// 											transition={{ duration: 0.6 }}
// 										>
// 											{reaction.emoji}
// 										</motion.span>

// 										{/* Reaction count (fake) */}
// 										<motion.div
// 											className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
// 											initial={{ scale: 0 }}
// 											animate={{
// 												scale: selectedReaction === reaction.emoji ? 1 : 0,
// 											}}
// 										>
// 											{Math.floor(Math.random() * 99) + 1}
// 										</motion.div>

// 										{/* Hover tooltip */}
// 										<div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
// 											{reaction.label}
// 										</div>
// 									</motion.button>
// 								))}
// 							</div>
// 						</div>
// 					</motion.div>

// 					{/* CTA Button with insane animations */}
// 					<motion.button
// 						onClick={() => setCurrentPage('upload')}
// 						className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-6 rounded-2xl font-black text-xl md:text-2xl shadow-2xl group"
// 						whileHover={{
// 							scale: 1.05,
// 							boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)',
// 						}}
// 						whileTap={{ scale: 0.95 }}
// 						initial={{ opacity: 0, y: 20 }}
// 						animate={{ opacity: 1, y: 0 }}
// 						transition={{ delay: 1.2 }}
// 					>
// 						{/* Animated background */}
// 						<motion.div
// 							className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
// 							animate={{
// 								x: ['-100%', '100%'],
// 							}}
// 							transition={{
// 								duration: 1.5,
// 								repeat: Infinity,
// 								ease: 'easeInOut',
// 							}}
// 						/>

// 						<span className="relative z-10 flex items-center justify-center gap-3">
// 							👉 Upload yours — unless you're scared.
// 							<motion.span
// 								animate={{ x: [0, 5, 0] }}
// 								transition={{ duration: 1, repeat: Infinity }}
// 							>
// 								🔥
// 							</motion.span>
// 						</span>
// 					</motion.button>

// 					{/* Bottom meme text */}
// 					<motion.p
// 						className="text-center text-gray-400 mt-6 text-sm italic"
// 						initial={{ opacity: 0 }}
// 						animate={{ opacity: 1 }}
// 						transition={{ delay: 1.5 }}
// 					>
// 						*Warning: May cause existential crisis and career changes
// 					</motion.p>
// 				</motion.div>
// 			</div>
// 		</motion.div>
// 	);
// };

// 	return (
// 		<div className="font-sans">
// 			<AnimatePresence mode="wait">
// 				{currentPage === 'upload' && <UploadPage key="upload" />}
// 				{currentPage === 'analyzing' && <AnalyzingPage key="analyzing" />}
// 				{currentPage === 'results' && <ResultsPage key="results" />}
// 				{currentPage === 'reaction' && <ReactionPage key="reaction" />}
// 			</AnimatePresence>
// 		</div>
// 	);
// };

// export default Home;

// // // app/page.tsx
// // 'use client';

// // import { useState } from 'react';
// // import {
// // 	Upload,
// // 	FileText,
// // 	CheckCircle,
// // 	AlertCircle,
// // 	Loader2,
// // } from 'lucide-react';

// // interface AnalysisResult {
// // 	overall_score: number;
// // 	strengths: string[];
// // 	weaknesses: string[];
// // 	suggestions: string[];
// // 	skills_found: string[];
// // 	experience_level: string;
// // 	summary: string;
// // }

// // export default function Home() {
// // 	const [file, setFile] = useState<File | null>(null);
// // 	const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
// // 	const [loading, setLoading] = useState(false);
// // 	const [error, setError] = useState<string | null>(null);
// // 	const [dragActive, setDragActive] = useState(false);

// // 	const handleDrag = (e: React.DragEvent) => {
// // 		e.preventDefault();
// // 		e.stopPropagation();
// // 		if (e.type === 'dragenter' || e.type === 'dragover') {
// // 			setDragActive(true);
// // 		} else if (e.type === 'dragleave') {
// // 			setDragActive(false);
// // 		}
// // 	};

// // 	const handleDrop = (e: React.DragEvent) => {
// // 		e.preventDefault();
// // 		e.stopPropagation();
// // 		setDragActive(false);
// // 		if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// // 			setFile(e.dataTransfer.files[0]);
// // 		}
// // 	};

// // 	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// // 		if (e.target.files && e.target.files[0]) {
// // 			setFile(e.target.files[0]);
// // 		}
// // 	};

// // 	const analyzeResume = async () => {
// // 		if (!file) return;

// // 		setLoading(true);
// // 		setError(null);
// // 		setAnalysis(null);

// // 		try {
// // 			const formData = new FormData();
// // 			formData.append('resume', file);

// // 			const response = await fetch('http://localhost:8080/api/analyze', {
// // 				method: 'POST',
// // 				body: formData,
// // 			});

// // 			if (!response.ok) {
// // 				throw new Error(`HTTP error! status: ${response.status}`);
// // 			}

// // 			const result = await response.json();
// // 			setAnalysis(result);
// // 		} catch (err) {
// // 			setError(err instanceof Error ? err.message : 'Failed to analyze resume');
// // 		} finally {
// // 			setLoading(false);
// // 		}
// // 	};

// // 	const resetAnalysis = () => {
// // 		setFile(null);
// // 		setAnalysis(null);
// // 		setError(null);
// // 	};

// // 	return (
// // 		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
// // 			<div className="max-w-4xl mx-auto">
// // 				<div className="text-center mb-8">
// // 					<h1 className="text-4xl font-bold text-gray-900 mb-4">
// // 						AI Resume Analyzer
// // 					</h1>
// // 					<p className="text-lg text-gray-600">
// // 						Upload your resume and get instant AI-powered feedback
// // 					</p>
// // 				</div>

// // 				{!analysis ? (
// // 					<div className="bg-white rounded-2xl shadow-xl p-8">
// // 						<div
// // 							className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
// // 								dragActive
// // 									? 'border-blue-500 bg-blue-50'
// // 									: 'border-gray-300 hover:border-gray-400'
// // 							}`}
// // 							onDragEnter={handleDrag}
// // 							onDragLeave={handleDrag}
// // 							onDragOver={handleDrag}
// // 							onDrop={handleDrop}
// // 						>
// // 							<input
// // 								type="file"
// // 								accept=".pdf,.doc,.docx,.txt"
// // 								onChange={handleFileChange}
// // 								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
// // 							/>

// // 							<Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />

// // 							{file ? (
// // 								<div className="flex items-center justify-center mb-4">
// // 									<FileText className="w-5 h-5 text-blue-500 mr-2" />
// // 									<span className="text-sm font-medium text-gray-700">
// // 										{file.name}
// // 									</span>
// // 								</div>
// // 							) : (
// // 								<>
// // 									<h3 className="text-lg font-semibold text-gray-700 mb-2">
// // 										Drag & drop your resume here
// // 									</h3>
// // 									<p className="text-gray-500 mb-4">or click to browse files</p>
// // 								</>
// // 							)}

// // 							<p className="text-sm text-gray-400">
// // 								Supported formats: PDF, DOC, DOCX, TXT
// // 							</p>
// // 						</div>

// // 						{error && (
// // 							<div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
// // 								<AlertCircle className="w-5 h-5 text-red-500 mr-2" />
// // 								<span className="text-red-700">{error}</span>
// // 							</div>
// // 						)}

// // 						<div className="flex justify-center gap-4 mt-6">
// // 							<button
// // 								onClick={analyzeResume}
// // 								disabled={!file || loading}
// // 								className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
// // 							>
// // 								{loading ? (
// // 									<>
// // 										<Loader2 className="w-4 h-4 mr-2 animate-spin" />
// // 										Analyzing...
// // 									</>
// // 								) : (
// // 									'Analyze Resume'
// // 								)}
// // 							</button>

// // 							{file && (
// // 								<button
// // 									onClick={resetAnalysis}
// // 									className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
// // 								>
// // 									Clear
// // 								</button>
// // 							)}
// // 						</div>
// // 					</div>
// // 				) : (
// // 					<div className="space-y-6">
// // 						<div className="bg-white rounded-2xl shadow-xl p-8">
// // 							<div className="flex items-center justify-between mb-6">
// // 								<h2 className="text-2xl font-bold text-gray-900">
// // 									Analysis Results
// // 								</h2>
// // 								<button
// // 									onClick={resetAnalysis}
// // 									className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// // 								>
// // 									Analyze Another
// // 								</button>
// // 							</div>

// // 							<div className="grid md:grid-cols-2 gap-6">
// // 								<div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
// // 									<h3 className="text-lg font-semibold mb-2">Overall Score</h3>
// // 									<div className="text-4xl font-bold">
// // 										{analysis.overall_score}/10
// // 									</div>
// // 									<p className="text-blue-100 mt-2">
// // 										Experience Level: {analysis.experience_level}
// // 									</p>
// // 								</div>

// // 								<div className="bg-gray-50 rounded-xl p-6">
// // 									<h3 className="text-lg font-semibold text-gray-900 mb-3">
// // 										Summary
// // 									</h3>
// // 									<p className="text-gray-700 leading-relaxed">
// // 										{analysis.summary}
// // 									</p>
// // 								</div>
// // 							</div>
// // 						</div>

// // 						<div className="grid md:grid-cols-2 gap-6">
// // 							<div className="bg-white rounded-xl shadow-lg p-6">
// // 								<div className="flex items-center mb-4">
// // 									<CheckCircle className="w-5 h-5 text-green-500 mr-2" />
// // 									<h3 className="text-lg font-semibold text-gray-900">
// // 										Strengths
// // 									</h3>
// // 								</div>
// // 								<ul className="space-y-2">
// // 									{analysis.strengths.map((strength, index) => (
// // 										<li key={index} className="text-gray-700 flex items-start">
// // 											<span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
// // 											{strength}
// // 										</li>
// // 									))}
// // 								</ul>
// // 							</div>

// // 							<div className="bg-white rounded-xl shadow-lg p-6">
// // 								<div className="flex items-center mb-4">
// // 									<AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
// // 									<h3 className="text-lg font-semibold text-gray-900">
// // 										Areas for Improvement
// // 									</h3>
// // 								</div>
// // 								<ul className="space-y-2">
// // 									{analysis.weaknesses.map((weakness, index) => (
// // 										<li key={index} className="text-gray-700 flex items-start">
// // 											<span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
// // 											{weakness}
// // 										</li>
// // 									))}
// // 								</ul>
// // 							</div>
// // 						</div>

// // 						<div className="grid md:grid-cols-2 gap-6">
// // 							<div className="bg-white rounded-xl shadow-lg p-6">
// // 								<h3 className="text-lg font-semibold text-gray-900 mb-4">
// // 									Skills Identified
// // 								</h3>
// // 								<div className="flex flex-wrap gap-2">
// // 									{analysis.skills_found.map((skill, index) => (
// // 										<span
// // 											key={index}
// // 											className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
// // 										>
// // 											{skill}
// // 										</span>
// // 									))}
// // 								</div>
// // 							</div>

// // 							<div className="bg-white rounded-xl shadow-lg p-6">
// // 								<h3 className="text-lg font-semibold text-gray-900 mb-4">
// // 									Suggestions
// // 								</h3>
// // 								<ul className="space-y-2">
// // 									{analysis.suggestions.map((suggestion, index) => (
// // 										<li key={index} className="text-gray-700 flex items-start">
// // 											<span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
// // 											{suggestion}
// // 										</li>
// // 									))}
// // 								</ul>
// // 							</div>
// // 						</div>
// // 					</div>
// // 				)}
// // 			</div>
// // 		</div>
// // 	);
// // }

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ReactionPage from './components/reactions';
// export default function Home() {
// 	// return (
// 	// 	<div className="font-sans">
// 	// 		{currentPage === 'upload' && <UploadPage key="upload" />}
// 	// 		{currentPage === 'analyzing' && <AnalyzingPage key="analyzing" />}
// 	// 		{currentPage === 'results' && <ResultsPage key="results" />}
// 	// 		{currentPage === 'reaction' && <ReactionPage key="reaction" />}
// 	// 		return <ResumeAnalyzer />;
// 	// 	</div>
// 	// );
// 	<Routes>
// 		<Route path="/" element={<ResumeAnalyzer />} />
// 		{/* <Route path="/results" element={<Results />} /> */}
// 		<Route path="/roast/:shareId" element={<ReactionPage />} />
// 		{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
// 	</Routes>;
// }
export default function Home() {
  return <ResumeAnalyzer />;
}
