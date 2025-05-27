'use client';

import { Content } from '@prismicio/client';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type CustomizerControlsContext = {
	selectedWheel?: Content.WheelsDocumentDataWheelsItem;
	setWheel?: (wheel: Content.WheelsDocumentDataWheelsItem) => void;
	selectedDeck?: Content.WheelsDocumentDataDecksItem;
	setDeck?: (deck: Content.WheelsDocumentDataDecksItem) => void;
	selectedTrucks?: Content.WheelsDocumentDataMetalsItem;
	setTrucks?: (trucks: Content.WheelsDocumentDataMetalsItem) => void;
	selectedBolt?: Content.WheelsDocumentDataMetalsItem;
	setBolt?: (bolt: Content.WheelsDocumentDataMetalsItem) => void;
};

const defaultContext: CustomizerControlsContext = {
	setWheel: () => {},
	setDeck: () => {},
	setTrucks: () => {},
	setBolt: () => {},
};

const CustomizerControlsContext =
	createContext<CustomizerControlsContext>(defaultContext);

type CustomizerControlsProviderProps = {
	children?: ReactNode;
	defaultWheels?: Content.WheelsDocumentDataWheelsItem;
	defaultDeck?: Content.WheelsDocumentDataDecksItem;
	defaultTrucks?: Content.WheelsDocumentDataMetalsItem;
	defaultBolt?: Content.WheelsDocumentDataMetalsItem;
};

export function CustomizerControlsProvider({
	defaultWheels,
	defaultDeck,
	defaultTrucks,
	defaultBolt,
	children,
}: CustomizerControlsProviderProps) {
	const [selectedWheel, setWheel] = useState(defaultWheels);
	const [selectedDeck, setDeck] = useState(defaultDeck);
	const [selectedTrucks, setTrucks] = useState(defaultTrucks);
	const [selectedBolt, setBolt] = useState(defaultBolt);

	const value = useMemo<CustomizerControlsContext>(() => {
		return {
			selectedWheel,
			setWheel,
			selectedDeck,
			setDeck,
			selectedTrucks,
			setTrucks,
			selectedBolt,
			setBolt,
		};
	}, [selectedWheel, selectedDeck, selectedTrucks, selectedBolt]);

	return (
		<CustomizerControlsContext.Provider value={value}>
			{children}
		</CustomizerControlsContext.Provider>
	);
}

export function useCustomizerControls() {
	return useContext(CustomizerControlsContext);
}
