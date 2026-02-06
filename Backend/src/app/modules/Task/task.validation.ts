import z from 'zod';


const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    priority: z.number().int().nonnegative().optional(),
  }),
});


const updateTaskStatusSchema = z.object({
  body: z.object({
    status: z.enum(['To-Do', 'In-Progress', 'Done']),
  }),
});

const reorderTaskSchema = z.object({
  body: z.object({
    status: z.enum(['To-Do', 'In-Progress', 'Done']),
    targetPriority: z.number().int().min(1),
  }),
});

const updateTaskSchema = z
  .object({
    body: z.object({
      title: z.string().min(1).optional(),
      description: z.string().optional(),
    }),
  })
  .refine(
    (data) => data.body.title || data.body.description,
    {
      message: 'At least one field (title or description) must be provided',
      path: ['body'],
    },
  );

export const taskValidation = {
  createTaskSchema,
  updateTaskStatusSchema,
  reorderTaskSchema,
  updateTaskSchema
};
