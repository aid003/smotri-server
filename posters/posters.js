import asyncHandler from "express-async-handler";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadPoster = asyncHandler(async (req, res) => {
  const posterUrl = req.url;

  try {
    res.sendFile(path.join(__dirname, "../public/posters", `${posterUrl}`));
    res.status(200);
  } catch (error) {
    res.status(400);
    throw new Error("Error to get poster");
  }
});
