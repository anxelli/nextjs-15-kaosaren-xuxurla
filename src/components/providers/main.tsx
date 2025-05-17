'use client'

import { ViewTransitions } from 'next-view-transitions'
import { ScrollRevealProvider } from './scroll-reveal'

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ScrollRevealProvider />
			<ViewTransitions>{children}</ViewTransitions>
		</>
	)
}
