import express, { Request, Response } from "express";
import multer from "multer";

const ERRORS = {
  NOT_ALLOW_MIME_TYPE: "NOT_ALLOW_MIME_TYPE",
} as const;

const upload = multer({
  dest: "uploads/",
  fileFilter: function (req, file, cb) {
    const { mimetype } = file;

    if (mimetype.match(/image\/(jpg|jpeg|png)$/)) {
      cb(null, true);
      return;
    }

    cb(new Error("NOT_ALLOW_MIME_TYPE"));
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).array("files", 2);

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  upload(req, res, function (error) {
    if (error) {
      if (error instanceof multer.MulterError) {
        console.log(error);
        return res.json({ message: "알 수 없는 에러가 발생하였습니다." });
      }

      switch (error?.message) {
        case ERRORS.NOT_ALLOW_MIME_TYPE:
          return res.status(415).json({
            message: ".png, .jpg, .jpeg 형식의 파일만 업로드할 수 있습니다.",
          });
        default:
          return res
            .status(500)
            .json({ message: "알 수 없는 에러가 발생하였습니다." });
      }
    }

    res.json({ message: "성공 하였습니다." });
  });
});

export default router;
