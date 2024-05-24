import { InputFieldProps } from '@/types/interface'
import React from 'react'

const InputField = ({
  id,
  label,
  type,
  placeholder,
  errorMessage,
  defaultValue,
  register
}: InputFieldProps) => {
  return (
    <div className="mt-1">
      <label htmlFor="{id}" className="mb-1 block text-2xl text-white">{label}</label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className=" border border-gray-30 text-gray-900 text-sx rounded-sm focus:border-blue-500 w-full p-2"
        {...register(id)}
      />
      {errorMessage && <p className="text-red-500 text-white">※{errorMessage}</p>}
    </div>
  )
}

export default InputField