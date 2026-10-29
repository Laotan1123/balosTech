import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { CreateBookingDto } from "./bookings.dto";

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
    const booking = await this.prisma.booking.create({
      data: {
        deviceType: dto.deviceType,
        issue: dto.issue,
        preferredDate: dto.preferredDate,
        preferredTime: dto.preferredTime,
        contactName: dto.contactName,
        contactPhone: dto.contactPhone,
        branch: dto.branch,
        imageUrls: dto.imageUrls ?? []
      }
    });

    return {
      success: true,
      bookingId: booking.id,
      data: booking
    };
  }
}
