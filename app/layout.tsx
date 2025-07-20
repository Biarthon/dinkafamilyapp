import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dinka Family App',
  description: 'Developed by Biar',
  generator: 'Developed by Biar',
  openGraph: {
    title: 'Dinka Family App',
    description: 'Developed by Biar',
    url: 'https://dinkafamilyapp-8zl6.vercel.app',
    siteName: 'Dinka Family App',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Dinka Family App',
    description: 'Developed by Biar',
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
