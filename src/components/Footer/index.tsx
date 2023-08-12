"use client"

interface FooterProps {
  timeString?: string;
  dateString?: string;
}


export const Footer = ({ dateString, timeString }: FooterProps) => {

  return (
    <footer className="w-full bg-blue-500 flex items-center justify-between h-[5vh] p-4">
      <p>Desenvolvido por Arthur Ropke</p>
      <div className="flex flex-col">
        {timeString && <p><span>Horário: </span> {timeString}</p>}
        {dateString && <p><span>Data: </span> {dateString}</p>}
      </div>
    </footer>
  )
}
