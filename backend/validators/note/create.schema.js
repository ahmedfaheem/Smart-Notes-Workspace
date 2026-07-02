const { z } = require("zod");

const createNoteSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required"),

    content: z
        .string()
        .trim()
        .min(1, "Content is required"),

    category: z
        .string()
        .trim()
        .optional(),

    tags: z
        .array(z.string())
        .optional(),

    status: z
        .enum(["Todo", "In Progress", "Done"])
        .optional(),

    isPinned: z
        .boolean()
        .optional()
});

module.exports = createNoteSchema;