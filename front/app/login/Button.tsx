"use client"

import React, { useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from '../components/icon';
import { signIn } from 'next-auth/react';

type ButtonProps = {
  provider: 'github' | 'google';
  label: string;
};

const Button: React.FC<ButtonProps> = ({ provider, label }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = () => {
    setIsLoading(true);
    signIn(provider);
  };

  return (
    <button
      className={cn(buttonVariants({ variant: "outline"}))}
      onClick={handleSignIn}
    >
      {isLoading ? (
        <Icon.spinner className="mr-2 animate-spin" />
      ) : (
        provider === 'github' ? <Icon.github className="mr-2" /> : <Icon.google className="mr-2" />
      )}
      {label}
    </button>
  );
};

export default Button;
