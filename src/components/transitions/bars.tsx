'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

const barBaseStyle =
	'absolute top-0 bg-primary shadow-md shadow-background h-screen pointer-events-none'

type BarPosition =
	| 'topLeft'
	| 'topCenter'
	| 'topRight'
	| 'bottomLeft'
	| 'bottomCenter'
	| 'bottomRight'
	| 'center' // clon de topCenter

const BARS_COUNT = 5
const BAR_DELAY = 0.1
const BAR_DURATION = 0.2
const PAUSE_DURATION = 1000

export const BarsTime = 2200
export const BarsRandomTime = 2200

function Bar({
	startExit,
	fromTop,
	delay,
	offsetLeft
}: {
	index: number
	startExit: boolean
	fromTop: boolean
	delay: number
	offsetLeft: string
}) {
	const translateYIn = fromTop ? '-100%' : '100%'
	const translateYOut = fromTop ? '100%' : '-100%'

	return (
		<motion.div
			initial={{ translateY: translateYIn }}
			animate={{
				translateY: startExit ? translateYOut : '0%'
			}}
			transition={{
				delay,
				duration: BAR_DURATION,
				ease: 'easeInOut'
			}}
			className={barBaseStyle}
			style={{
				left: offsetLeft,
				width: `${100 / BARS_COUNT}vw`
			}}
		/>
	)
}

function getOrder(position: BarPosition): number[] {
	switch (position) {
		case 'topLeft':
		case 'bottomLeft':
			return [0, 1, 2, 3, 4]
		case 'topRight':
		case 'bottomRight':
			return [4, 3, 2, 1, 0]
		case 'topCenter':
		case 'bottomCenter':
		case 'center':
		default:
			return [2, 1, 3, 0, 4]
	}
}

function getFromTop(position: BarPosition): boolean {
	return position.startsWith('top') || position === 'center'
}

export const Bars = ({
	position,
	image
}: {
	position: BarPosition
	image?: string
}) => {
	const [startExit, setStartExit] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [visible, setVisible] = useState(true)

	useEffect(() => {
		const entry = setTimeout(() => setStartExit(true), 600 + PAUSE_DURATION)
		const cleanup = setTimeout(() => setVisible(false), BarsTime)
		return () => {
			clearTimeout(entry)
			clearTimeout(cleanup)
		}
	}, [])

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted || !visible) return null

	const order = getOrder(position)
	const fromTop = getFromTop(position)

	return (
		<div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
			{order.map((barIndex, i) => (
				<Bar
					key={`bar-${barIndex}`}
					index={barIndex}
					startExit={startExit}
					fromTop={fromTop}
					delay={i * BAR_DELAY}
					offsetLeft={`${barIndex * 20}vw`}
				/>
			))}

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

export const BarsRandom = ({ image }: { image?: string }) => {
	const [startExit, setStartExit] = useState(false)
	const [mounted, setMounted] = useState(false)
	const [visible, setVisible] = useState(true)

	useEffect(() => {
		const entry = setTimeout(() => setStartExit(true), 600 + PAUSE_DURATION)
		const cleanup = setTimeout(() => setVisible(false), BarsRandomTime)
		return () => {
			clearTimeout(entry)
			clearTimeout(cleanup)
		}
	}, [])

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted || !visible) return null

	const bars = Array.from({ length: BARS_COUNT }).map((_, i) => ({
		fromTop: Math.random() > 0.5,
		offsetLeft: `${i * 20}vw`,
		delay: i * BAR_DELAY
	}))

	return (
		<div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
			{bars.map((bar, i) => (
				<Bar
					key={`rand-bar-${i}`}
					index={i}
					startExit={startExit}
					fromTop={bar.fromTop}
					delay={bar.delay}
					offsetLeft={bar.offsetLeft}
				/>
			))}

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
