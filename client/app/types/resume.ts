export interface FileUploadProps {
	file: File | null;
	dragActive: boolean;
	onDrag: (e: React.DragEvent) => void;
	onDrop: (e: React.DragEvent) => void;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AnalysisResultsProps {
	analysis: RoastAnalysis;
	onReset: () => void;
}

export interface RoastAnalysis {
	id: string;
	name: string;
	ai_risk: number;
	tech_score: number;
	gpt_overlap: number;
	buzzword_bingo: number;
	whats_not_terrible: string[];
	red_flags: string[];
	roast: string;
	view_count: number;
	reactions: { [key: string]: number };
}
