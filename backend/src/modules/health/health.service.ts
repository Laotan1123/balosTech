import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private readonly prisma: PrismaService) {}

  async readiness() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: "ok", checks: { database: "ok" } };
    } catch (error: unknown) {
      this.logger.error(
        "Database readiness check failed.",
        error instanceof Error ? error.stack : undefined
      );
      throw new ServiceUnavailableException("Database is unavailable.");
    }
  }
}
