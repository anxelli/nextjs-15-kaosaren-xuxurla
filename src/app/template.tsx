'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
	CirclesRandom,
	CirclesRandomTime,
	Circles,
	CirclesTime
} from '@/components/transitions/circles'

// 🔥 Tipos válidos para transiciones
type CircleVariant =
	| 'center'
	| 'topCenter'
	| 'topLeft'
	| 'topRight'
	| 'bottomCenter'
	| 'bottomLeft'
	| 'bottomRight'

type TransitionStyle = `circles-${'random' | CircleVariant}`

// 🔥 Control central de transiciones
const TRANSITIONS_ENABLED = true
const TRANSITION_FADEIN = false
const TRANSITION_STYLE: TransitionStyle = 'circles-random'

export default function Template({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	if (!TRANSITIONS_ENABLED) return <>{children}</>

	let TransitionEffect: React.FC | null = null
	let TransitionTime = 300

	const [type, variant] = TRANSITION_STYLE.split('-') as [
		'circles',
		'random' | CircleVariant
	]

	switch (type) {
		case 'circles':
			if (variant === 'random') {
				TransitionEffect = CirclesRandom
				TransitionTime = CirclesRandomTime
			} else {
				// eslint-disable-next-line react/display-name
				TransitionEffect = () => <Circles position={variant} />
				TransitionTime = CirclesTime
			}
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
