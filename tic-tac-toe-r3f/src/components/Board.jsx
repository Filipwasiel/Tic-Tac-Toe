import React from 'react'
import Field from './Field'
import { FIELD_SIZE } from '../utils/constants'

const Board = ({ boardState }) => {
	return (
		<group>
			{boardState.map((val, i) => {
				const row = Math.floor(i / 3)
				const col = i % 3
				// Oblicz pozycję na podstawie indeksu
				const x = (col - 1) * FIELD_SIZE
				const z = (row - 1) * FIELD_SIZE
				return <Field key={i} value={val} position={[x, 0.75, z]} />
			})}
			{/* Dekoracyjna podstawa pod całą planszą */}
			<mesh position={[0, 0.25, 0]} receiveShadow>
				<boxGeometry args={[7, 0.5, 7]} />
				<meshStandardMaterial color='#222' />
			</mesh>
		</group>
	)
}

export default Board
