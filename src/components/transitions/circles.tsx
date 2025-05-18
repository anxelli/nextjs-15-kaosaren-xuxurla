'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const circleBaseStyle =
	'absolute rounded-full w-[0px] h-[0px] pointer-events-none translate-x-[-50%] translate-y-[-50%]'

type CirclePosition =
	| 'center'
	| 'topCenter'
	| 'topLeft'
	| 'topRight'
	| 'bottomCenter'
	| 'bottomLeft'
	| 'bottomRight'

export const CirclesTime = 2100
export const Circles = ({ position }: { position: CirclePosition }) => {
	const [startExit, setStartExit] = useState(false)
	const [visible, setVisible] = useState(true)
	const [mounted, setMounted] = useState(false)

	const positions = {
		center: { top: '50%', left: '50%' },
		topCenter: { top: '0%', left: '50%' },
		topLeft: { top: '0%', left: '0%' },
		topRight: { top: '0%', left: '100%' },
		bottomCenter: { top: '100%', left: '50%' },
		bottomLeft: { top: '100%', left: '0%' },
		bottomRight: { top: '100%', left: '100%' }
	}

	const selected = positions[position] || positions.center

	const [pos1] = useState(selected)
	const [pos2] = useState(selected)
	const [pos3] = useState(selected)

	useEffect(() => {
		const entry = setTimeout(() => setStartExit(true), 1000)
		const cleanup = setTimeout(() => setVisible(false), 2100)
		return () => {
			clearTimeout(entry)
			clearTimeout(cleanup)
		}
	}, [])

	// Esperar al montaje en cliente para evitar hydration mismatch
	useEffect(() => {
		setMounted(true)
	}, [])

	// Bloquear render hasta estar montado en cliente
	if (!mounted) return null
	if (!visible) return null

	return (
		<div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
			<motion.div
				initial={{ width: 0, height: 0 }}
				animate={
					startExit
						? { width: 0, height: 0 }
						: { width: '300vw', height: '300vw' }
				}
				transition={{
					duration: 0.5,
					delay: startExit ? 0.6 : 0,
					ease: 'easeInOut'
				}}
				className={`${circleBaseStyle} bg-primary`}
				style={pos1}
			/>

			<motion.div
				initial={{ width: 0, height: 0 }}
				animate={
					startExit
						? { width: 0, height: 0 }
						: { width: '300vw', height: '300vw' }
				}
				transition={{
					duration: 0.5,
					delay: startExit ? 0.3 : 0.3,
					ease: 'easeInOut'
				}}
				className={`${circleBaseStyle} bg-secondary`}
				style={pos2}
			/>

			<motion.div
				initial={{ width: 0, height: 0 }}
				animate={
					startExit
						? { width: 0, height: 0 }
						: { width: '300vw', height: '300vw' }
				}
				transition={{
					duration: 0.5,
					delay: startExit ? 0 : 0.6,
					ease: 'easeInOut'
				}}
				className={`${circleBaseStyle} bg-background`}
				style={pos3}
			/>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: startExit ? 0 : 1 }}
				transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}
				className="absolute inset-0 z-60 flex items-center justify-center"
			>
				<div className="w-[512px] max-w-full px-4">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/chibyxia-shh.png"
						alt="Logo"
						className="w-full h-auto"
					/>
				</div>
			</motion.div>
		</div>
	)
}

export const CirclesRandomTime = 2100
export const CirclesRandom = () => {
	const [startExit, setStartExit] = useState(false)
	const [visible, setVisible] = useState(true)
	const [mounted, setMounted] = useState(false)

	const generatePosition = () => ({
		top: `${Math.random() * 80 + 10}%`,
		left: `${Math.random() * 80 + 10}%`
	})

	const [pos1] = useState(generatePosition)
	const [pos2] = useState(generatePosition)
	const [pos3] = useState(generatePosition)

	useEffect(() => {
		const entry = setTimeout(() => setStartExit(true), 1000)
		const cleanup = setTimeout(() => setVisible(false), 2100)
		return () => {
			clearTimeout(entry)
			clearTimeout(cleanup)
		}
	}, [])

	// Esperar al montaje en cliente para evitar hydration mismatch
	useEffect(() => {
		setMounted(true)
	}, [])

	// Bloquear render hasta estar montado en cliente
	if (!mounted) return null
	if (!visible) return null

	return (
		<div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
			<motion.div
				initial={{ width: 0, height: 0 }}
				animate={
					startExit
						? { width: 0, height: 0 }
						: { width: '300vw', height: '300vw' }
				}
				transition={{
					duration: 0.5,
					delay: startExit ? 0.6 : 0,
					ease: 'easeInOut'
				}}
				className={`${circleBaseStyle} bg-primary`}
				style={pos1}
			/>

			<motion.div
				initial={{ width: 0, height: 0 }}
				animate={
					startExit
						? { width: 0, height: 0 }
						: { width: '300vw', height: '300vw' }
				}
				transition={{
					duration: 0.5,
					delay: startExit ? 0.3 : 0.3,
					ease: 'easeInOut'
				}}
				className={`${circleBaseStyle} bg-secondary`}
				style={pos2}
			/>

			<motion.div
				initial={{ width: 0, height: 0 }}
				animate={
					startExit
						? { width: 0, height: 0 }
						: { width: '300vw', height: '300vw' }
				}
				transition={{
					duration: 0.5,
					delay: startExit ? 0 : 0.6,
					ease: 'easeInOut'
				}}
				className={`${circleBaseStyle} bg-background`}
				style={pos3}
			/>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: startExit ? 0 : 1 }}
				transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}
				className="absolute inset-0 z-60 flex items-center justify-center"
			>
				<div className="w-[512px] max-w-full px-4">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="/chibyxia-shh.png"
						alt="Logo"
						className="w-full h-auto"
					/>
				</div>
			</motion.div>
		</div>
	)
}
