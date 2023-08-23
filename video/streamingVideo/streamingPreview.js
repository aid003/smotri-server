import asyncHandler from "express-async-handler";
import { prisma } from "../../prisma/prisma.js";
import fs from "fs";

export const streamingPreview = asyncHandler(async (req, res) => {
  const { title, preview } = req.query;


  let videoName = "";

  if (!preview) {
    const getFilm = await prisma.video.findFirst({
      where: {
        title: title,
      },
    });

    if (getFilm === null) {
      res.status(400);
      throw new Error("Video not found");
    }

    videoName = getFilm.preview;
  } else {
    videoName = preview;
  }

  // console.log(getFilm.qualityUrls[0].url)

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
