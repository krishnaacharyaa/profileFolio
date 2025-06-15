export interface AnalysisResult {
	overall_score: number;
	strengths: string[];
	weaknesses: string[];
	suggestions: string[];
	skills_found: string[];
	experience_level: string;
	summary: string;
}

export interface FileUploadProps {
	file: File | null;
	dragActive: boolean;
	onDrag: (e: React.DragEvent) => void;
	onDrop: (e: React.DragEvent) => void;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AnalysisResultsProps {
	analysis: AnalysisResult;
	onReset: () => void;
}
