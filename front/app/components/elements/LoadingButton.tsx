"use client"

import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from '@/app/components/icon';

interface LoadingButtonProps {
  isLoading: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "link" | "default" | "outline" | "destructive" | "secondary" | "ghost";
  type?: "button" | "submit" | "reset";
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ isLoading, onClick, children, className, variant = "outline", type = "button" }) => {
  return (
    <button
    className={cn(buttonVariants({ variant }), className)}
    onClick={onClick}
    disabled={isLoading}
    type={type}
    >
      {isLoading ? (
        <Icon.spinner className="mr-2 animate-spin" />
      ) : (
        children
      )}
    </button>
  );
};
