import { createProtectedRouter } from "./context";
import { z } from "zod";

export const linkRouter = createProtectedRouter().mutation("generate", {
  input: z.object({
    url: z.string().url(),
  }),
  async resolve({ input, ctx }) {
    const user = ctx.session.user;

    const hubatsch = ["h", "u", "b", "a", "t", "s", "c", "h"];

    const randomNumber = Math.floor(Math.random() * 14) + 6;

    const slug = [...Array(randomNumber)]
      .map(() => {
        return hubatsch
          .map((h) => (Math.random() > 0.5 ? h.toUpperCase() : h.toLowerCase()))
          .join("");
      })
      .join("");

    const link = await ctx.prisma.link.create({
      data: {
        slug,
        url: input.url,
        userId: user.id,
      },
    });

    return link;
  },
});
