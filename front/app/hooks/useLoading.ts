import { useState } from "react";

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const withLoading = async (action: () => Promise<void>) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, withLoading };
};