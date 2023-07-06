import { prisma } from "../prisma/prisma.js";
import asyncHandler from "express-async-handler";

export const downloadActor = asyncHandler(async (req, res) => {
  const { fullName, posterUrl } = req.body;

  const createActor = await prisma.actorProfile.create({
    data: {
      fullName: fullName,
      posterUrl: posterUrl,
    },
  });

  res.status(201);
  res.json(createActor);
});

export const findActorByName = asyncHandler(async (req, res) => {
  const { fullName } = req.query;

  const findActor = await prisma.actorProfile.findFirst({
    where: {
      fullName: fullName,
    },
  });

  if (!findActor) {
    res.status(400);
    throw new Error("Actor not found");
  }

  res.status(201);
  res.json(findActor);
})
