// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Coffee Shop',
  description: 'Order your favorite coffee',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  )
}
