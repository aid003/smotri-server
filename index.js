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

const prisma = new PrismaClient();
const app = express();

async function main() {
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use("/api/download-video/", downloadVideo);
  app.use("/api/get-films/", getAllPublishedFilms);
  app.use("/api/get-film/", getFilmByTitle);
  app.use("/api/get-titles/", getAllTitles);
  app.use("/api/get-films-ankets/", getFilmsAnkets);

  app.use("/api/actor/download-actor/", downloadActor);
  app.use("/api/actor/find-by-name/", findActorByName)

  const PORT = process.env.PORT || 5000;

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
