"use client"
import { Sidebar } from '@/components/Sidebar'

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
    </div>
  )
}
