'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const ResultComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isMatch = searchParams.get('isMatch');

  return (
    <div className="text-white">
      {isMatch === 'true' ? (
        <h1>Correct! Your pitch matched the target note.</h1>
      ) : (
        <h1>Incorrect. Your pitch did not match the target note.</h1>
      )}
      <button onClick={() => router.push('/')}>Back to Home</button>
    </div>
  );
};

export default ResultComponent;
