"use client"

import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react'
import { logout } from '../api/logout';
import { Button } from '@/components/ui/button';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
}

const LogoutButton = ({
  children,
  type
}: ButtonProps) => {
  const router = useRouter();
  const handleLogout = async() => {
    await logout();
    router.push("/");
    router.refresh();
  };

  return (
    <Button
      onClick={handleLogout}
      type={type}
    >
      {children}
    </Button>
  )
}

export default LogoutButton