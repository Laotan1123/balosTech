import { PrismaService } from "../../prisma.service";
import { CreateBookingDto } from "./bookings.dto";
import { BookingsService } from "./bookings.service";

describe("BookingsService", () => {
  it("persists a booking and defaults missing image URLs to an empty list", async () => {
    const booking = { id: "booking-1", deviceType: "Phone" };
    const prisma = { booking: { create: jest.fn().mockResolvedValue(booking) } };
    const service = new BookingsService(prisma as unknown as PrismaService);
    const dto: CreateBookingDto = {
      deviceType: "Phone",
      issue: "Broken screen",
      preferredDate: "2026-11-01",
      preferredTime: "10:00",
      contactName: "Customer",
      contactPhone: "+2348000000000",
      branch: "Yaba"
    };

    await expect(service.create(dto)).resolves.toEqual({
      success: true,
      bookingId: booking.id,
      data: booking
    });
    expect(prisma.booking.create).toHaveBeenCalledWith({
      data: {
        deviceType: dto.deviceType,
        issue: dto.issue,
        preferredDate: dto.preferredDate,
        preferredTime: dto.preferredTime,
        contactName: dto.contactName,
        contactPhone: dto.contactPhone,
        branch: dto.branch,
        imageUrls: []
      }
    });
  });
});
