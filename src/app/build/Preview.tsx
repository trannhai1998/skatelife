'use client';

import {
	CameraControls,
	Environment,
	Preload,
	useTexture,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { asImageSrc } from '@prismicio/client';
import * as THREE from 'three';

import React, { Suspense, useEffect, useRef } from 'react';
import { useCustomizerControls } from './context';
import { Skateboard } from '../components/Skateboard';

const DEFAULT_WHEEL_TEXTURE = '/skateboard/SkateWheel1.png';
const DEFAULT_DECK_TEXTURE = '/skateboard/Deck.webp';
const DEFAULT_TRUCK_COLOR = '#6F6E6A';
const DEFAULT_BOLT_COLOR = '#6F6E6A';
const ENVIROMENT_COLOR = '#3B3A3A';

type Props = {
	wheelTextureURLs: string[];
	deckTextureURLs: string[];
};

export default function Preview({ deckTextureURLs, wheelTextureURLs }: Props) {
	const cameraControl = useRef<CameraControls>(null);
	const floorRef = useRef<THREE.Mesh>(null);

	const { selectedWheel, selectedBolt, selectedDeck, selectedTrucks } =
		useCustomizerControls();

	const wheelTextureURL =
		asImageSrc(selectedWheel?.texture) ?? DEFAULT_WHEEL_TEXTURE;
	const deckTextureURL =
		asImageSrc(selectedDeck?.texture) ?? DEFAULT_DECK_TEXTURE;
	const truckColor = selectedTrucks?.color ?? DEFAULT_TRUCK_COLOR;
	const boltColor = selectedBolt?.color ?? DEFAULT_BOLT_COLOR;

	const onCameraControlStart = () => {
		if (
			!cameraControl.current ||
			!floorRef.current ||
			cameraControl.current.colliderMeshes?.length > 0
		) {
			return;
		}

		cameraControl.current.colliderMeshes = [floorRef.current];
	};

	function setCameraControls(target: THREE.Vector3, pos: THREE.Vector3) {
		if (!cameraControl.current) {
			return;
		}

		cameraControl.current.setTarget(target.x, target.y, target.z, true);
		cameraControl.current.setPosition(pos.x, pos.y, pos.z, true);
	}

	useEffect(() => {
		setCameraControls(
			new THREE.Vector3(0, 0.3, 0),
			new THREE.Vector3(1.5, 0.8, 0),
		);
	}, [selectedDeck]);

	useEffect(() => {
		setCameraControls(
			new THREE.Vector3(-0.12, 0.29, 0.57),
			new THREE.Vector3(0.1, 0.25, 0.9),
		);
	}, [selectedTrucks]);

	useEffect(() => {
		setCameraControls(
			new THREE.Vector3(-0.08, 0.54, 0.64),
			new THREE.Vector3(0.09, 1, 0.9),
		);
	}, [selectedWheel]);

	useEffect(() => {
		setCameraControls(
			new THREE.Vector3(-0.25, 0.3, 0.62),
			new THREE.Vector3(-0.5, 0.35, 0.8),
		);
	}, [selectedBolt]);

	return (
		<Canvas
			camera={{
				position: [2.5, 1, 0],
				fov: 50,
			}}
			shadows>
			<Suspense fallback={null}>
				<Environment
					files={'/hdr/warehouse-512.hdr'}
					environmentIntensity={0.8}></Environment>

				<directionalLight
					castShadow
					position={[1, 1, 1]}
					lookAt={[0, 0, 0]}
					intensity={1.5}></directionalLight>

				<fog attach="fog" args={[ENVIROMENT_COLOR, 4, 10]}></fog>
				<color attach="background" args={[ENVIROMENT_COLOR]}></color>

				<StageFloor></StageFloor>
				<mesh
					rotation={[-Math.PI / 2, 0, 0]}
					ref={floorRef}
					visible={false}>
					<planeGeometry args={[6, 6]}></planeGeometry>
					<meshBasicMaterial></meshBasicMaterial>
				</mesh>

				<Skateboard
					wheelTextureURLs={wheelTextureURLs}
					deckTextureURLs={deckTextureURLs}
					wheelTextureURL={wheelTextureURL}
					deckTextureURL={deckTextureURL}
					truckColor={truckColor}
					boltColor={boltColor}
					pose="side"></Skateboard>

				<CameraControls
					ref={cameraControl}
					minDistance={0.2}
					maxDistance={4}
					onStart={onCameraControlStart}></CameraControls>
			</Suspense>
			<Preload all></Preload>
		</Canvas>
	);
}

function StageFloor() {
	const normalMap = useTexture('/concrete-normal.avif');
	normalMap.wrapS = THREE.RepeatWrapping;
	normalMap.wrapT = THREE.RepeatWrapping;
	normalMap.repeat.set(30, 30);
	normalMap.anisotropy = 8;
	const material = new THREE.MeshStandardMaterial({
		roughness: 0.75,
		color: ENVIROMENT_COLOR,
		normalMap: normalMap,
	});
	return (
		<mesh
			castShadow
			receiveShadow
			position={[0, -0.005, 0]}
			rotation={[-Math.PI / 2, 0, 0]}
			material={material}>
			<circleGeometry args={[20, 32]}></circleGeometry>
		</mesh>
	);
}
