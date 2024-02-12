/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    },
    images :{
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ibb.co'
            }
        ]
    }
}

module.exports = nextConfig
