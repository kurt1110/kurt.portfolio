import type { ImageMetadata } from 'astro';
import nexusImage from '../assets/images/nexus-logistics.png';
import testBankImage from '../assets/images/test-bank.png';
import nexoraImage from '../assets/images/nexora.png';

export type Project = {
	title: string;
	description: string;
	technologies: string[];
	category: string;
	link?: string;
	source?: string;
	featured?: boolean;
	image?: ImageMetadata;
	status?: 'live' | 'offline';
};

export const projects: Project[] = [
	{
		title: 'Nexus Logistics',
		description:
			'An enterprise logistics resources platform featuring freight booking, cargo tracking, pricing calculation engines, automated waybills, client portals, and invoice tracking.',
		technologies: ['Next.js', 'Laravel', 'MySQL'],
		category: 'Client · Live',
		link: 'https://nexuslogixx.com/',
		image: nexusImage,
		status: 'live',
		featured: true,
	},
	{
		title: 'Test Bank',
		description:
			'A professor dashboard for PHINMA Education’s Test Bank System — manage sections, tests, student performance, and reports in one place.',
		technologies: ['JavaScript', 'React', 'MongoDB'],
		category: 'Education · Offline',
		image: testBankImage,
		status: 'offline',
		featured: true,
	},
	{
		title: 'NEXORA',
		description:
			'A game discovery and recommendation platform — personalized suggestions, genre filters, trending titles, and a personal game library experience.',
		technologies: ['HTML', 'CSS', 'JavaScript', 'PHP'],
		category: 'Games · Offline',
		image: nexoraImage,
		status: 'offline',
		featured: true,
	},
];
