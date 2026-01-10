import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import UI from './components/UI'
import GameScene from './components/GameScene'
import { checkWinner, getIndexFromPos } from './utils/gameLogic'

export default function Game() {
	const [board, setBoard] = useState(Array(9).fill(null))
	const [turn, setTurn] = useState('X')
	const [winner, setWinner] = useState(null)
	const [positions, setPositions] = useState([
		[-6, 0, 0],
		[6, 0, 0],
	])

	const handleAttemptMark = (x, z) => {
		if (winner) return

		const index = getIndexFromPos(x, z)

		if (index !== -1 && board[index] === null) {
			const newBoard = [...board]
			newBoard[index] = turn

			const gameResult = checkWinner(newBoard)

			setBoard(newBoard)

			if (gameResult) {
				setWinner(gameResult)
			} else {
				setTurn(turn === 'X' ? 'O' : 'X')
			}
		}
	}

	const resetGame = () => {
		setBoard(Array(9).fill(null))
		setWinner(null)
		setTurn('X')
		setPositions([
			[-3, 0.5, 0],
			[3, 0.5, 0],
		])
	}

	return (
		<div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
			<UI turn={turn} winner={winner} onReset={resetGame} />

			<Canvas shadows camera={{ position: [0, 8, 8], fov: 50 }}>
				<GameScene board={board} turn={turn} onAttemptMark={handleAttemptMark} positions={positions} />
			</Canvas>
		</div>
	)
}
