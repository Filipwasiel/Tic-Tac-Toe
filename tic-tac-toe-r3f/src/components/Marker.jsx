import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const Marker = ({ color }) => {
	const ref = useRef()

	useFrame(state => {
		if (ref.current) {
			const t = state.clock.elapsedTime
			ref.current.rotation.y = t * 2
			ref.current.position.y = 2.8 + Math.sin(t * 3) * 0.1
		}
	})

	return (
		<group ref={ref}>
			<mesh position={[0, 0.25, 0]}>
				<coneGeometry args={[0.15, 0.5, 6]} />
				<meshStandardMaterial
					color={color}
					emissive={color}
					emissiveIntensity={0.5}
					roughness={0.1}
					metalness={0.1}
					transparent
					opacity={0.9}
				/>
			</mesh>
			<mesh position={[0, -0.25, 0]} rotation={[Math.PI, 0, 0]}>
				<coneGeometry args={[0.15, 0.5, 6]} />
				<meshStandardMaterial
					color={color}
					emissive={color}
					emissiveIntensity={0.5}
					roughness={0.1}
					metalness={0.1}
					transparent
					opacity={0.9}
				/>
			</mesh>
		</group>
	)
}

export default Marker
