import express, { Request, Response } from "express";
import { multipleMediaMulter } from "../middlewares/multer.middleware";
import classService from "../services/class.service";

const router = express.Router();

router.post("/", multipleMediaMulter, async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];
  let data: any = null;

  if (files) {
    data = await classService.createMedia(files);
  }

  res.json(data);
});

export default router;
