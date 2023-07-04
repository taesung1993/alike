import CustomError from "@classes/custom-error.class";
import { Media } from "@models/media";
import cloudStorageService from "@services/cloud-storage.service";
import { Request, Response } from "express";
import { BaseError } from "sequelize";

export const getMedia = async (_: Request, res: Response) => {
  try {
    const data = await Media.findAll();
    res.status(200).json(data);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(500).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMedium = async (req: Request, res: Response) => {
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
};

export const uploadMedia = async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  const length = files.length;
  const { model } = req.body;
  let data: any = null;

  if (files) {
    try {
      const bucket = cloudStorageService.bucket;

      if (!bucket) {
        throw new CustomError({
          status: 500,
          message: "Not Connet Bucket",
        });
      }

      const media = Media.bulkBuild(new Array(length).fill({ model }));
      const promises = media.map(async (medium, index) => {
        const file = files[index];
        const name = file.originalname;
        const type = file.mimetype.split("/")[1].toLowerCase();
        const id = medium.get("id");
        const url = `dev/media/${model}/${id}.${type}`;

        const blob = bucket.file(url);
        const blobStream = blob.createWriteStream({
          resumable: false,
        });
        const filePath = `https://storage.googleapis.com/${url}`;

        await cloudStorageService.upload({
          blobStream,
          filePath,
          buffer: file.buffer,
        });

        medium.set({ url, id, name, type });
        await medium.save();

        return media;
      });

      data = await Promise.all(promises);
    } catch (error) {
      if (error instanceof BaseError) {
        return res.status(500).json({ error: error.message });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  }

  res.json(data);
};

export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const id = req.params._id as string;
    const media = await Media.findByPk(id);

    if (media) {
      const url = media.get("url");
      const file = cloudStorageService.bucket?.file(url);

      if (!file) {
        throw new CustomError({
          status: 404,
          message: "해당 미디어를 찾을 수 없습니다",
        });
      }

      const [metadata] = await file.getMetadata();
      const generation = metadata.generation;

      await cloudStorageService.bucket
        ?.file(url)
        .delete({ ifGenerationMatch: generation });
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
};
