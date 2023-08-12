"use client"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [connected, setConnected] = useState<boolean>(true);
  const [date, setDate] = useState<Date>();


  useEffect(() => {
    // URL do servidor WebSocket
    const url = 'ws://localhost:3001/';

    // Criar um novo objeto WebSocket
    const ws = new WebSocket(url);

    // Conectar-se ao servidor WebSocket
    ws.onopen = () => {
      console.log('Conectado ao servidor WebSocket');
      setConnected(true);
    }

    // Função para lidar com mensagens recebidas
    ws.onmessage = (event) => {
      if (event.data) setDate(new Date(event.data));
      console.log('event', event);

    };

    // Limpar o WebSocket quando o componente for desmontado
    return () => ws.close();
  }, []);

  // Formatando a data como 14/12/2021
  const dateString = date?.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' });


  // Formatando a data como '14:20'
  const timeString = date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <html lang="en">
      <body className={inter.className + " h-screen flex flex-col justify-between"}>
        <Header />
        {!connected && (
          <div className='container bg-slate-500 m-auto p-10'>
            <p className="text-red-500">Desconectado do servidor</p>
          </div>
        )}
        {connected && children}
        <Footer timeString={timeString} dateString={dateString} />
      </body>
    </html>
  )
}
