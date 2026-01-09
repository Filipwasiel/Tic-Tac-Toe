import { useEffect, useRef, useState, useMemo } from 'react'
import { useFrame, useGraph, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import { useKeyboard } from '../hooks/useKeyboard'
import { PLAYER_SPEED, JUMP_FORCE, BODY_PARTS } from '../utils/constants'
import Marker from './Marker'

const Player = ({ position, color, controls, isActive, onLand }) => {
	const { scene } = useThree()
	const groupRef = useRef()
	const modelRef = useRef()

	const keys = useKeyboard()

	const raycaster = useRef(new THREE.Raycaster())
	const downVector = useRef(new THREE.Vector3(0, -1, 0))

	const velocityY = useRef(0)
	const isJumping = useRef(false)
	const pos = useRef(new THREE.Vector3(...position))

	const [moving, setMoving] = useState(false)
	const [jumping, setJumping] = useState(false)

	const { scene: gltfScene, animations } = useGLTF('/AnimatedRobot.glb')

	const clone = useMemo(() => SkeletonUtils.clone(gltfScene), [gltfScene])
	const { nodes } = useGraph(clone)
	const { actions } = useAnimations(animations, modelRef)

	useEffect(() => {
		clone.traverse(child => {
			if (child.isMesh) {
				child.material = child.material.clone()
				if (BODY_PARTS.includes(child.name) && child.material) {
					child.material.color.set(color)
				}
			}
		})
	}, [clone, color])

	useEffect(() => {
		const idleAction = actions['RobotArmature|Robot_Idle']
		const walkAction = actions['RobotArmature|Robot_Walking']
		const jumpAction = actions['RobotArmature|Robot_Jump']

		let nextAction = idleAction

		if (jumping && jumpAction) {
			nextAction = jumpAction
		} else if (moving && walkAction) {
			nextAction = walkAction
		}

		if (nextAction) {
			nextAction.reset().fadeIn(0.2).play()
		}

		return () => {
			if (nextAction) {
				nextAction.fadeOut(0.2)
			}
		}
	}, [moving, jumping, actions])

	useEffect(() => {
		pos.current.set(...position)
		velocityY.current = 0
		isJumping.current = false
		setJumping(false)
		if (groupRef.current) {
			groupRef.current.position.copy(pos.current)
			groupRef.current.rotation.y = 0
		}
	}, [position])

	useFrame((state, delta) => {
		if (!groupRef.current) return

		let moveX = 0
		let moveZ = 0
		const moveSpeed = PLAYER_SPEED * delta

		if (keys[controls.up]) moveZ -= moveSpeed
		if (keys[controls.down]) moveZ += moveSpeed
		if (keys[controls.left]) moveX -= moveSpeed
		if (keys[controls.right]) moveX += moveSpeed

		pos.current.x += moveX
		pos.current.z += moveZ

		const isMovingNow = moveX !== 0 || moveZ !== 0
		if (isMovingNow !== moving) {
			setMoving(isMovingNow)
		}

		if (isMovingNow) {
			const angle = Math.atan2(moveX, moveZ)
			modelRef.current.rotation.y = angle
		}

		const rayOrigin = new THREE.Vector3(pos.current.x, pos.current.y + 1, pos.current.z)
		raycaster.current.set(rayOrigin, downVector.current)
		const intersects = raycaster.current.intersectObjects(scene.children, true)

		const validHits = intersects.filter(hit => {
			let isSelf = false
			hit.object.traverseAncestors(ancestor => {
				if (ancestor === groupRef.current) {
					isSelf = true
				}
			})
			return !isSelf && hit.object !== groupRef.current
		})

		let groundHeight = -Infinity
		if (validHits.length > 0) {
			groundHeight = validHits[0].point.y
		}

		// // Granice mapy
		// pos.current.x = Math.max(-3.5, Math.min(3.5, pos.current.x))
		// pos.current.z = Math.max(-3.5, Math.min(3.5, pos.current.z))

		// Logika skoku
		if (keys[controls.jump] && !isJumping.current) {
			isJumping.current = true
			setJumping(true)
			velocityY.current = JUMP_FORCE
		}

		// Grawitacja
		pos.current.y += velocityY.current * delta
		velocityY.current -= 13 * delta
		if (velocityY.current < 0 && pos.current.y <= groundHeight) {
			pos.current.y = groundHeight
			velocityY.current = 0
			if (isJumping.current) {
				if (isActive) {
					onLand(pos.current.x, pos.current.z)
				}

				isJumping.current = false
				setJumping(false)
			}
		}

		if (pos.current.y < -20) {
			pos.current.set(...position)
			velocityY.current = 0
			isJumping.current = false
			setJumping(false)
		}

		groupRef.current.position.copy(pos.current)
	})

	return (
		<group ref={groupRef} position={position} dispose={null}>
			<primitive ref={modelRef} object={clone} scale={0.5} position={[0, 0, 0]} />
			{isActive && <Marker color='lime' />}
		</group>
	)
}

useGLTF.preload('/AnimatedRobot.glb')

export default Player
