// src/types/user.ts

export interface User {
	basics: {
		name: string;
		label: string;
		email: string;
		phone: string;
		url: string;
		summary: string;
		location: {
			address: string;
			postalCode: string;
			city: string;
			countryCode: string;
			region: string;
		};
		profiles: {
			network: string;
			username: string;
			url: string;
		}[];
	};
	work: {
		name: string;
		position: string;
		url: string;
		startDate: string;
		endDate: string;
		summary: string;
		highlights: string[];
	}[];
	education: {
		institution: string;
		url: string;
		area: string;
		studyType: string;
		startDate: string;
		endDate: string;
		score: string;
		courses: string[];
	}[];
	projects: {
		name: string;
		startDate: string;
		endDate: string;
		description: string;
		highlights: string[];
		url: string;
	}[];
}
