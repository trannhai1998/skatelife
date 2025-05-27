import React from 'react';
import Header from '../components/Header';
import { Footer } from '../components/Footer';

type Props = {
	children: React.ReactNode;
};

export default function layout({ children }: Props) {
	return (
		<>
			<Header></Header>
			{children}
			<Footer />
		</>
	);
}
