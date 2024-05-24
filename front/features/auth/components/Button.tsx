import { ButtonProps } from '@/types/interface'
import React from 'react'

const Button = ({ children, onClick, bgColor, textColor, type }: ButtonProps) => {

  const defaultClassName = "inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-gray-300 rounded-lg"

  return (
    <button className={`${defaultClassName} ${bgColor} ${textColor}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button