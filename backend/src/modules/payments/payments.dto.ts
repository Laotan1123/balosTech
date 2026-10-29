import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  Max,
  Min,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

export enum FulfillmentMethod {
  SHIPPING = "shipping",
  PICKUP = "pickup"
}

export class CheckoutItemDto {
  @IsString()
  productId!: string;

  @IsInt()
  @Min(1)
  @Max(20)
  quantity!: number;
}

export class CreateCheckoutDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(30)
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDto)
  items!: CheckoutItemDto[];

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(7)
  phone!: string;

  @IsEnum(FulfillmentMethod)
  fulfillment!: FulfillmentMethod;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;
}

export class PaystackInitDto extends CreateCheckoutDto {}

export class FlutterwaveInitDto extends CreateCheckoutDto {}
