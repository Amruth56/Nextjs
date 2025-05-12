'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { notes } from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function NoteList() {
  const [noteList, setNoteList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("notes.getAll", notes.getAll( ));
    console.log("noteList", noteList);
    fetchNotes();
  }, [page]);

  const fetchNotes = async () => {
    try {
      const data = await notes.getAll(page, 10);
      console.log('Fetched notes:', data);
      if (page === 1) {
        setNoteList(data || []);
      } else {
        setNoteList(prev => [...prev, ...(data || [])]);
      }
      setHasMore((data || []).length === 10);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to fetch notes');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await notes.delete(id);
        setNoteList(noteList.filter(note => note.id !== id));
      } catch (err) {
        setError('Failed to delete note');
      }
    }
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (loading && page === 1) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1
          className="text-2xl font-bold cursor-pointer hover:text-primary transition"
          onClick={() => router.push('/')}
        >
          My Notes
        </h1>
        <Link
          href="/notes/new"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          New Note
        </Link>
      </div>

      {noteList.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No notes yet. Create your first note!
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {noteList.map((note) => (
              <div
                key={note.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <Link href={`/notes/${note.id}`} className="flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
                    <p className="text-gray-600 line-clamp-2">{note.content}</p>
                  </Link>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="ml-4 text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-6">
              <button
                onClick={loadMore}
                className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}