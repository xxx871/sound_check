"use client"

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { Icon } from './icon';
import { LoadingButton } from '@/app/components/elements/LoadingButton';

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
    <LoadingButton
      variant="outline"
      className={cn(buttonVariants({ variant: "outline" }))}
      isLoading={isLoading}
      onClick={handleSignIn}
    >
      {provider === 'github' ? <Icon.github className="mr-2" /> : <Icon.google className="mr-2" />}
      {label}
    </LoadingButton>
  );
};

export default ExternalAuthButton;
