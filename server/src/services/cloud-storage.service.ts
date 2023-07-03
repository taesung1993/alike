import { Storage, Bucket } from "@google-cloud/storage";
import { Writable } from "stream";

interface UploadData {
  blobStream: Writable;
  filePath: string;
  buffer: Buffer;
}

class CloudStorageService {
  private _storage: Storage | null = null;
  private _bucket: Bucket | null = null;

  constructor() {
    this.initialStorage();
    this.initialBucket();
  }

  private initialStorage() {
    this._storage = new Storage({
      projectId: process.env.GCLOUD_STORAGE_BUCKET!,
      credentials: {
        client_email: process.env.GCLOUD_STORAGE_CLIENT_MAIL,
        private_key: process.env.GCLOUD_STORAGE_PRIVATE_KEY,
      },
    });
  }

  private initialBucket() {
    this._bucket = this._storage!.bucket(process.env.GCLOUD_STORAGE_BUCKET!);
  }

  upload({ blobStream, filePath, buffer }: UploadData) {
    return new Promise((resolve, reject) => {
      blobStream
        .on("finish", () => resolve(filePath))
        .on("error", (error) => reject(error))
        .end(buffer);
    });
  }

  delete({}) {
    this.bucket?.deleteFiles();
  }

  get bucket() {
    return this._bucket;
  }
}

export default new CloudStorageService();
