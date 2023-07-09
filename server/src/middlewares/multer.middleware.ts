import { RESPONSE_CODE } from "@config/errors";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

const ERRORS = {
  NOT_ALLOW_MIME_TYPE: "NOT_ALLOW_MIME_TYPE",
} as const;

export const mediaMulter = multer({
  storage: multer.memoryStorage(),
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
});

export const multipleMediaMulter = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadFiles = mediaMulter.array("files", 10);

  uploadFiles(req, res, async function (error) {
    if (error) {
      if (error instanceof multer.MulterError) {
        return res.json({ message: "알 수 없는 에러가 발생하였습니다." });
      }

      switch (error?.message) {
        case ERRORS.NOT_ALLOW_MIME_TYPE:
          return res.status(RESPONSE_CODE.UNSUPPORTED_MEDIA_TYPE).json({
            message: ".png, .jpg, .jpeg 형식의 파일만 업로드할 수 있습니다.",
          });
        default:
          return res
            .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
            .json({ message: "알 수 없는 에러가 발생하였습니다." });
      }
    }

    next();
  });
};
