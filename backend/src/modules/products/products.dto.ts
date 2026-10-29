import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";

export enum Condition {
  NEW = "New",
  REFURBISHED = "Refurbished",
  USED = "Used"
}

export class ProductQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsEnum(Condition, { message: "condition must be New, Refurbished, or Used" })
  condition?: Condition;

  @IsOptional()
  @IsNumberString()
  min?: string;

  @IsOptional()
  @IsNumberString()
  max?: string;

  @IsOptional()
  @IsNumberString()
  page?: string;
}

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  specs: string[];
  condition: Condition;
  priceKobo: number;
  images: string[];
  tags?: string[];
  inStock: boolean;
};
