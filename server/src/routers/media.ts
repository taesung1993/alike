import express, { Request, Response } from "express";
import { BaseError, SequelizeScopeError } from "sequelize";
import { multipleMediaMulter } from "../middlewares/multer.middleware";
import classService from "../services/class.service";

const router = express.Router();

router.post("/", multipleMediaMulter, async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  let data: any = null;

  if (files) {
    try {
      data = await classService.createMedia(files);
    } catch (error) {
      if (error instanceof BaseError) {
        console.log(error.message);
      }
    }
  }

  res.json(data);
});

export default router;
