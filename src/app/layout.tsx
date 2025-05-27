import type { Metadata } from 'next';
import { Bowlby_One_SC, DM_Mono } from 'next/font/google';

import './globals.css';
import { SVGFilters } from './components/SVGFilters';
import { createClient } from '@/prismicio';

const bowlbyOne = Bowlby_One_SC({
	subsets: ['latin'],
	variable: '--font-bowlby-sc',
	display: 'swap',
	weight: '400',
});

const dmMono = DM_Mono({
	subsets: ['latin'],
	variable: '--font-dm-mono',
	display: 'swap',
	weight: '500',
});

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const settings = await client.getSingle('settings');
	return {
		title: settings.data.site_title,
		description: settings.data.meta_description,
		openGraph: {
			images:
				settings.data.fallback_og_image &&
				settings.data.fallback_og_image.url
					? [{ url: settings.data.fallback_og_image.url }]
					: undefined,
		},
	};
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${bowlbyOne.variable} ${dmMono.variable} antialiased font-mono text-zinc-800 font-medium`}>
				<main>{children}</main>

				<SVGFilters />
			</body>
		</html>
	);
}
