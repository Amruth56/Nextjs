'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/notes');
  }, [router]);
  return <div className="text-center py-4">Loading...</div>;
} 