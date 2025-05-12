'use client';

import NoteEditor from '@/components/NoteEditor';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function EditNotePage({ params }) {
  return (
    <>
      <Breadcrumbs />
      <NoteEditor noteId={params.id} />
    </>
  );
} 