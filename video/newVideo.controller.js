import asyncHandler from "express-async-handler";
import { prisma } from "../prisma/prisma.js";

export const createNewFilmEntryToDb = asyncHandler(async (req, res) => {

  console.log(req.body)

  const {
    title,
    ratingFilm,
    postersUrl,
    novelty,
    preview,
    yearCreate,
    countries,
    gendre,
    content,
    ageRestriction,
    description,
    actors,
    TitleSeo,
    DescriptionSeo,
  } = req.body;

  const isHaveVideo = await prisma.video.findFirst({
    where: {
      title,
    },
  });

  if (isHaveVideo) {
    res.status(405);
    throw new Error("Entry already created");
  }

  const createVideoToDatabase = await prisma.video.create({
    data: {
      title: title,
      ratingFilm: ratingFilm,
      postersUrl: postersUrl,
      yearCreate: yearCreate,
      countries: countries,
      gendre: gendre,
      content: content,
      ageRestriction: ageRestriction,
      description: description,
      actors: actors,
      novelty: novelty,
      preview: preview,
      qualityUrls: { create: { url: "default", quality: "default", voiceActing: "default" } }, // default value for create entry
      TitleSeo: TitleSeo,
      DescriptionSeo: DescriptionSeo,
    },
    include: {
      qualityUrls: true,
    },
  });

  res.status(201);
  res.json(createVideoToDatabase);
});

export const addFilms = asyncHandler(async (req, res) => {
  console
  const { title, quality, voiceActing } = JSON.parse(req.body.information);

  if (!title || !quality || !voiceActing) {
    throw new Error("Dont get params");
  }

  const addFilmsQuality = await prisma.video.update({
    where: {
      title: title,
    },
    data: {
      qualityUrls: {
        create: {
          quality: quality,
          voiceActing: voiceActing,
          url: res.req.file.filename,
        },
      },
    },
    include: {
      qualityUrls: true,
    },
  });

  // const deleteInitializationParams = await prisma.video.delete({
  //   where: {
  //     title: title
  //   },
  //   data: {
  //     qualityUrls: {
  //       delete: {}  loading late....
  //     }
  //   }
  // })

  res.status(201)
  res.json(addFilmsQuality)
});
