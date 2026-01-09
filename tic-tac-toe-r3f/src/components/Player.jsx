import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useKeyboard } from '../hooks/useKeyboard'
import { PLAYER_SPEED, JUMP_FORCE } from '../utils/constants'

const Player = ({ position, color, controls, isActive, onLand }) => {
	const ref = useRef()
	const keys = useKeyboard()

	const velocityY = useRef(0)
	const isJumping = useRef(false)
	const pos = useRef(new THREE.Vector3(...position))

	useEffect(() => {
		pos.current.set(...position)
		velocityY.current = 0
		isJumping.current = false
		if (ref.current) {
			ref.current.position.copy(pos.current)
		}
	}, [position])

	useFrame((state, delta) => {
		if (!ref.current) return

		const moveSpeed = PLAYER_SPEED * delta
		if (keys[controls.up]) pos.current.z -= moveSpeed
		if (keys[controls.down]) pos.current.z += moveSpeed
		if (keys[controls.left]) pos.current.x -= moveSpeed
		if (keys[controls.right]) pos.current.x += moveSpeed

		// Granice mapy
		pos.current.x = Math.max(-3.5, Math.min(3.5, pos.current.x))
		pos.current.z = Math.max(-3.5, Math.min(3.5, pos.current.z))

		// Logika skoku
		if (keys[controls.jump] && !isJumping.current) {
			isJumping.current = true
			velocityY.current = JUMP_FORCE
		}

		// Grawitacja
		if (isJumping.current) {
			pos.current.y += velocityY.current * delta
			velocityY.current -= 20 * delta

			if (pos.current.y <= 0.5) {
				pos.current.y = 0.5

				if (isActive) {
					onLand(pos.current.x, pos.current.z)
				}

				isJumping.current = false
				velocityY.current = 0
			}
		}

		ref.current.position.copy(pos.current)
	})

	return (
		<mesh ref={ref} position={position} castShadow>
			<capsuleGeometry args={[0.3, 0.7, 4, 8]} />
			<meshStandardMaterial color={color} />
			{isActive && (
				<mesh position={[0, 1.2, 0]}>
					<coneGeometry args={[0.1, 0.3, 8]} rotation={[Math.PI, 0, 0]} />
					<meshBasicMaterial color='yellow' />
				</mesh>
			)}
		</mesh>
	)
}

export default Player
