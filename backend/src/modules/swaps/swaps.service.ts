import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CreateSwapDto } from "./swaps.dto";

@Injectable()
export class SwapsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSwapDto) {
    const swap = await this.prisma.swap.create({
      data: {
        currentDevice: dto.currentDevice,
        condition: dto.condition,
        desiredDevice: dto.desiredDevice,
        askingPrice: dto.askingPrice,
        description: dto.description ?? null,
        imageUrls: dto.imageUrls ?? []
      }
    });

    return {
      success: true,
      swapId: swap.id,
      data: swap
    };
  }
}
