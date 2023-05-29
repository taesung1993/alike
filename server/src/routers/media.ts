import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import { Storage } from "@google-cloud/storage";
import { format } from "util";
import { Writable } from "stream";

interface GcpUploadParameter {
  blobStream: Writable;
  filePath: string;
  buffer: Buffer;
}

const ERRORS = {
  NOT_ALLOW_MIME_TYPE: "NOT_ALLOW_MIME_TYPE",
} as const;
const gcpUpload = async ({
  blobStream,
  filePath,
  buffer,
}: GcpUploadParameter) =>
  new Promise((resolve, reject) => {
    blobStream
      .on("finish", () => {
        resolve(filePath);
      })
      .on("error", (error) => {
        reject(error);
      })
      .end(buffer);
  });

const mediaUpload = multer({
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
    files: 10,
  },
}).array("files");

const storage = new Storage({
  projectId: process.env.GCLOUD_STORAGE_BUCKET!,
  credentials: {
    client_email: process.env.GCLOUD_STORAGE_CLIENT_MAIL,
    private_key: process.env.GCLOUD_STORAGE_PRIVATE_KEY,
  },
});
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET!);
const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  mediaUpload(req, res, async function (error) {
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

    const files = req.files as Express.Multer.File[];

    if (files) {
      const file = files[0];
      const blob = bucket.file(`dev/media/class/${file.originalname}`);
      const blobStream = blob.createWriteStream({
        resumable: false,
      });
      const filePath = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      console.log(filePath);
      await gcpUpload({ blobStream, filePath, buffer: file.buffer });
    }

    res.json({ message: "성공!" });
  });
});

export default router;
