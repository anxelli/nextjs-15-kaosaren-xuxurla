'use client'

import { motion } from 'motion/react'
import { useEffect, useState, CSSProperties } from 'react'

const spikeBaseStyle =
	'absolute pointer-events-none translate-x-[-50%] translate-y-[-50%]'

type SpikePosition =
	| 'center'
	| 'topCenter'
	| 'topLeft'
	| 'topRight'
	| 'bottomCenter'
	| 'bottomLeft'
	| 'bottomRight'

const positions: Record<SpikePosition, CSSProperties> = {
	center: { top: '50%', left: '50%' },
	topCenter: { top: '0%', left: '50%' },
	topLeft: { top: '0%', left: '0%' },
	topRight: { top: '0%', left: '100%' },
	bottomCenter: { top: '100%', left: '50%' },
	bottomLeft: { top: '100%', left: '0%' },
	bottomRight: { top: '100%', left: '100%' }
}

const SpikeSVG = ({ className }: { className: string }) => (
	<svg
		className={`w-full h-full ${className}`}
		viewBox="0 0 120 120"
		fill="currentColor"
	>
		<path
			d="
		M60,5
		L66,26
		L80,16
		L74,36
		L95,30
		L82,46
		L105,45
		L86,60
		L105,75
		L82,74
		L95,90
		L74,84
		L80,104
		L66,94
		L60,115
		L54,94
		L40,104
		L46,84
		L25,90
		L38,74
		L15,75
		L34,60
		L15,45
		L38,46
		L25,30
		L46,36
		L40,16
		L54,26
		L60,5
		Z
	"
		/>
	</svg>
)

const SPIKE_ROTATION_DEG = 0

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
							rotate: SPIKE_ROTATION_DEG
					  }
			}
			transition={{
				duration: 0.5,
				delay: startExit ? delayOut : delayIn,
				ease: 'easeInOut'
			}}
			className={`${spikeBaseStyle} ${className}`}
			style={pos}
		>
			<SpikeSVG className={className} />
		</motion.div>
	)
}

export const SpikesTime = 2100
export const Spikes = ({
	position,
	image
}: {
	position: SpikePosition
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

export const SpikesRandomTime = 2100
export const SpikesRandom = ({ image }: { image?: string }) => {
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
