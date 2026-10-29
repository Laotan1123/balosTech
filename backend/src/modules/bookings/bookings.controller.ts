import { Body, Controller, Post } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { BookingsService } from "./bookings.service";
import { CreateBookingDto } from "./bookings.dto";

@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  create(@Body() dto: CreateBookingDto) {
    return this.bookingsService.create(dto);
  }
}
