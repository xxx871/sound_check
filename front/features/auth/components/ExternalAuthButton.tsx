"use client"

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react'
import { Icon } from './icon';

type ExternalAuthButtonProps = {
  provider: 'github' | 'google';
  label: string;
};

const ExternalAuthButton: React.FC<ExternalAuthButtonProps> = ({ provider, label }) => {
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

export default ExternalAuthButton