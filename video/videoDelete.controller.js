import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/prisma.js";
import fs from "fs";

const deleteInFiles = async (pathFile) => {
  const basePath = "./public/films/";
  const path = basePath + pathFile;

  try {
    fs.unlink(path, () => {
      return true;
    });
  } catch (error) {
    return false;
  }
};

export const deleteFilmWithFile = asyncHandler(async (req, res) => {
  const { id, url } = req.query;

  if (!id || !url) {
    res.status(400);
    throw new Error("No argument");
  }

  try {
    await prisma.urls.delete({
      where: {
        id: Number(id),
      },
    });

    await deleteInFiles(url);

    res.status(200);
    res.json("ok");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

export const deletePreviewFile = asyncHandler(async (req, res) => {
  const { title, url } = req.query;

  if ((!title, !url)) {
    res.status(400);
    throw new Error("No argument");
  }

  try {
    await prisma.video.update({
      where: {
        title: title,
      },
      data: {
        preview: null,
      },
    });

    await deleteInFiles(url);

    res.status(200);
    res.json("ok");
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
