import { z } from 'zod';

// Define the Zod schema for word validation
export const wordSchema = z.object({
  id: z.string(),
  userId: z.string(),
  present: z.string(),
  past: z.string(),
  participle: z.string(),
  nextReview: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format for nextReview',
  }),
  lastReviewed: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format for lastReviewed',
  }),
  reviewCount:z.number().default(0)
});
export const addWordSchema = wordSchema.omit({ id: true, lastReviewed: true, reviewCount: true,nextReview: true });

export type Word = z.infer<typeof wordSchema>;
export type AddWord = z.infer<typeof addWordSchema>;