import { createClient } from '@/prismicio';
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next';
import React from 'react';
import { Logo } from './Logo';
import { Bounded } from './Bounded';
import { FooterPhysics } from './FooterPhysics';
import { asImageSrc } from '@prismicio/client';

type Props = {};

export async function Footer({}: Props) {
	const client = createClient();
	const settings = await client.getSingle('settings');

	const boardTextureURLs = settings.data.footer_skateboards
		.map((board) => {
			return asImageSrc(board.skateboard, {
				h: 600,
			});
		})
		.filter((url): url is string => Boolean(url));

	return (
		<footer className="bg-texture bg-zinc-900 text-white overflow-hidden">
			<div className="relative h-[75vh] ~p-10/16 md:aspect-auto">
				{/* Image */}
				<PrismicNextImage
					field={settings.data.footer_image}
					alt=""
					fill
					className="object-cover"
					width={1200}></PrismicNextImage>
				{/* Physics Boards */}
				<FooterPhysics
					boardTextureURLs={boardTextureURLs}
					className="absolute inset-0 overflow-hidden"></FooterPhysics>

				<Logo className="pointer-events-none relative mix-blend-exclusion ~h-20/28"></Logo>
			</div>
			{/* List of links */}

			<Bounded as={'nav'} className="">
				<ul className="flex flex-wrap justify-center gap-8 ~text-lg/xl">
					{settings.data.navigation.map((item) => {
						return (
							<li
								key={item.link.text}
								className="hover:underline">
								<PrismicNextLink
									field={item.link}></PrismicNextLink>
							</li>
						);
					})}
				</ul>
			</Bounded>
		</footer>
	);
}
