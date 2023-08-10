import { useState } from "react"
import { useController } from "react-hook-form"

interface InputFieldProps {
  name: string
  label?: string
  isRequired?: boolean
  inputPassword?: boolean
  mask?: string
  editableButton?: boolean
  handleEdit?: (value: boolean) => void
}

export const InputField = ({
  name,
  label,
  isRequired,
  inputPassword,
  mask,
  editableButton,
  handleEdit,
}: InputFieldProps) => {

  const {
    field: { onChange, value, onBlur },
    fieldState: { error },
  } = useController({
    name,
  })

  const [show, setShow] = useState(true)
  const handleClick = () => setShow(!show)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        className="rounded-sm text-black p-2"
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        type={show ? 'text' : 'password'}
      />
      <span>{error?.message}</span>
    </div>
  )
}