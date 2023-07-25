import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/prisma.js";
import path from 'path'
import fs from 'fs'

export const downloadVideo = asyncHandler(async (req, res) => {
  const {
    title,
    ratingFilm,
    postersUrl,
    yearCreate,
    countries,
    gendre,
    content,
    ageRestriction,
    description,
    actors,
    TitleSeo,
    DescriptionSeo,
  } = JSON.parse(req.body.information);

  const isHaveVideo = await prisma.video.findFirst({
    where: {
      title,
    },
  });

  if (isHaveVideo) {
    res.status(400);
    throw new Error("Video already exists");
  }

  const createVideoToDatabase = await prisma.video.create({
    data: {
      title: title,
      ratingFilm: ratingFilm,
      postersUrl: postersUrl,
      yearCreate: yearCreate,
      // countries: {
      //   create: countries,
      // },
      countries: countries,
      gendre: gendre,
      content: content,
      ageRestriction: ageRestriction,
      description: description,
      // actors: {
      //   create: actors,
      // },
      actors: actors,
      url: res.req.file.filename,
      TitleSeo: TitleSeo,
      DescriptionSeo: DescriptionSeo,
    },
    // include: {
    //   countries: true,
    //   actors: true,
    // },
  });

  res.status(201);
  res.json(createVideoToDatabase);
});

export const getAllPublishedFilms = asyncHandler(async (req, res) => {
  const getFilms = await prisma.video.findMany({
    where: {
      published: true,
    },
  });

  res.status(200);
  res.json(getFilms);
});

export const getFilmByTitle = asyncHandler(async (req, res) => {
  const { title } = req.query;

  if (!title) {
    res.status(400);
    throw new Error("Invalid query parametr");
  }

  const getFilm = await prisma.video.findUnique({
    where: {
      title: title,
    },
  });

  if (getFilm === null) {
    res.status(400);
    throw new Error("Video not found");
  }

  res.status(200);
  res.json(getFilm);
});

export const getAllTitles = asyncHandler(async (req, res) => {
  const getTitles = await prisma.video.findMany({
    select: {
      title: true,
    },
  });

  if (
    !getTitles ||
    getTitles === null ||
    getTitles === undefined ||
    getTitles === NaN
  ) {
    res.status(400);
    throw new Error("Titles not found");
  }

  res.status(200);
  res.json(getTitles);
});

export const getFilmsAnkets = asyncHandler(async (req, res) => {
  const filmAnket = await prisma.video.findMany({
    select: {
      title: true,
      ratingFilm: true,
      yearCreate: true,
      countries: true,
      gendre: true,
      postersUrl: true,
    },
  });

  if (
    !filmAnket ||
    filmAnket === null ||
    filmAnket === undefined ||
    filmAnket === NaN
  ) {
    res.status(400);
    throw new Error("Ankets not found");
  }

  res.status(200);
  res.json(filmAnket);
});

export const deleteFilmByTitle = asyncHandler(async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("title not found");
  }

  const deleteFilm = await prisma.video.delete({
    where: {
      title: title,
    },
  });

  try {
    const filePath = `./public/films/${deleteFilm.url}`
    fs.unlinkSync(filePath);
  } catch (error) {
    res.status(400).json({success: false})
  }

  res.status(200);
  res.json(deleteFilm);
});

export const deleteAllPublishedFilms = asyncHandler(async (req, res) => {
  const deleteFilms = await prisma.video.deleteMany({
    where: {
      published: true,
    },
  });

  const directory = "./public/films/";

  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });

  res.status(200);
  res.json(deleteFilms);
});
