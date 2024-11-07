import { z } from 'zod';

// Define the Zod schema for pagination
export const paginationSchema = z.object({
  limit: z.coerce.number().min(0).default(10),
  page: z.coerce.number().min(0).default(1),
});

export type Pagination = z.infer<typeof paginationSchema>;
