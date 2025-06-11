import { z } from "zod";

export const authSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Minimum length should be 4 characters"),
});

export type AuthSchema = z.infer<typeof authSchema>;
