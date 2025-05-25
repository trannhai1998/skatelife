'use client';

import { ImageField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

type Props = {
	foregroundImage: ImageField;
	backgroundImage: ImageField;
	className?: string;
};

export default function ParallaxImage({
	backgroundImage,
	foregroundImage,
	className,
}: Props) {
	const backgroundRef = useRef<HTMLDivElement>(null);
	const foregroundRef = useRef<HTMLDivElement>(null);

	const targetPosition = useRef({
		x: 0,
		y: 0,
	});
	const currentPosition = useRef({
		x: 0,
		y: 0,
	});

	useEffect(() => {
		const frameId = requestAnimationFrame(animationFrame);
		window.addEventListener('mousemove', onMouseMove);

		function onMouseMove(event: MouseEvent) {
			const { innerHeight, innerWidth } = window;
			const { clientX, clientY } = event;

			const xPercent = (clientX / innerWidth - 0.5) * 2; // Range between -1 and 1;
			const yPercent = (clientY / innerHeight - 0.5) * 2; // Range between -1 and 1;

			targetPosition.current = {
				x: xPercent * -20,
				y: yPercent * -20,
			};
		}

		function animationFrame() {
			const { x: targetX, y: targetY } = targetPosition.current;
			const { x: currentX, y: currentY } = currentPosition.current;

			// Explain this line
			// The current position is updated to move towards the target position
			// with a factor of 0.1, creating a smooth transition effect.
			const newX = currentX + (targetX - currentX) * 0.1;
			const newY = currentY + (targetY - currentY) * 0.1;

			currentPosition.current = {
				x: newX,
				y: newY,
			};

			if (backgroundRef.current) {
				backgroundRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
			}

			if (foregroundRef.current) {
				foregroundRef.current.style.transform = `translate(${newX * 2.5}px, ${newY * 2.5}px)`;
			}

			// Request the next animation frame
			// This function is called recursively to create a smooth animation loop.
			requestAnimationFrame(animationFrame);
		}

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			cancelAnimationFrame(frameId);
		};
	});

	return (
		<div className={clsx('grid grid-cols-1 place-items-center', className)}>
			<div
				className="col-start-1 row-start-1 transition-transform"
				ref={backgroundRef}>
				<PrismicNextImage
					field={backgroundImage}
					alt=""
					className="w-11/12"
				/>
			</div>

			<div
				className="col-start-1 row-start-1 transition-transform h-full place-items-center"
				ref={foregroundRef}>
				<PrismicNextImage
					field={foregroundImage}
					alt=""
					imgixParams={{
						height: 600,
					}}
					className="h-full max-h-[500px] w-auto "
				/>
			</div>
		</div>
	);
}
