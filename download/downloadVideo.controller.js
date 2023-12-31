import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/films");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1099511627776 },
});

export const downloadMoveFile = (req, res) => {
  console.log(req.file.file);
};
