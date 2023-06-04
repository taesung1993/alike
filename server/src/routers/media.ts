import express, { Request, Response } from "express";
import { BaseError } from "sequelize";
import { multipleMediaMulter } from "../middlewares/multer.middleware";
import classService from "../services/class.service";
import { Media } from "../models/media";

const router = express.Router();

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
  let data: any = null;

  if (files) {
    try {
      data = await classService.createMedia(files);
    } catch (error) {
      if (error instanceof BaseError) {
        return res.status(500).json({ error: error.message });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  }

  res.json(data);
});

export default router;
