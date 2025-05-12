'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // For demo: check a localStorage flag
    setLoggedIn(localStorage.getItem('loggedIn') === 'true');
    // Listen for changes (optional, for demo)
    const onStorage = () => setLoggedIn(localStorage.getItem('loggedIn') === 'true');
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <header className="w-full flex justify-end items-center px-6 py-4">
      {!loggedIn && (
        <button
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          onClick={() => router.push('/login')}
        >
          Login
        </button>
      )}
    </header>
  );
} 