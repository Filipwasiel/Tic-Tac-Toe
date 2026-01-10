import { OrbitControls } from '@react-three/drei'
import Board from './Board'
import Player from './Player'

// Ten komponent grupuje wszystko co dzieje się wewnątrz Canvas
const GameScene = ({ board, turn, onAttemptMark, positions }) => {
	return (
		<>
			<color attach='background' args={['#202025']} />

			<ambientLight intensity={0.5} />
			<directionalLight position={[5, 10, 5]} intensity={1} castShadow />
{/*
			<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
				<planeGeometry args={[100, 100]} />
				<meshStandardMaterial color='#f6d7b0' />
			</mesh> */}

			<Board boardState={board} />

			<Player
				position={positions[0]}
				color='#4da6ff'
				controls={{ up: 'KeyW', down: 'KeyS', left: 'KeyA', right: 'KeyD', jump: 'Space', run: 'ShiftLeft' }}
				isActive={turn === 'X'}
				onLand={turn === 'X' ? onAttemptMark : () => {}}
			/>

			<Player
				position={positions[1]}
				color='#ff4d4d'
				controls={{ up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight', jump: 'Enter', run: 'ShiftRight' }}
				isActive={turn === 'O'}
				onLand={turn === 'O' ? onAttemptMark : () => {}}
			/>

			<OrbitControls enableZoom={true} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 3} />
		</>
	)
}

export default GameScene
