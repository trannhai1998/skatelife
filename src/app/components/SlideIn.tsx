'use client';

import React, { useEffect } from 'react';

type Props = {
	children: React.ReactNode;
	delay?: number;
	duration?: number;
};

export default function SlideIn({
	children,
	delay = 0,
	duration = 1,
}: Props) {
	const elementRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = elementRef.current;
		if (!element) {
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					element.style.animation = `slide-in ${duration}s ease ${delay}s forwards`;

					observer.unobserve(element);
				}
			},
			{
				threshold: 0,
				rootMargin: '-150px', // Adjust this value to control when the animation triggers
			},
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [delay, duration]);

	return (
		<div className="slide-in-hidden" ref={elementRef}>
			{children}
		</div>
	);
}
