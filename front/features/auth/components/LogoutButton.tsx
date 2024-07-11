"use client"

import { useRouter } from 'next/navigation';
import React, { ReactNode, useState } from 'react'
import { logout } from '../api/logout';
import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
}

const LogoutButton = ({
  children,
  type
}: ButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleLogout = async() => {
    setIsLoading(true);
    await logout();
    router.push("/");
    router.refresh();
  };

  return (
    <LoadingButton
      onClick={handleLogout}
      type={type}
      isLoading={isLoading}
    >
      {children}
    </LoadingButton>
  )
}

export default LogoutButton