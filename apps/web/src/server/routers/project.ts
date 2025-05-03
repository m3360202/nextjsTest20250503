import { z } from 'zod';
import { publicProcedure, router } from '../trpc/init';
import { projects } from '@repo/db/schema';
import { eq } from 'drizzle-orm';

export const projectsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(projects);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const result = await ctx.db
        .select()
        .from(projects)
        .where(eq(projects.id, input.id));
      return result[0];
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      status: z.enum(['active', 'completed', 'archived']).default('active'),
      ownerId: z.number().optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const result = await ctx.db.insert(projects).values(input).returning();
      return result[0];
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      description: z.string().optional(),
      status: z.enum(['active', 'completed', 'archived']).optional(),
      ownerId: z.number().optional()
    }))
    .mutation(async ({ input, ctx }) => {
      const { id, ...data } = input;
      const result = await ctx.db
        .update(projects)
        .set(data)
        .where(eq(projects.id, id))
        .returning();
      return result[0];
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.db.delete(projects).where(eq(projects.id, input.id));
      return { success: true };
    }),
});
