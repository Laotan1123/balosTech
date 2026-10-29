import { IsIn, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateUploadDto {
  @IsString()
  fileName!: string;

  @IsOptional()
  @IsString()
  @IsIn(["image/jpeg", "image/png", "image/webp"], {
    message: "Only JPEG, PNG, and WEBP uploads are allowed."
  })
  contentType?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10 * 1024 * 1024)
  sizeBytes?: number;
}
