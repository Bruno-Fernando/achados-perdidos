import { z } from "zod";

export const ClaimValidator = z.object({
  authorEmail: z.string().email(),
  authorName: z.string(),
  postTitle: z.string(),
  message: z.string().optional(),
  found: z.boolean(),
});

export type ClaimPayload = z.infer<typeof ClaimValidator>;
