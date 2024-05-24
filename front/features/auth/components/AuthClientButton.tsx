"use client"

import { ButtonProps } from '@/types/interface';
import { useRouter } from 'next/navigation';
import React from 'react'
import Button from './Button';
import { signOut } from '@/services/auth';



const AuthClientButton = ({
  children,
  bgColor,
  textColor,
  type
}: ButtonProps) => {
  const router = useRouter();
  const handleSignOut = async() => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <Button
      onClick={handleSignOut}
      type={type}
      bgColor={bgColor}
      textColor={textColor}
    >
      {children}
    </Button>
  )
}

export default AuthClientButton