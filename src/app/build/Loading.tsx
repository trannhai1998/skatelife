'use client';

import React from 'react';
import { useProgress } from '@react-three/drei';
import clsx from 'clsx';
import { Logo } from '../components/Logo';

export default function Loading() {
	const { progress } = useProgress();
	return (
		<div
			className={clsx(
				'absolute inset-0 place-content-center bg-brand-navy font-sans text-[15vw] text-white transition-opacity duration-1000 ',
				progress >= 100
					? 'pointer-events-none opacity-0'
					: 'opacity-100',
			)}>
			<Logo className="w-[15vw] animate-squiggle text-brand-pink"></Logo>
			<p className="w-full animate-squiggle text-center loeading-none text-brand-lime">
				LOADING...
			</p>
		</div>
	);
}
