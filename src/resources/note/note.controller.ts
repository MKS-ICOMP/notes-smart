import { Request, Response } from 'express';
import {
  createNote,
  deleteNote,
  getNoteById,
  listNotes,
  updateNote,
} from './note.service';

export async function listNotesController(req: Request, res: Response) {
  const notes = await listNotes(req.session.userId as string);
  return res.status(200).json(notes);
}

export async function createNoteController(req: Request, res: Response) {
  const note = await createNote(req.session.userId as string, req.body);
  return res.status(201).json(note);
}

export async function getNoteByIdController(req: Request, res: Response) {
  const noteId = String(req.params.id);
  const note = await getNoteById(req.session.userId as string, noteId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.status(200).json(note);
}

export async function updateNoteController(req: Request, res: Response) {
  const noteId = String(req.params.id);
  const note = await updateNote(
    req.session.userId as string,
    noteId,
    req.body,
  );

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.status(200).json(note);
}

export async function deleteNoteController(req: Request, res: Response) {
  const noteId = String(req.params.id);
  const deleted = await deleteNote(req.session.userId as string, noteId);

  if (!deleted) {
    return res.status(404).json({ message: 'Note not found' });
  }

  return res.status(200).json({ message: 'Note deleted successfully' });
}
