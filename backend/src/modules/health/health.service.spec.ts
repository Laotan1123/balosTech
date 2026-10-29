import { Logger, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";
import { HealthService } from "./health.service";

describe("HealthService", () => {
  it("reports readiness when the database responds", async () => {
    const prisma = { $queryRaw: jest.fn().mockResolvedValue([{ "?column?": 1 }]) };
    const service = new HealthService(prisma as unknown as PrismaService);

    await expect(service.readiness()).resolves.toEqual({
      status: "ok",
      checks: { database: "ok" }
    });
    expect(prisma.$queryRaw).toHaveBeenCalled();
  });

  it("returns an unavailable error when the database check fails", async () => {
    const prisma = { $queryRaw: jest.fn().mockRejectedValue(new Error("offline")) };
    const service = new HealthService(prisma as unknown as PrismaService);
    const errorLog = jest.spyOn(Logger.prototype, "error").mockImplementation(() => undefined);

    try {
      await expect(service.readiness()).rejects.toThrow(ServiceUnavailableException);
      expect(errorLog).toHaveBeenCalledWith(
        "Database readiness check failed.",
        expect.any(String)
      );
    } finally {
      errorLog.mockRestore();
    }
  });
});
