'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
	CirclesRandom,
	CirclesRandomTime,
	Circles,
	CirclesTime
} from '@/components/transitions/circles'
import {
	SquaresRandom,
	SquaresRandomTime,
	Squares,
	SquaresTime
} from '@/components/transitions/squares'
import {
	StarsRandom,
	StarsRandomTime,
	Stars,
	StarsTime
} from '@/components/transitions/stars'
import {
	TrianglesRandom,
	TrianglesRandomTime,
	Triangles,
	TrianglesTime
} from '@/components/transitions/triangles'
import {
	SpikesRandom,
	SpikesRandomTime,
	Spikes,
	SpikesTime
} from '@/components/transitions/spikes'
import {
	BarsRandom,
	BarsRandomTime,
	Bars,
	BarsTime
} from '@/components/transitions/bars'

import { Corruption, CorruptionTime } from '@/components/transitions/corruption'

// Tipos válidos para posiciones
type ShapePosition =
	| 'center'
	| 'topCenter'
	| 'topLeft'
	| 'topRight'
	| 'bottomCenter'
	| 'bottomLeft'
	| 'bottomRight'

// Tipos válidos para TRANSITION_STYLE
type TransitionStyle =
	| `circles-${'random' | ShapePosition}`
	| `squares-${'random' | ShapePosition}`
	| `stars-${'random' | ShapePosition}`
	| `triangles-${'random' | ShapePosition}`
	| `spikes-${'random' | ShapePosition}`
	| `bars-${'random' | ShapePosition}`
	| 'corruption' // Sin posición, usa FadeIn true

//! 🔥 Configuración de la transición
const TRANSITIONS_ENABLED = true
const TRANSITION_FADEIN = false // Recomendado activar para transiciones sin posición
const TRANSITION_STYLE: TransitionStyle = 'circles-random'
const TRANSITION_IMAGE = '/chibyxia-shh.png'
//! 🔥 Configuración de la transición

// Configuración de la transición
export default function Template({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	if (!TRANSITIONS_ENABLED) return <>{children}</>

	let TransitionEffect: React.FC | null = null
	let TransitionTime = 300

	const [type, variant] = TRANSITION_STYLE.split('-') as [
		(
			| 'circles'
			| 'squares'
			| 'stars'
			| 'triangles'
			| 'spikes'
			| 'bars'
			| 'corruption'
		),
		'random' | ShapePosition
	]

	switch (type) {
		case 'circles':
			if (variant === 'random') {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => (
					<CirclesRandom image={TRANSITION_IMAGE} />
				)
				TransitionTime = CirclesRandomTime
			} else {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => (
					<Circles position={variant} image={TRANSITION_IMAGE} />
				)
				TransitionTime = CirclesTime
			}
			break

		case 'squares':
			if (variant === 'random') {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => (
					<SquaresRandom image={TRANSITION_IMAGE} />
				)
				TransitionTime = SquaresRandomTime
			} else {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => (
					<Squares position={variant} image={TRANSITION_IMAGE} />
				)
				TransitionTime = SquaresTime
			}
			break

		case 'stars':
			if (variant === 'random') {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => (
					<StarsRandom image={TRANSITION_IMAGE} />
				)
				TransitionTime = StarsRandomTime
			} else {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => (
					<Stars position={variant} image={TRANSITION_IMAGE} />
				)
				TransitionTime = StarsTime
			}
			break

		case 'triangles':
			if (variant === 'random') {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => (
					<TrianglesRandom image={TRANSITION_IMAGE} />
				)
				TransitionTime = TrianglesRandomTime
			} else {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => (
					<Triangles position={variant} image={TRANSITION_IMAGE} />
				)
				TransitionTime = TrianglesTime
			}
			break

		case 'spikes':
			if (variant === 'random') {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => (
					<SpikesRandom image={TRANSITION_IMAGE} />
				)
				TransitionTime = SpikesRandomTime
			} else {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => (
					<Spikes position={variant} image={TRANSITION_IMAGE} />
				)
				TransitionTime = SpikesTime
			}
			break

		case 'bars':
			if (variant === 'random') {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => <BarsRandom image={TRANSITION_IMAGE} />
				TransitionTime = BarsRandomTime
			} else {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => (
					<Bars position={variant} image={TRANSITION_IMAGE} />
				)
				TransitionTime = BarsTime
			}
			break

		case 'corruption':
			// eslint-disable-next-line react/display-name
			TransitionEffect = () => <Corruption image={TRANSITION_IMAGE} />
			TransitionTime = CorruptionTime
			break
	}

	return (
		<>
			{TransitionEffect && <TransitionEffect key={pathname} />}
			<TransitionGate delay={TRANSITION_FADEIN ? TransitionTime : 300}>
				{children}
			</TransitionGate>
		</>
	)
}

function TransitionGate({
	children,
	delay
}: {
	children: React.ReactNode
	delay: number
}) {
	const [show, setShow] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setShow(true), delay)
		return () => clearTimeout(timer)
	}, [delay])

	return (
		<div
			style={{
				display: 'block',
				opacity: show ? 1 : 0,
				transition: 'opacity 0.3s ease-in-out'
			}}
		>
			{children}
		</div>
	)
}
