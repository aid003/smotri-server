import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import {
  changeFildsToFilm,
  deleteAllPublishedFilms,
  deleteFilmByTitle,
  downloadVideo,
  getAllFields,
  getAllPublishedFilms,
  getAllTitles,
  getFilmByTitle,
  getFilmsAnkets,
} from "./video/video.controller.js";
import { upload } from "./download/downloadVideo.controller.js";
import { streamingVideo } from "./video/streamingVideo/streaming.js";
import {
  changePosterByTitle,
  uploadAvatar,
} from "./download/downloadAvatar.controller.js";
import {
  getUserInfo,
  loginUserWithEmail,
  loginUserWithToken,
  registerUser,
} from "./users/users.controller.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { uploadPoster } from "./posters/posters.js";
import {
  addFilms,
  createNewFilmEntryToDb,
  downloadMorePhotos,
  downloadPreview,
  getAllFilmsTitles,
} from "./video/newVideo.controller.js";
import { streamingPreview } from "./video/streamingVideo/streamingPreview.js";

const prisma = new PrismaClient();
const app = express();
dotenv.config();

async function main() {
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false, limit: "4000000kb" }));
  app.use(cookieParser());
  app.use(morgan("tiny"));
  app.use(express.static("/public"));
  app.use("/api/get-films/", getAllPublishedFilms);
  app.use("/api/get-film/", getFilmByTitle);
  app.use("/api/get-titles/", getAllTitles);
  app.use("/api/get-films-ankets/", getFilmsAnkets);
  app.use("/api/delete-film-by-title/", deleteFilmByTitle);
  app.use("/api/delete-all-published-films/", deleteAllPublishedFilms);
  app.use("/api/get-all-feilds/", getAllFields);
  app.use("/api/change-film-fields/", changeFildsToFilm);
  app.use("/api/upload-films-poster-to-url/", uploadPoster);

  app.use("/api/filmi/quality/", getAllFilmsTitles)

  app.use("/films/", streamingVideo);
  app.use("/film/preview/", streamingPreview);

  app.post("/api/upload-video-file/", upload.single("file"), downloadVideo);
  app.post("/api/new/", upload.single("file"), addFilms);
  app.post("/api/upload-preview-file/", upload.single("file"), downloadPreview);
  app.post(
    "/api/upload-more-photos/",
    uploadAvatar.single("file"),
    downloadMorePhotos
  );

  app.post("/api/test-create-entry/", createNewFilmEntryToDb);

  app.post(
    "/api/upload-avatar-for-video/",
    uploadAvatar.single("avatar"),
    changePosterByTitle
  );

  app.use("/api/register-user/", registerUser);
  app.use("/api/login-user-with-token/", loginUserWithToken);
  app.use("/api/login-user-with-login/", loginUserWithEmail);
  app.use("/api/get-user-info", getUserInfo);

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

