"use client"
import { useEffect, useState } from 'react';

export const Footer = () => {
  // Estado para armazenar a data e o tempo
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    // URL do servidor WebSocket
    const url = 'ws://localhost:3001/';

    // Criar um novo objeto WebSocket
    const ws = new WebSocket(url);

    // Função para lidar com mensagens recebidas
    ws.onmessage = (event) => {
      if (event.data) setDate(new Date(event.data));
    };

    // Limpar o WebSocket quando o componente for desmontado
    return () => ws.close();
  }, []);

  // Formatando a data como '14:20'
  const timeString = date?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) || '...';

  return (
    <footer className="w-full bg-blue-500 flex items-center justify-between h-[5vh] p-4">
      <p>Desenvolvido por Arthur Ropke</p>
      <div className="flex flex-col">
        <p><span>Data: </span> {timeString}</p> {/* Mostrar data aqui */}
      </div>
    </footer>
  )
}
