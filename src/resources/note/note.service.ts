import prisma from '../../database/prisma';
import { CreateNoteInput, UpdateNoteInput } from './note.types';

export async function listNotes(userId: string) {
  return prisma.note.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      userId: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function createNote(userId: string, data: CreateNoteInput) {
  return prisma.note.create({
    data: {
      userId,
      title: data.title,
      content: data.content,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function getNoteById(userId: string, noteId: string) {
  return prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function updateNote(
  userId: string,
  noteId: string,
  data: UpdateNoteInput,
) {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!note) {
    return null;
  }

  return prisma.note.update({
    where: { id: noteId },
    data: {
      title: data.title,
      content: data.content,
    },
    select: {
      id: true,
      userId: true,
      title: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

export async function deleteNote(userId: string, noteId: string) {
  const note = await prisma.note.findFirst({
    where: {
      id: noteId,
      userId,
    },
    select: {
      id: true,
    },
  });

  if (!note) {
    return null;
  }

  await prisma.note.delete({
    where: { id: noteId },
  });

  return true;
}
