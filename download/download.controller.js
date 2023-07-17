import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/video");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.basename(file.originalname, ".mp4") +
        "--" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1099511627776 },
});

export const downloadMoveFile = (req, res) => {
  console.log(req.body.names);
  res.json({ msg: "loaded" });
  res.status(201);
};
