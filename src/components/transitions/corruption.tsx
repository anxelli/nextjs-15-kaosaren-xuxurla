'use client'

import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

const ENTITIES = 24
export const CorruptionTime = 2300

const COLORS = ['bg-primary', 'bg-secondary', 'bg-foreground', 'bg-background']

export const Corruption = ({ image }: { image?: string }) => {
	const [startExit, setStartExit] = useState(false)
	const [visible, setVisible] = useState(true)
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const entry = setTimeout(() => setStartExit(true), 1000)
		const cleanup = setTimeout(() => setVisible(false), CorruptionTime)
		return () => {
			clearTimeout(entry)
			clearTimeout(cleanup)
		}
	}, [])

	useEffect(() => {
		setMounted(true)
	}, [])

	const glitchBlocks = useMemo(() => {
		return Array.from({ length: ENTITIES }).map((_, i) => {
			const width = Math.floor(Math.random() * 4 + 4) // 4vw–8vw
			const left = Math.floor((100 / ENTITIES) * i)
			const delayIn = Math.random() * 0.5
			const delayOut = Math.random() * 0.5
			const duration = 0.3 + Math.random() * 0.3

			const skew =
				Math.random() > 0.5 ? '-skew-x-[10deg]' : 'skew-x-[10deg]'
			const blur = Math.random() > 0.5 ? 'blur-[1px]' : ''
			const saturate = Math.random() > 0.5 ? 'saturate-[1.6]' : ''
			const opacity = Math.random() > 0.5 ? 'opacity-60' : 'opacity-30'
			const zIndex = Math.random() > 0.5 ? 'z-40' : 'z-30'
			const bg = COLORS[Math.floor(Math.random() * COLORS.length)]

			return (
				<motion.div
					key={`glitch-${i}`}
					initial={{ opacity: 0, x: -50 }}
					animate={
						startExit ? { opacity: 0, x: 50 } : { opacity: 1, x: 0 }
					}
					transition={{
						duration,
						delay: startExit ? delayOut + 0.6 : delayIn,
						ease: 'easeInOut'
					}}
					className={`absolute top-0 h-screen ${zIndex} ${opacity} ${blur} ${saturate} ${skew} ${bg}`}
					style={{
						left: `${left}%`,
						width: `${width}vw`
					}}
				/>
			)
		})
	}, [startExit])

	if (!mounted || !visible) return null

	return (
		<div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
			{glitchBlocks}

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
						<img
							src={image}
							alt="Corruption"
							className="w-full h-auto"
						/>
					</div>
				</motion.div>
			)}
		</div>
	)
}
