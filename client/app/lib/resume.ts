'use server';

import { API_BASE_URL } from '@/constants/constants';
import { RoastAnalysis } from '../types/resume';

// Updated to return job ID
export async function analyzeResume(file: File): Promise<{ jobId: string }> {
	const formData = new FormData();
	formData.append('resume', file);

	const response = await fetch(`${API_BASE_URL}/api/analyze`, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('Failed to start analysis');
	}

	// Add await here to properly parse the JSON response
	const res = await response.json();
	console.log('Analysis response:', res);

	if (!res.jobId) {
		throw new Error('No jobId received from server');
	}

	return res;
}
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
