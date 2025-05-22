'use client'

import { motion } from 'motion/react'
import { useEffect, useState, CSSProperties } from 'react'

const starBaseStyle =
	'absolute pointer-events-none translate-x-[-50%] translate-y-[-50%]'

type StarPosition =
	| 'center'
	| 'topCenter'
	| 'topLeft'
	| 'topRight'
	| 'bottomCenter'
	| 'bottomLeft'
	| 'bottomRight'

const positions: Record<StarPosition, CSSProperties> = {
	center: { top: '50%', left: '50%' },
	topCenter: { top: '0%', left: '50%' },
	topLeft: { top: '0%', left: '0%' },
	topRight: { top: '0%', left: '100%' },
	bottomCenter: { top: '100%', left: '50%' },
	bottomLeft: { top: '100%', left: '0%' },
	bottomRight: { top: '100%', left: '100%' }
}

const StarSVG = ({ className }: { className: string }) => (
	<svg
		className={`w-full h-full ${className}`}
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M12 2L14.9 8.6L22 9.2L16.5 13.8L18.4 21L12 17.3L5.6 21L7.5 13.8L2 9.2L9.1 8.6L12 2Z" />
	</svg>
)

const STAR_ROTATION_DEG = 180

function getMotion(
	pos: CSSProperties,
	delayIn: number,
	delayOut: number,
	className: string,
	startExit: boolean
) {
	return (
		<motion.div
			initial={{ width: 0, height: 0, rotate: 0 }}
			animate={
				startExit
					? { width: 0, height: 0, rotate: 0 }
					: {
							width: '500vw',
							height: '500vw',
							rotate: STAR_ROTATION_DEG
					  }
			}
			transition={{
				duration: 0.5,
				delay: startExit ? delayOut : delayIn,
				ease: 'easeInOut'
			}}
			className={`${starBaseStyle} ${className}`}
			style={pos}
		>
			<StarSVG className={className} />
		</motion.div>
	)
}

export const StarsTime = 2100
export const Stars = ({
	position,
	image
}: {
	position: StarPosition
	image?: string
}) => {
	const [startExit, setStartExit] = useState(false)
	const [visible, setVisible] = useState(true)
	const [mounted, setMounted] = useState(false)

	const selected = positions[position]

	useEffect(() => {
		const entry = setTimeout(() => setStartExit(true), 1000)
		const cleanup = setTimeout(() => setVisible(false), 2100)
		return () => {
			clearTimeout(entry)
			clearTimeout(cleanup)
		}
	}, [])

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted || !visible) return null

	return (
		<div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
			{getMotion(selected, 0, 0.6, 'fill-primary', startExit)}
			{getMotion(selected, 0.3, 0.3, 'fill-secondary', startExit)}
			{getMotion(selected, 0.6, 0, 'fill-background', startExit)}

			{image && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: startExit ? 0 : 1 }}
					transition={{
						delay: 0.2,
						duration: 0.6,
						ease: 'easeInOut'
					}}
					className="absolute inset-0 z-50 flex items-center justify-center"
				>
					<div className="w-[512px] max-w-full px-4">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={image} alt="Logo" className="w-full h-auto" />
					</div>
				</motion.div>
			)}
		</div>
	)
}

export const StarsRandomTime = 2100
export const StarsRandom = ({ image }: { image?: string }) => {
	const [startExit, setStartExit] = useState(false)
	const [visible, setVisible] = useState(true)
	const [mounted, setMounted] = useState(false)

	const generatePosition = (): CSSProperties => ({
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

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted || !visible) return null

	return (
		<div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
			{getMotion(pos1, 0, 0.6, 'fill-primary', startExit)}
			{getMotion(pos2, 0.3, 0.3, 'fill-secondary', startExit)}
			{getMotion(pos3, 0.6, 0, 'fill-background', startExit)}

			{image && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: startExit ? 0 : 1 }}
					transition={{
						delay: 0.2,
						duration: 0.6,
						ease: 'easeInOut'
					}}
					className="absolute inset-0 z-50 flex items-center justify-center"
				>
					<div className="w-[512px] max-w-full px-4">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={image} alt="Logo" className="w-full h-auto" />
					</div>
				</motion.div>
			)}
		</div>
	)
}
