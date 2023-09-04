import asyncHandler from "express-async-handler";
import { prisma } from "../../prisma/prisma.js";
import fs from "fs";

export const streamingVideo = asyncHandler(async (req, res) => {
  const { title, quality } = req.query;

  console.log(title, quality);
  if (!title || !quality) {
    res.status(400);
    throw new Error("invalid data");
  }

  const getFilm = await prisma.video.findMany({
    select: {
      title: title,
      qualityUrls: {
        where: {
          quality: quality,
        },
      },
    },
  });


  console.log(getFilm);

  if (getFilm === null) {
    res.status(400);
    throw new Error("Video not found");
  }


  const videoName = getFilm.qualityUrls[0].url;

  const range = req.headers.range || "0";
  const videoPath = `./public/films/${videoName}`;
  const videoSize = fs.statSync(videoPath).size;
  const chunkSize = 1 * 1e6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + chunkSize, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const stream = fs.createReadStream(videoPath, { start, end });
  stream.pipe(res);
});
