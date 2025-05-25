import Link from 'next/link';
import React from 'react';
import { ButtonLink } from './ButtonLink';
import { Logo } from './Logo';
import { createClient } from '@/prismicio';
import { PrismicLink } from '@prismicio/react';

export default async function Header() {
	const client = createClient();
	const setting = await client.getSingle('settings');

	return (
		<header className="header absolute left-0 right-0 top-0 z-50 ~h-32/48 ~px-4/6 ~py-4/6 hd:h-32 ">
			<div className="mx-auto grid w-full max-w-6xl grid-cols-[auto,auto] items-center gap-6 md:grid-cols-[1fr,auto,1fr]">
				<Link href="/" className="justify-self-start">
					<Logo className="text-brand-purple ~h-12/20" />
				</Link>
				<nav
					aria-label="Main"
					className="col-span-full row-start-2 md:col-span-1 md:col-start-2 md:row-start-1">
					<ul className="flex flex-wrap items-center justify-center gap-8">
						{setting.data.navigation.map((item) => (
							<li key={item.link.text}>
								<PrismicLink
									field={item.link}
									className="~text-lg/xl"></PrismicLink>
							</li>
						))}
					</ul>
				</nav>
				<ButtonLink
					className="justify-self-end"
					href=""
					icon="cart"
					color="purple"
					aria-label="Cart (1)">
					<span className="md:hidden ">1</span>
					<span className="hidden md:inline">Cart (1)</span>
				</ButtonLink>
			</div>
		</header>
	);
}
