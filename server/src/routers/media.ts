import express, { Request, Response } from "express";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/", upload.single("image"), (req: Request, res: Response) => {
  console.log(req);
  res.json({ message: "hello" });
});

export default router;
