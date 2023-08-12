'use client'
import { SidebarListItems } from "@/common/Constants/SidebarListItems";
import Link from "next/link";

interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar = ({ children }: SidebarProps) => {

  return (
    <div className="flex gap-8">
      <nav className="bg-blue-500 w-80 h-[80vh] border-t-2 flex flex-col justify-between">
        <ul className="flex flex-col gap-10 mt-3">
          {SidebarListItems.map((item) => (
            <Link href={item.path} key={item.title} className={`p-4  cursor-pointer hover:bg-gray-700 bg-gray-500`}>
              {item.title}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="pr-8 w-full">
        {children}
      </div>
    </div>
  )
}