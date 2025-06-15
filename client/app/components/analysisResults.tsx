// app/components/resume-analyzer/AnalysisResults.tsx

import { CheckCircle, AlertCircle } from 'lucide-react';
import { AnalysisResultsProps } from '../types/resume';

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
	analysis,
	onReset,
}) => {
	return (
		<div className="space-y-6">
			<div className="bg-white rounded-2xl shadow-xl p-8">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
					<button
						onClick={onReset}
						className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
					>
						Analyze Another
					</button>
				</div>

				<div className="grid md:grid-cols-2 gap-6">
					<div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
						<h3 className="text-lg font-semibold mb-2">Overall Score</h3>
						<div className="text-4xl font-bold">
							{analysis.overall_score}/10
						</div>
						<p className="text-blue-100 mt-2">
							Experience Level: {analysis.experience_level}
						</p>
					</div>

					<div className="bg-gray-50 rounded-xl p-6">
						<h3 className="text-lg font-semibold text-gray-900 mb-3">
							Summary
						</h3>
						<p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<div className="bg-white rounded-xl shadow-lg p-6">
					<div className="flex items-center mb-4">
						<CheckCircle className="w-5 h-5 text-green-500 mr-2" />
						<h3 className="text-lg font-semibold text-gray-900">Strengths</h3>
					</div>
					<ul className="space-y-2">
						{analysis.strengths.map((strength, index) => (
							<li key={index} className="text-gray-700 flex items-start">
								<span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
								{strength}
							</li>
						))}
					</ul>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6">
					<div className="flex items-center mb-4">
						<AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
						<h3 className="text-lg font-semibold text-gray-900">
							Areas for Improvement
						</h3>
					</div>
					<ul className="space-y-2">
						{analysis.weaknesses.map((weakness, index) => (
							<li key={index} className="text-gray-700 flex items-start">
								<span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
								{weakness}
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<div className="bg-white rounded-xl shadow-lg p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Skills Identified
					</h3>
					<div className="flex flex-wrap gap-2">
						{analysis.skills_found.map((skill, index) => (
							<span
								key={index}
								className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
							>
								{skill}
							</span>
						))}
					</div>
				</div>

				<div className="bg-white rounded-xl shadow-lg p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						Suggestions
					</h3>
					<ul className="space-y-2">
						{analysis.suggestions.map((suggestion, index) => (
							<li key={index} className="text-gray-700 flex items-start">
								<span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
								{suggestion}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
