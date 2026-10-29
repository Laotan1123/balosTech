import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { CreateUploadDto } from "./upload.dto";

const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

@Injectable()
export class UploadService {
  private readonly client: S3Client | null;

  constructor() {
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
    const endpoint = process.env.R2_ENDPOINT;
    const bucket = process.env.R2_BUCKET;

    if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
      this.client = null;
      return;
    }

    this.client = new S3Client({
      region: "auto",
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey
      },
      forcePathStyle: true
    });
  }

  async createPresigned(dto: CreateUploadDto) {
    const bucket = process.env.R2_BUCKET;
    if (!this.client || !bucket) {
      throw new InternalServerErrorException("R2 upload configuration is missing.");
    }

    const contentType = dto.contentType ?? "image/webp";
    const sizeBytes = dto.sizeBytes ?? MAX_UPLOAD_SIZE_BYTES;

    if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
      throw new BadRequestException("Only JPEG, PNG, and WEBP uploads are allowed.");
    }

    if (sizeBytes <= 0 || sizeBytes > MAX_UPLOAD_SIZE_BYTES) {
      throw new BadRequestException(`Upload size must be between 1 byte and ${MAX_UPLOAD_SIZE_BYTES} bytes.`);
    }

    const extension = contentType === "image/png" ? "png" : contentType === "image/jpeg" ? "jpg" : "webp";
    const fileKey = `uploads/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileKey,
      ContentType: contentType,
      ACL: "public-read"
    });

    const url = await getSignedUrl(this.client, command, { expiresIn: 300 });
    return {
      urls: [url],
      fileKey
    };
  }
}
