import React from 'react'

const UI = ({ turn, winner, onReset }) => {
	const styles = {
		container: {
			position: 'absolute',
			top: 20,
			left: 20,
			zIndex: 10,
			color: 'white',
			fontFamily: 'sans-serif',
			textShadow: '1px 1px 2px black',
		},
		turnText: { color: turn === 'X' ? '#4da6ff' : '#ff4d4d' },
		winText: { fontSize: '2em', color: '#00ff00' },
		button: { padding: '10px 20px', fontSize: '1.2em', cursor: 'pointer', marginTop: '10px' },
	}

	return (
		<div style={styles.container}>
			<h1>Kółko i Krzyżyk 3D</h1>
			{!winner ? (
				<h2>
					Tura gracza:{' '}
					<span style={styles.turnText}>
						{turn === 'X' ? 'Niebieski (WASD + Space)' : 'Czerwony (Strzałki + Enter)'}
					</span>
				</h2>
			) : (
				<div>
					<h2 style={styles.winText}>{winner === 'Draw' ? 'REMIS!' : `WYGRAŁ: ${winner}`}</h2>
					<button onClick={onReset} style={styles.button}>
						Zagraj ponownie
					</button>
				</div>
			)}
		</div>
	)
}

export default UI
