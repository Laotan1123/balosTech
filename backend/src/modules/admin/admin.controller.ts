import { Controller, Get, UseGuards } from "@nestjs/common";
import { AdminAuthGuard } from "./admin-auth.guard";

@UseGuards(AdminAuthGuard)
@Controller("admin")
export class AdminController {
  @Get("health")
  health() {
    return {
      ok: true,
      service: "balostech-admin",
      timestamp: new Date().toISOString()
    };
  }
}
