"use client"

import { HomeComponent } from "@/components/HomeComponent";
import { InputField } from "@/components/InputField"
import { useRouter } from 'next/navigation';
import { useCallback } from "react"
import { FormProvider, useForm } from "react-hook-form"


export default function Page() {

  return (
    <div className="container m-auto bg-slate-400 w-5/12 flex flex-col items-center justify-between gap-8 mt-8 p-12 rounded-lg">
      <HomeComponent />
    </div>
  )
}
