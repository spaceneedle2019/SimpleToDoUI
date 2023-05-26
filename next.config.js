/** @type {import('next').NextConfig} */
const simpleToDoInternalEndpoint = 'http://0.0.0.0:9292'
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${simpleToDoInternalEndpoint}/:path*`,
      },
    ]
  },
}
