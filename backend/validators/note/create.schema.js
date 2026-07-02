const { z } = require("zod");
const { CATEGORIES, STATUS} = require("../../constants/note.constants")

const createNoteSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),

  content: z.string().trim().min(1, "Content is required"),

  category: z
    .enum(CATEGORIES)
    .optional(),

  tags: z.array(z.string()).optional(),

  status: z.enum(STATUS).optional(),

  isPinned: z.boolean().optional(),
});

module.exports = createNoteSchema;
