import Link from 'next/link';
import React from 'react';
import { Logo } from '../components/Logo';
import { Heading } from '../components/Heading';
import { ButtonLink } from '../components/ButtonLink';

import { CustomizerControlsProvider } from './context';
import { createClient } from '@/prismicio';
import { asImageSrc } from '@prismicio/client';
import Controls from './Controls';
import Preview from './Preview';
import Loading from './Loading';

type SearchParams = {
	wheel?: string;
	deck?: string;
	truck?: string;
	bolt?: string;
};

export default async function page(props: {
	searchParams: Promise<SearchParams>;
}) {
	const searchParams = await props.searchParams;

	const client = createClient();
	const customizeSettings = await client.getSingle('wheels');
	const { wheels, decks, metals } = customizeSettings.data;

	const defaultWheels =
		wheels.find((wheel) => wheel.uid === searchParams.wheel) ?? wheels[0];
	const defaultDeck =
		decks.find((deck) => deck.uid === searchParams.deck) ?? decks[0];
	const defaultTrucks =
		metals.find((metal) => metal.uid === searchParams.truck) ?? metals[0];
	const defaultBolt =
		metals.find((metal) => metal.uid === searchParams.bolt) ?? metals[0];

	const wheelTextureURLs = wheels
		.map((wheel) => asImageSrc(wheel.texture))
		.filter((url): url is string => Boolean(url));
	const deckTextureURLs = decks
		.map((deck) => asImageSrc(deck.texture))
		.filter((url): url is string => Boolean(url));

	return (
		<div className="flex min-h-screen flex-col lg:flex-row">
			<CustomizerControlsProvider
				defaultWheels={defaultWheels}
				defaultDeck={defaultDeck}
				defaultTrucks={defaultTrucks}
				defaultBolt={defaultBolt}>
				<div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
					<div className="absolute inset-0">
						<Preview
							deckTextureURLs={deckTextureURLs}
							wheelTextureURLs={wheelTextureURLs}></Preview>
					</div>

					<Link href="/" className="absolute left-6 top-6">
						<Logo className="h-16 text-white"></Logo>
					</Link>
				</div>
				<div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
					<Heading as="h1" size="sm" className="mb-6 mt-0">
						Build your board
					</Heading>

					<Controls
						decks={decks}
						metals={metals}
						wheels={wheels}
						className="mb-6"></Controls>

					<ButtonLink href="" color="lime" icon="plus">
						Add to cart
					</ButtonLink>
				</div>
			</CustomizerControlsProvider>
			<Loading />
		</div>
	);
}
