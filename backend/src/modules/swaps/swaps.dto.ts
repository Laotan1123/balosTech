import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSwapDto {
  @IsString()
  currentDevice!: string;

  @IsString()
  condition!: string;

  @IsString()
  desiredDevice!: string;

  @IsNumber()
  askingPrice!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  imageUrls?: string[];
}
