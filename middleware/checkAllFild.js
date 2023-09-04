import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/prisma.js";

export const chekAllFields = asyncHandler(async (req, res) => {
  const { title } = req.body;

  const feilds = await prisma.video.findMany({
    where: {
      title: title,
    },
    include: {
      qualityUrls: true,
    },
  });

  res.status(200);
  res.json(feilds);
});
