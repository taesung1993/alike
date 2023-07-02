import express, { Request, Response } from "express";
import { BaseError } from "sequelize";
import { multipleMediaMulter } from "@middlewares/multer.middleware";
import classService from "@services/class.service";
import { Media } from "@models/media";
import CustomError from "@classes/custom-error.class";
import { authMiddleware } from "@middlewares/auth.middleware";
import cloudStorageService from "@services/cloud-storage.service";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await Media.findAll();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(500).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:_id", async (req: Request, res: Response) => {
  try {
    const id = req.params._id as string | undefined;
    const data = await Media.findByPk(id);

    res.status(200).json(data);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(500).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", multipleMediaMulter, async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const { model } = req.body;
  let data: any = null;

  if (files) {
    try {
      console.log("model:", model);
      switch (model) {
        case "class":
          // data = await classService.createMedia(files);
          break;
        case "avatar":
          const file = files[0];
          const media = await Media.build({
            model,
          });
          const bucket = cloudStorageService.bucket;
          const type = files[0].mimetype.split("/")[1].toLowerCase();
          const id = media.get("id");
          const url = `dev/media/avatar/${id}.${type}`;
          const blob = bucket!.file(url);

          const blobStream = blob.createWriteStream({
            resumable: false,
          });
          const filePath = `https://storage.googleapis.com/${url}`;

          await cloudStorageService.upload({
            blobStream,
            filePath,
            buffer: file.buffer,
          });

          media.url = url;
          await media.save();

          console.log(media);

          break;
      }
    } catch (error) {
      if (error instanceof BaseError) {
        return res.status(500).json({ error: error.message });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  }

  res.json(data);
});

router.delete("/:_id", async (req: Request, res: Response) => {
  try {
    const id = req.params._id as string;
    const media = await Media.findByPk(id);

    if (media) {
      await media?.destroy({ force: true });
      return res.status(200).json({ message: "success" });
    }

    throw new CustomError({
      status: 404,
      message: "해당 미디어를 찾을 수 없습니다",
    });
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(500).json({ error: error.message });
    }

    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    res.status(500).json({ error: error || "Internal server error" });
  }
});

export default router;
