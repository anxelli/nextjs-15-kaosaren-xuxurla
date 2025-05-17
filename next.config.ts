import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: false
	},
	eslint: {
		ignoreDuringBuilds: false
	},
	compress: true,
	reactStrictMode: true,
	// serverExternalPackages: ['mongoose'],
	output: 'standalone'
}

export default nextConfig
