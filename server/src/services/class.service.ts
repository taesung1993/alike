import cloudStorageService from "./cloud-storage.service";
import { Media } from "../models/media";

class ClassService {
  async createMedia(files: Express.Multer.File[]) {
    const file = files[0];
    const type = file.mimetype.split("/")[1].toLowerCase();
    const bucket = cloudStorageService.bucket;

    if (!bucket) {
      throw new Error("에러가 발생하였습니다.");
    }

    const response = await Media.build({
      model: "class",
    });

    const id = response.get("id");
    const url = `dev/media/class/${id}.${type}`;
    response.url = url;

    await response.save();

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

    return response.dataValues;
  }
}

export default new ClassService();
