import { Wallet } from '@/components/Wallet'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kredible',
  description: 'Get your on-chain credit score',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <meta name="viewport" content=" initial-scale=0.1"/>
        <Wallet>
        {children}
        </Wallet>
        </body>
    </html>
  )
}
