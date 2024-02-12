/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'uploadthing.com'
			},
			{
				protocol: 'https',
				hostname: 'utfs.io'
			}
		],
		unoptimized: true
	}
};

export default nextConfig;
