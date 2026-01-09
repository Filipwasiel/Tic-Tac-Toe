import { FIELD_SIZE } from './constants'

// Zamiana pozycji 3D (x, z) na indeks tablicy (0-8)
export const getIndexFromPos = (x, z) => {
	// Zakładamy, że pola są rozmieszczone od -3 do +3
	let col = -1
	let row = -1

	// Zakresy dla kolumn (X)
	if (x > -3 && x < -1) col = 0
	else if (x > -1 && x < 1) col = 1
	else if (x > 1 && x < 3) col = 2

	// Zakresy dla wierszy (Z)
	if (z > -3 && z < -1) row = 0
	else if (z > -1 && z < 1) row = 1
	else if (z > 1 && z < 3) row = 2

	if (col !== -1 && row !== -1) {
		return row * 3 + col
	}
	return -1
}

// Sprawdzanie zwycięzcy
export const checkWinner = squares => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8], // Poziomo
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8], // Pionowo
		[0, 4, 8],
		[2, 4, 6], // Przekątne
	]

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i]
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a] // Zwraca 'X' lub 'O'
		}
	}
	if (!squares.includes(null)) return 'Draw'
	return null
}
