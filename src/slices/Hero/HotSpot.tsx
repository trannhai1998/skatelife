import { Billboard } from '@react-three/drei';
import React, { useRef } from 'react';
import * as THREE from 'three';

type HotSpotProps = {
	position: [number, number, number];
	isVisible: boolean;
	color?: string;
};

export default function HotSpot({
	position,
	isVisible,
	color = '#E6FC6A',
}: HotSpotProps) {
	const hotspotRef = useRef<THREE.Mesh>(null);
	return (
		<Billboard position={position} follow={true}>
			<mesh
				ref={hotspotRef}
				visible={isVisible}
				onPointerOver={() => {
					document.body.style.cursor = 'pointer';
				}}
				onPointerOut={() => {
					document.body.style.cursor = 'default';
				}}>
				<circleGeometry args={[0.02, 32]}></circleGeometry>
				<meshStandardMaterial
					color={color}
					transparent
					opacity={1}></meshStandardMaterial>
			</mesh>
		</Billboard>
	);
}
