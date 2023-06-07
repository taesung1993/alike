import { Bucket } from "@google-cloud/storage";
import cloudStorageService from "@services/cloud-storage.service";
import { Media, MediaModel } from "@models/media";

class ClassService {
  async createMedia(files: Express.Multer.File[]) {
    const bucket = cloudStorageService.bucket;
    const length = files.length;

    if (!bucket) {
      throw new Error("에러가 발생하였습니다.");
    }

    const body: Array<{ model: MediaModel }> = Array.from({ length }, (_) => ({
      model: "class",
    }));

    const responses = await Media.bulkBuild(body);
    const promises = responses.map((media, index) =>
      this.saveMediaAndUploadCloudStorage(bucket, media, files[index])
    );
    const data = await Promise.all(promises);
    return data;
  }

  private async saveMediaAndUploadCloudStorage(
    bucket: Bucket,
    media: Media,
    file: Express.Multer.File
  ) {
    const type = file.mimetype.split("/")[1].toLowerCase();
    const id = media.get("id");
    const url = `dev/media/class/${id}.${type}`;
    media.url = url;

    await media.save();
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

    return media;
  }
}

export default new ClassService();
