import { Router } from 'express';
import isAuth from '../../middlewares/isAuth';
import validateBody from '../../middlewares/validateBody';
import {
  createNoteController,
  deleteNoteController,
  getNoteByIdController,
  listNotesController,
  updateNoteController,
} from './note.controller';
import { createNoteSchema, updateNoteSchema } from './note.schema';

const noteRouter = Router();

noteRouter.use(isAuth);

noteRouter.get('/', listNotesController);
noteRouter.post('/', validateBody(createNoteSchema), createNoteController);
noteRouter.get('/:id', getNoteByIdController);
noteRouter.put('/:id', validateBody(updateNoteSchema), updateNoteController);
noteRouter.delete('/:id', deleteNoteController);

export default noteRouter;
