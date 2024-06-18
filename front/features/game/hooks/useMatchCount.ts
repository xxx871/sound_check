import { useEffect, useState } from "react";

const useMatchCount = () => {
  const [matchCount, setMatchCount] = useState<number>(0);

  useEffect(() => {
    const storedMatchCount = sessionStorage.getItem('matchCount');
    if (storedMatchCount) {
      setMatchCount(parseInt(storedMatchCount, 10));
    }
  }, []);

  const incrementMatchCount = () => {
    setMatchCount(prevCount => {
      const newCount = prevCount + 1;
      sessionStorage.setItem('matchCount', newCount.toString());
      return newCount;
    });
  };

  const resetMatchCount = () => {
    setMatchCount(0);
    sessionStorage.setItem('matchCount', '0');
  };

  return { matchCount, incrementMatchCount, resetMatchCount };
};

export default useMatchCount;