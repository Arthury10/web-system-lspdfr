"use client"
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { Footer } from '@/components/Footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div>
      <Sidebar>
        {children}
      </Sidebar>
      <Footer />
    </div>
  )
}
