import { z } from "zod";

export const taskSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z
    .string({ message: "Description must be of type string" })
    .optional(),
  date: z
    .string({ message: "Date must be of type string" })
    .datetime("Date must be of type datetime")
    .optional(),
});
