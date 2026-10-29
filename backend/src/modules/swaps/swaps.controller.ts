import { Body, Controller, Post } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { SwapsService } from "./swaps.service";
import { CreateSwapDto } from "./swaps.dto";

@Controller("swaps")
export class SwapsController {
  constructor(private readonly swapsService: SwapsService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  create(@Body() dto: CreateSwapDto) {
    return this.swapsService.create(dto);
  }
}
