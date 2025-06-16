'use server';

import { API_BASE_URL } from '@/constants/constants';
import { RoastAnalysis } from '../types/resume';

export const analyzeResume = async (file: File): Promise<RoastAnalysis> => {
	console.log('Preparing to analyze resume file:', file.name);

	const formData = new FormData();
	formData.append('resume', file);

	try {
		const apiUrl = `${API_BASE_URL}/api/analyze`;
		console.log('Making request to:', apiUrl);

		const response = await fetch(apiUrl, {
			method: 'POST',
			body: formData,
			// credentials: 'include' // Uncomment if you need to send cookies
		});

		console.log('Received response status:', response.status);

		if (!response.ok) {
			let errorDetails = '';
			try {
				const errorResponse = await response.json();
				errorDetails = errorResponse.message || JSON.stringify(errorResponse);
			} catch (e) {
				errorDetails = await response.text();
			}

			console.error('API Error Details:', {
				status: response.status,
				statusText: response.statusText,
				url: apiUrl,
				details: errorDetails,
			});

			throw new Error(
				`Analysis failed: ${response.statusText} (${response.status}). ${errorDetails}`
			);
		}

		const result = await response.json();
		console.log('Analysis result:', result);
		return result;
	} catch (err) {
		console.error('Network/API error:', err);

		if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
			throw new Error(
				'Network error: Could not connect to the analysis service'
			);
		}

		throw err; // Re-throw for handleAnalyze to catch
	}
};
export const getAnalysisById = async (id: number): Promise<RoastAnalysis> => {
	const response = await fetch(`${API_BASE_URL}/api/analyses/${id}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return await response.json();
};

// await fetch(`/api/analyses/${shareId}/react`, {
// 					method: 'POST',
// 					headers: { 'Content-Type': 'application/json' },
// 					body: JSON.stringify({
// 						reaction: emoji,
// 						prevReaction: prevReaction || '',
// 					}),
// 				});
// 				if (!response.ok) {
// 					throw new Error('Failed to submit reaction');
// 				}

export const postReactions = async (id: number): Promise<RoastAnalysis> => {
	const response = await fetch(`${API_BASE_URL}/api/analyses/${id}/react`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return await response.json();
};
