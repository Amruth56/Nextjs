'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  router.push('/notes');
  return <div className="text-center py-4">Loading...</div>;
} 