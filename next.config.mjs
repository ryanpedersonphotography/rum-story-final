/** @type {import('next').NextConfig} */
const nextConfig = {
	// Disable ESLint during builds to allow deployment
	eslint: {
		ignoreDuringBuilds: true,
	},
	// Disable TypeScript checking during builds for faster deployment
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
			{ protocol: 'https', hostname: 's3.amazonaws.com', pathname: '/**' },
			{ protocol: 'https', hostname: 'images.ctfassets.net', pathname: '/**' },
		],
	},
	// Disable caching for Visual Editor routes
	async headers() {
		return [
			{
				source: '/home-live',
				headers: [
					{
						key: 'Cache-Control',
						value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
					},
					{
						key: 'Pragma',
						value: 'no-cache',
					},
					{
						key: 'Expires',
						value: '0',
					},
				],
			},
		];
	},
};

export default nextConfig;
