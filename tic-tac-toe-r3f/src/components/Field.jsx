
import { FIELD_SIZE } from '../utils/constants'

const Field = ({ value, position }) => {
	return (
		<group position={position}>
			{/* Podstawa pola */}
			<mesh receiveShadow position={[0, -0.1, 0]}>
				<boxGeometry args={[FIELD_SIZE - 0.1, 0.2, FIELD_SIZE - 0.1]} />
				<meshStandardMaterial color={value ? (value === 'X' ? '#ccc' : '#444') : 'white'} />
			</mesh>

			{/* Znacznik X */}
			{value === 'X' && (
				<mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
					<boxGeometry args={[0.2, 1.2, 0.2]} />
					<meshStandardMaterial color='blue' />
					<mesh rotation={[0, 0, Math.PI / 2]}>
						<boxGeometry args={[0.2, 1.2, 0.2]} />
						<meshStandardMaterial color='blue' />
					</mesh>
				</mesh>
			)}

			{/* Znacznik O */}
			{value === 'O' && (
				<mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
					<torusGeometry args={[0.4, 0.1, 8, 20]} />
					<meshStandardMaterial color='red' />
				</mesh>
			)}
		</group>
	)
}

export default Field
