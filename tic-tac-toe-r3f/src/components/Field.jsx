import { useEffect, useRef } from 'react'
import { FIELD_SIZE } from '../utils/constants'
import gsap from 'gsap'

const Field = ({ value, position }) => {
	const xRef = useRef()
	const oRef = useRef()

	useEffect(() => {
		if (value === 'X' && xRef.current) {
			gsap.from(xRef.current.scale, {
				x: 0,
				y: 0,
				z: 0,
				duration: 1.2,
				ease: 'bounce.out(1.7)',
			})
		} else if (value === 'O' && oRef.current) {
			gsap.from(oRef.current.scale, {
				x: 0,
				y: 0,
				z: 0,
				duration: 1.2,
				ease: 'bounce.out(1.7)',
			})
		}
	}, [value])

	return (
		<group position={position}>
			{/* Podstawa pola */}
			<mesh receiveShadow position={[0, -0.1, 0]}>
				<boxGeometry args={[FIELD_SIZE - 0.1, 0.2, FIELD_SIZE - 0.1]} />
				<meshStandardMaterial color={value ? (value === 'X' ? '#999' : '#444') : 'white'} />
			</mesh>

			{/* Znacznik X */}
			{value === 'X' && (
				<group ref={xRef} position={[0, 0, 0]}>
					<mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
						<boxGeometry args={[0.2, 1.2, 0.2]} />
						<meshStandardMaterial color='blue' />
						<mesh rotation={[0, 0, Math.PI / 2]}>
							<boxGeometry args={[0.2, 1.2, 0.2]} />
							<meshStandardMaterial color='blue' />
						</mesh>
					</mesh>
				</group>
			)}

			{/* Znacznik O */}
			{value === 'O' && (
				<mesh ref={oRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
					<torusGeometry args={[0.5, 0.1, 8, 20]} />
					<meshStandardMaterial color='red' />
				</mesh>
			)}
		</group>
	)
}

export default Field
