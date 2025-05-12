'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pathMap = {
  'notes': 'Notes',
  'new': 'New',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  let path = '';

  return (
    <nav className="text-sm mb-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link href="/notes" className="text-primary hover:underline">Notes</Link>
        </li>
        {segments.slice(1).map((segment, idx) => {
          path += '/' + segment;
          const isLast = idx === segments.slice(1).length - 1;
          let label = pathMap[segment] || segment;
          // If it's a note id, show 'Edit' or 'Note'
          if (!isNaN(Number(segment)) || segment.length > 6) {
            label = 'Note';
          }
          return (
            <li key={path} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500">{label}</span>
              ) : (
                <Link href={`/notes${path}`} className="text-primary hover:underline">{label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 