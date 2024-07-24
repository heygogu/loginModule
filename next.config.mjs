/** @type {import('next').NextConfig} */
export async function redirects() {
  return [
    {
      source: '/',
      destination: '/step-1',
      permanent: true 
    }
  ]
}
