const { z } = require("zod");

const updateNoteSchema = z.object({
    title: z
        .string()
        .trim()
        .optional(),

    content: z
        .string()
        .trim()
        .optional(),

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
}).refine((data)=> Object.keys(data).length > 0 , { message: "required at least one field"});

module.exports = updateNoteSchema;