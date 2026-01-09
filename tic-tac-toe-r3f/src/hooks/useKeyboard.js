import { useState, useEffect } from 'react'

export function useKeyboard() {
	const [keys, setKeys] = useState({})

	useEffect(() => {
		const handleDown = e => setKeys(k => ({ ...k, [e.code]: true }))
		const handleUp = e => setKeys(k => ({ ...k, [e.code]: false }))

		window.addEventListener('keydown', handleDown)
		window.addEventListener('keyup', handleUp)

		return () => {
			window.removeEventListener('keydown', handleDown)
			window.removeEventListener('keyup', handleUp)
		}
	}, [])

	return keys
}
