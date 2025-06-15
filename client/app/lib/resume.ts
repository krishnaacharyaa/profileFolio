'use server';

import { AnalysisResult } from '../types/resume';

export const analyzeResume = async (file: File): Promise<AnalysisResult> => {
	const formData = new FormData();
	formData.append('resume', file);

	const response = await fetch('http://localhost:8080/api/analyze', {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return await response.json();
};
