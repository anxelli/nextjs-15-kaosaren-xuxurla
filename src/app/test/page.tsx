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

export default async function Page() {
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

	const res = await fetch('https://rickandmortyapi.com/api/character?page=1')
	const { results: characters } = await res.json()

	const enrichedCharacters = await Promise.all(
		characters
			.slice(0, 12)
			.map(
				async (char: {
					episode: string[]
					id: string
					name: string
					image: string
					status: string
					species: string
					gender: string
					origin: { name: string }
					location: { name: string }
				}) => {
					const firstEpisodeUrl = char.episode[0]
					const episodeRes = await fetch(firstEpisodeUrl)
					const episodeData = await episodeRes.json()

					return {
						id: char.id,
						name: char.name,
						image: char.image,
						status: char.status,
						species: char.species,
						gender: char.gender,
						origin: char.origin.name,
						location: char.location.name,
						firstEpisode: episodeData.name
					}
				}
			)
	)

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
				<div className="container mx-auto px-4 space-y-4">
					<h1 className="text-2xl">Nyxia Lovelace</h1>
					<p>Portae chaos aperiuntur... Parare pro magia!</p>

					<hr />

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
						{enrichedCharacters.map(char => (
							<div
								key={char.id}
								data-scroll="fade-in-down"
								className="bg-gray-900 rounded shadow p-4"
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={char.image}
									alt={char.name}
									className="w-full h-auto rounded mb-4"
								/>
								<h2 className="text-xl font-bold text-white">
									{char.name}
								</h2>
								<p className="text-sm text-gray-400">
									{char.species} • {char.gender} •{' '}
									{char.status}
								</p>
								<p className="text-sm mt-2">
									🌍 Origen: {char.origin}
								</p>
								<p className="text-sm">
									📍 Ubicación: {char.location}
								</p>
								<p className="text-sm">
									🎬 Primer episodio: {char.firstEpisode}
								</p>
							</div>
						))}
					</div>
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
