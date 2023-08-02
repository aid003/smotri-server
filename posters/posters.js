import asyncHandler from "express-async-handler";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadPoster = asyncHandler(async (req, res) => {
  const { posterUrl } = req.body;
  console.log(req.query)
  res.sendFile(path.join(__dirname, "../public/posters", `${posterUrl}`));
});
