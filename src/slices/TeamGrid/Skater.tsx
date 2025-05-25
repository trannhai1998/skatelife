import { ButtonLink } from '@/app/components/ButtonLink';
import { Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import React from 'react';
import { SkaterScribble } from './SkaterScribble';
import clsx from 'clsx';

type Props = {
	skater: Content.SkaterDocument;
	index: number;
};

export default function Skater({ skater, index }: Props) {
	const colors = [
		'text-brand-pink',
		'text-brand-lime',
		'text-brand-orange',
		'text-brand-purple',
	];

	const scribbleColor = colors[index];
	return (
		<div className="group skater relative flex flex-col items-center gap-4">
			<div className="stack-layout overflow-hidden">
				<PrismicNextImage
					field={skater.data.photo_background}
					width={500}
					imgixParams={{ q: 20 }}
					className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75
                    group-hover:saturate-[0.8]
                    "
					alt=""></PrismicNextImage>
				<SkaterScribble
					className={clsx('relative', scribbleColor)}></SkaterScribble>

				<PrismicNextImage
					field={skater.data.photo_foreground}
					width={500}
					alt=""
					className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110"></PrismicNextImage>
				<div className="relative h-48 w-full place-self-end bg-gradient-to-t from-black via-transparent to-transparent"></div>
				<h3 className="relative grid place-self-end justify-self-start p-2 font-sans text-brand-gray ~text-2xl/3xl">
					<span className="mb-[-.3em] block">
						{skater.data.first_name}
					</span>
					<span className="block">{skater.data.last_name}</span>
				</h3>
			</div>
			<ButtonLink field={skater.data.customize_link} size="sm">
				Build their Board
			</ButtonLink>
		</div>
	);
}
