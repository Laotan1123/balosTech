import { InternalServerErrorException } from "@nestjs/common";
import { UploadService } from "./upload.service";

describe("UploadService", () => {
  it("throws when the R2 config is missing", async () => {
    delete process.env.R2_ACCESS_KEY_ID;
    delete process.env.R2_SECRET_ACCESS_KEY;
    delete process.env.R2_ENDPOINT;
    delete process.env.R2_BUCKET;

    const service = new UploadService();
    await expect(
      service.createPresigned({
        fileName: "avatar.png",
        contentType: "image/png",
        sizeBytes: 5000
      })
    ).rejects.toThrow(InternalServerErrorException);
  });
});
