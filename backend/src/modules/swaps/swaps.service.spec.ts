import { PrismaService } from "../../prisma.service";
import { CreateSwapDto } from "./swaps.dto";
import { SwapsService } from "./swaps.service";

describe("SwapsService", () => {
  it("persists a swap and normalizes optional fields", async () => {
    const swap = { id: "swap-1", currentDevice: "Phone" };
    const prisma = { swap: { create: jest.fn().mockResolvedValue(swap) } };
    const service = new SwapsService(prisma as unknown as PrismaService);
    const dto: CreateSwapDto = {
      currentDevice: "Phone",
      condition: "Used",
      desiredDevice: "New phone",
      askingPrice: 100_000
    };

    await expect(service.create(dto)).resolves.toEqual({
      success: true,
      swapId: swap.id,
      data: swap
    });
    expect(prisma.swap.create).toHaveBeenCalledWith({
      data: {
        currentDevice: dto.currentDevice,
        condition: dto.condition,
        desiredDevice: dto.desiredDevice,
        askingPrice: dto.askingPrice,
        description: null,
        imageUrls: []
      }
    });
  });
});
