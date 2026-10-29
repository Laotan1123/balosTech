import { IsArray, IsOptional, IsString } from "class-validator";

export class CreateBookingDto {
  @IsString()
  deviceType!: string;

  @IsString()
  issue!: string;

  @IsString()
  preferredDate!: string;

  @IsString()
  preferredTime!: string;

  @IsString()
  contactName!: string;

  @IsString()
  contactPhone!: string;

  @IsString()
  branch!: string;

  @IsOptional()
  @IsArray()
  imageUrls?: string[];
}
