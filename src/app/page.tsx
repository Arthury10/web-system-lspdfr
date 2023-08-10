"use client"

import { InputField } from "@/components/InputField"
import { useRouter } from 'next/navigation';
import { useCallback } from "react"
import { FormProvider, useForm } from "react-hook-form"


export default function Page() {

  const router = useRouter()

  const form = useForm({
    defaultValues: {
      email: 'Arthur Ropke',
      password: '1234',
    },

    mode: 'onChange',
  })

  const onSubmit = useCallback(
    async (values: any) => {
      console.log(values)
      router.push('/private')
    },
    [],
  )

  return (
    <div className="container m-auto bg-slate-400 w-5/12 flex flex-col items-center justify-between gap-8 mt-8 p-12 rounded-lg">
      <FormProvider {...form}>
        <div className="flex flex-col gap-8">
          <InputField name="officerName" label="Nome do oficial: " />
          <InputField name="password" label="Senha: " />
        </div>
      </FormProvider>
      <button
        onClick={form.handleSubmit(onSubmit)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Entrar
      </button>
    </div>
  )
}
