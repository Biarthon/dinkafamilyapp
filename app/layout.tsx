import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dinka Family App',
  description: 'A beautiful app to connect, celebrate, and preserve Dinka heritage with your family.',
  generator: 'Pixel Pulse Labs', // or your brand name
  openGraph: {
    title: 'Dinka Family App',
    description: 'A beautiful app to connect, celebrate, and preserve Dinka heritage with your family.',
    url: 'https://dinkafamilyapp-8zl6.vercel.app',
    siteName: 'Dinka Family App',
    images: [
      {
        url: '/og-image.png', // must be in public folder
        width: 1200,
        height: 630,
        alt: 'Dinka Family App Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dinka Family App',
    description: 'A beautiful app to connect, celebrate, and preserve Dinka heritage.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
