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
		});

		console.log('Received response status:', response.status);

		// First clone the response for error handling
		const responseClone = response.clone();

		if (!response.ok) {
			try {
				const errorResponse = await responseClone.json();
				console.error('API Error Details:', {
					status: response.status,
					statusText: response.statusText,
					url: apiUrl,
					details: errorResponse,
				});
				throw new Error(
					`Analysis failed: ${response.statusText} (${response.status}). ${
						errorResponse.message || JSON.stringify(errorResponse)
					}`
				);
			} catch (e) {
				// If JSON parsing fails, try reading as text
				const errorText = await responseClone.text();
				throw new Error(
					`Analysis failed: ${response.statusText} (${response.status}). ${errorText}`
				);
			}
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

		throw err;
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
