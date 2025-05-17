import './globals.css'
import Script from 'next/script'
import type { Metadata } from 'next'
import { WithContext, WebSite, Organization } from 'schema-dts'
// import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { MainProvider } from '@/components/providers/main'

import {
	Montserrat as FontSans,
	Audiowide as FontDisplay
} from 'next/font/google'
const fontSans = FontSans({
	subsets: ['latin'],
	weight: 'variable',
	variable: '--font-sans'
})
const fontDisplay = FontDisplay({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-display'
})

export const metadata: Metadata = {
	title: 'Anxelli & Nyxia',
	description: 'El susurro del caos, quebrantando el orden celestial.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const organizationSchema: WithContext<Organization> = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': 'https://anxelli.dev/#organization',
		name: 'Anxelli & Nyxia',
		url: 'https://anxelli.dev',
		logo: {
			'@type': 'ImageObject',
			url: 'https://anxelli.dev/favicon.png'
		},
		contactPoint: {
			'@type': 'ContactPoint',
			telephone: '+525515849853',
			contactType: 'customer service'
		}
	}
	const websiteSchema: WithContext<WebSite> = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': 'https://anxelli.dev/#website',
		url: 'https://anxelli.dev',
		name: 'Anxelli & Nyxia',
		publisher: { '@id': 'https://anxelli.dev/#organization' }
	}

	return (
		<>
			<Script
				id="organization-ld"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(organizationSchema)
				}}
			/>
			<Script
				id="website-ld"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(websiteSchema)
				}}
			/>

			<html lang="es-MX" suppressHydrationWarning={true}>
				{/* <GoogleTagManager gtmId="GTM-TTRCF5GM" /> */}

				<MainProvider>
					<body
						className={`${fontDisplay.variable} ${fontSans.variable} antialiased`}
					>
						<div>{children}</div>

						<SpeedInsights />
						<Analytics />
					</body>
				</MainProvider>
			</html>
		</>
	)
}
