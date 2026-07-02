const express = require('express');
const router = express.Router();

const { createNote, getNotes, getNote, updateNote, deleteNote } = require('../controllers/note.controller');
const validate = require('../middlewares/validate');
const { createNoteSchema, updateNoteSchema } = require('../validators/note');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, validate(createNoteSchema), createNote);
router.get("/", authMiddleware, getNotes);
router.get("/:id", authMiddleware, getNote);
router.patch("/:id", authMiddleware, validate(updateNoteSchema) ,updateNote);
router.delete("/:id", authMiddleware, deleteNote);

module.exports = router;