import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Using localStorage to persist mock data
const getMockNotes = () => {
  if (typeof window !== 'undefined') {
    const storedNotes = localStorage.getItem('notes');
    return storedNotes ? JSON.parse(storedNotes) : [];
  }
  return [];
};

const saveMockNotes = (notes) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('notes', JSON.stringify(notes));
  }
};

export const notes = {
  getAll: async () => {
    try {
      const notes = getMockNotes();
      return notes;
    } catch (error) {
      console.error('Error getting notes:', error);
      throw new Error('Failed to fetch notes');
    }
  },

  getOne: async (id) => {
    try {
      const notes = getMockNotes();
      const note = notes.find(note => note.id === id);
      if (!note) throw new Error('Note not found');
      return note;
    } catch (error) {
      console.error('Error getting note:', error);
      throw error;
    }
  },

  create: async (title, body) => {
    try {
      const notes = getMockNotes();
      const newNote = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        content: body, // Store body as content
        createdAt: new Date().toISOString(),
      };
      notes.push(newNote);
      saveMockNotes(notes);
      return newNote;
    } catch (error) {
      console.error('Error creating note:', error);
      throw new Error('Failed to create note');
    }
  },

  update: async (id, title, body) => {
    try {
      const notes = getMockNotes();
      const noteIndex = notes.findIndex(note => note.id === id);
      if (noteIndex === -1) throw new Error('Note not found');
      
      const updatedNote = {
        ...notes[noteIndex],
        title,
        content: body, // Store body as content
        updatedAt: new Date().toISOString(),
      };
      notes[noteIndex] = updatedNote;
      saveMockNotes(notes);
      return updatedNote;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const notes = getMockNotes();
      const noteIndex = notes.findIndex(note => note.id === id);
      if (noteIndex === -1) throw new Error('Note not found');
      notes.splice(noteIndex, 1);
      saveMockNotes(notes);
      return { success: true };
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  },
};

export default api;