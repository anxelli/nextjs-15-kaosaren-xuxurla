import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
	const random = Math.floor(Math.random() * 2)
	const image = random % 2 === 0

	return (
		<>
			<main className="w-screen h-screen bg-foreground text-background">
				<section className="container mx-auto">
					<div className="flex flex-col items-center justify-center gap-8">
						<div className="aspect-square">
							{image === true ? (
								<Image
									src="/chibyxia-404.png"
									alt="Nyxia Lovelace"
									height={420}
									width={420}
									className=""
								/>
							) : (
								<Image
									src="/chibyxia-loading.png"
									alt="Nyxia Lovelace"
									height={420}
									width={420}
									className="-mt-10"
								/>
							)}
						</div>

						<div className="w-full text-center">
							<h2 className="text-4xl text-white">404</h2>
							<p className="text-white">
								Page not found... or Nyxia is here!
							</p>
						</div>

						<Link
							href={`/`}
							className="bg-foreground text-primary border-2 border-primary px-4 py-2 rounded-md hover:animate-spin"
						>
							Go Home
						</Link>
					</div>
				</section>
			</main>
		</>
	)
}
