import { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    return res.status(404).json({ message: "Invalid slug" });
  }

  const link = await prisma.link.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!link) {
    return res.status(404).json({ message: "No link assigned to this slug" });
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=1000000000, stale-while-revalidate");

  return res.json({
    url: link.url,
  });
};

export default handler;
