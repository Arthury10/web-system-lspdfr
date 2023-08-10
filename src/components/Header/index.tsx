"use client"
import { useGetUser } from '@/common/hooks/useGetUser'
import Image from 'next/image'

export const Header = () => {

  const {handleRequestUser, user} = useGetUser()
  console.log(user)

  return (
    <header className="w-full bg-blue-500 flex items-center justify-between p-4 h-[15vh]" >
      <Image width={120} height={120} src="/Police_Logo/lapd-lspd.svg" alt="background" />
    <div>
      <p><span>Oficial: </span> Arthur Ropke</p>
      <p><span>Station: </span> LSPD</p>
    </div>
  </header>
  )
}