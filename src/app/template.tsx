'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
	TransitionCircles,
	TransitionDuration
} from '@/components/transitions/circles'

const TRANSITIONS_ENABLED = true
const TRANSITION_STYLE = 'circles'
const TRANSITION_FADEIN = false

export default function Template({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()

	if (!TRANSITIONS_ENABLED) return <>{children}</>

	const showCircles = TRANSITION_STYLE === 'circles'

	return (
		<>
			{showCircles && <TransitionCircles key={pathname} />}
			<TransitionGate
				delay={TRANSITION_FADEIN ? TransitionDuration : 300}
			>
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
