import { Metadata } from 'next'
// import Link from 'next/link'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import Script from 'next/script'
import { WithContext, WebPage } from 'schema-dts'

//! Metadata
export const metadata: Metadata = {
	title: 'Anxelli & Nyxia',
	description: 'El susurro del caos, quebrantando el orden celestial.',
	keywords: 'no, se, que, lo, arregle, nyxia, despues',
	metadataBase: new URL('https://anxelli.dev/'),
	openGraph: {
		title: 'Anxelli & Nyxia',
		description: 'El susurro del caos, quebrantando el orden celestial.',
		url: 'https://anxelli.dev/',
		images: [
			{
				url: 'https://anxelli.dev/favicon.png',
				width: 1200,
				height: 675,
				alt: 'Kaosaren Xuxurla | Anxelli & Nyxia'
			}
		],
		siteName: 'Anxelli & Nyxia',
		locale: 'es_MX',
		type: 'website'
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Anxelli & Nyxia',
		description: 'El susurro del caos, quebrantando el orden celestial.',
		images: ['https://anxelli.dev/favicon.png']
	}
}

export default function Page() {
	//! Schema + Json-LD
	const webpageSchema: WithContext<WebPage> = {
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		'@id': 'https://anxelli.dev/',
		url: 'https://anxelli.dev/',
		name: 'Anxelli & Nyxia',
		description: 'El susurro del caos, quebrantando el orden celestial.',
		inLanguage: 'es',
		isPartOf: { '@id': 'https://anxelli.dev/#website' },
		publisher: { '@id': 'https://anxelli.dev/#organization' },
		image: {
			'@type': 'ImageObject',
			url: 'https://anxelli.dev/favicon.png'
		}
	}

	const random = Math.floor(Math.random() * 2)
	const image = random % 2 === 0

	return (
		<>
			<Script
				id="webpage-ld"
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(webpageSchema)
				}}
			/>

			<nav className="w-full top-0 bg-white py-2 mb-8 shadow-md hover:shadow-lg transition-shadow duration-300 sticky z-10">
				<div className="container mx-auto px-4 flex items-center justify-between gap-4">
					<Link href={`/`}>Home</Link>
					<Link href={`/test`}>Test</Link>
					<Link href={`/404`}>404</Link>
				</div>
			</nav>

			<main className="w-full">
				<div className="container mx-auto px-4 relative">
					<h1 className="text-2xl">Nyxia Lovelace</h1>
					<p>Portae chaos aperiuntur... Parare pro magia!</p>

					<Image
						src="/chibyxia-responde.png"
						alt="Nyxia Lovelace"
						height={640}
						width={640}
						className="absolute -top-8 right-0 -z-0"
					/>
				</div>
			</main>

			{image === true ? (
				<Image
					src="/chibyxia-hi-r.png"
					alt="Nyxia Lovelace"
					height={420}
					width={420}
					className="fixed -bottom-8 -right-8 z-10"
				/>
			) : (
				<Image
					src="/chibyxia-hi-l.png"
					alt="Nyxia Lovelace"
					height={420}
					width={420}
					className="fixed -bottom-8 -left-12 z-10"
				/>
			)}
		</>
	)
}
