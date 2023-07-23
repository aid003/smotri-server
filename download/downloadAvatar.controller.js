import asyncHandler from "express-async-handler";
import multer from "multer";
import path from "path";
import { prisma } from "../prisma/prisma.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/posters");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

export const uploadAvatar = multer({
  storage: storage,
  limits: { fileSize: 1099511627776 },
});

export const changePosterByTitle = asyncHandler(async (req, res) => {
  const { value } = JSON.parse(req.body.filmTitle);
  const posterUrl = res.req.file.filename;

  try {
    const updatePosterUrl = await prisma.video.update({
      where: {
        title: value,
      },
      data: {
        postersUrl: posterUrl,
      },
    });
    res.status(201);
    console.log("gbhnjmk")
    res.json(updatePosterUrl);
  } catch {
    res.status(400);
    throw new Error("Error in load");
  }
});
