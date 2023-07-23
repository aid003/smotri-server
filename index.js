import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import {
  downloadVideo,
  getAllPublishedFilms,
  getAllTitles,
  getFilmByTitle,
  getFilmsAnkets,
} from "./video/video.controller.js";
import { downloadActor, findActorByName } from "./actor/actor.controller.js";
import { upload } from "./download/downloadVideo.controller.js";
import { streamingVideo } from "./video/streamingVideo/streaming.js";
import { changePosterByTitle, uploadAvatar } from "./download/downloadAvatar.controller.js";

const prisma = new PrismaClient();
const app = express();

async function main() {
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, limit: "4000000kb" }));
  // app.use("/api/download-video/", downloadVideo);
  app.use("/api/get-films/", getAllPublishedFilms);
  app.use("/api/get-film/", getFilmByTitle);
  app.use("/api/get-titles/", getAllTitles);
  app.use("/api/get-films-ankets/", getFilmsAnkets);

  app.use("/api/actor/download-actor/", downloadActor);
  app.use("/api/actor/find-by-name/", findActorByName);

  app.use("/films/", streamingVideo)

  app.post(
    "/api/upload-video-file/",
    upload.single("file"),
    downloadVideo
  );


  app.post("/api/upload-avatar-for-video/", uploadAvatar.single("avatar"), changePosterByTitle)

  const PORT = 5005;

  app.listen(
    PORT,
    console.log(
      `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
