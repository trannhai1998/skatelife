'use client';

import {
	ColorField,
	Content,
	ImageField,
	KeyTextField,
} from '@prismicio/client';
import clsx from 'clsx';
import React, { ComponentProps, ReactNode, useEffect } from 'react';
import { Heading } from '../components/Heading';
import { PrismicNextImage, PrismicNextImageProps } from '@prismicio/next';
import { useCustomizerControls } from './context';
import { useRouter } from 'next/navigation';

type Props = Pick<Content.WheelsDocumentData, 'wheels' | 'decks' | 'metals'> & {
	className?: string;
};

export default function Controls({ decks, metals, wheels, className }: Props) {
	const router = useRouter();

	const {
		setBolt,
		setDeck,
		setWheel,
		setTrucks,
		selectedBolt,
		selectedDeck,
		selectedTrucks,
		selectedWheel,
	} = useCustomizerControls();

	useEffect(() => {
		const url = new URL(window.location.href);

		if (!!selectedWheel?.uid) {
			url.searchParams.set('wheel', selectedWheel.uid);
		}

		if (!!selectedDeck?.uid) {
			url.searchParams.set('deck', selectedDeck.uid);
		}

		if (!!selectedTrucks?.uid) {
			url.searchParams.set('truck', selectedTrucks.uid);
		}

		if (!!selectedBolt?.uid) {
			url.searchParams.set('bolt', selectedBolt.uid);
		}

		router.replace(url.href);
	}, [router, selectedWheel, selectedDeck, selectedTrucks, selectedBolt]);

	return (
		<div className={clsx('flex flex-col gap-6', className)}>
			<Options title="Deck" selectedName={selectedDeck?.uid}>
				{decks.map((deck) => (
					<Option
						key={deck.uid}
						imageField={deck.texture}
						imgixParams={{
							rect: [20, 1550, 1000, 1000],
							width: 150,
							height: 150,
						}}
						selected={deck.uid === selectedDeck?.uid}
						onClick={() => setDeck?.(deck)}>
						{deck.uid?.replace(/-/g, ' ')}
					</Option>
				))}
			</Options>
			<Options title="Wheels" selectedName={selectedWheel?.uid}>
				{wheels.map((wheel) => (
					<Option
						key={wheel.uid}
						imageField={wheel.texture}
						imgixParams={{
							rect: [20, 10, 850, 850],
							width: 150,
							height: 150,
						}}
						selected={wheel.uid === selectedWheel?.uid}
						onClick={() => setWheel?.(wheel)}>
						{wheel.uid?.replace(/-/g, ' ')}
					</Option>
				))}
			</Options>
			<Options title="Trucks" selectedName={selectedTrucks?.uid}>
				{metals.map((metal) => (
					<Option
						key={metal.uid}
						colorField={metal.color}
						selected={metal.uid === selectedTrucks?.uid}
						onClick={() => setTrucks?.(metal)}>
						{metal.uid?.replace(/-/g, ' ')}
					</Option>
				))}
			</Options>
			<Options title="Bolts" selectedName={selectedBolt?.uid}>
				{metals.map((metal) => (
					<Option
						key={metal.uid}
						colorField={metal.color}
						selected={metal.uid === selectedBolt?.uid}
						onClick={() => setBolt?.(metal)}>
						{metal.uid?.replace(/-/g, ' ')}
					</Option>
				))}
			</Options>
		</div>
	);
}

type OptionsProps = {
	title?: ReactNode;
	selectedName?: KeyTextField;
	children?: ReactNode;
};

function Options({ title, selectedName, children }: OptionsProps) {
	const formattedName = selectedName?.replace(/-/g, ' ');

	return (
		<div className="">
			<div className="flex">
				<Heading as="h2" size="xs" className="mb-2">
					{title}
				</Heading>

				<p className="ml-3 text-zinc-300">
					<span className="select-none text-zinc-500">| </span>
					{formattedName}
				</p>
			</div>

			<ul className="mb-1 flex flex-wrap gap-2">{children}</ul>
		</div>
	);
}

type OptionProps = Omit<ComponentProps<'button'>, 'children'> & {
	selected: boolean;
	children: ReactNode;
} & (
		| {
				imageField: ImageField;
				imgixParams?: PrismicNextImageProps['imgixParams'];
				colorField?: never;
		  }
		| {
				colorField: ColorField;
				imageField?: never;
				imgixParams?: never;
		  }
	);

function Option({
	children,
	selected,
	imageField,
	imgixParams,
	colorField,
	onClick,
	...restProps
}: OptionProps) {
	return (
		<li>
			<button
				className={clsx(
					'size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white',
					selected && 'outline',
				)}
				onClick={onClick}
				{...restProps}>
				{imageField ? (
					<PrismicNextImage
						field={imageField}
						imgixParams={imgixParams}
						className="pointer-events-none h-full w-full rounded-full"
						alt=""></PrismicNextImage>
				) : (
					<div
						className="rounded-full h-full w-full"
						style={{
							backgroundColor: colorField ?? undefined,
						}}></div>
				)}

				<span className="sr-only">{children}</span>
			</button>
		</li>
	);
}
