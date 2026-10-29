import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AdminAuthGuard } from "../admin/admin-auth.guard";
import { UploadService } from "./upload.service";
import { CreateUploadDto } from "./upload.dto";

@UseGuards(AdminAuthGuard)
@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  createPresigned(@Body() dto: CreateUploadDto) {
    return this.uploadService.createPresigned(dto);
  }
}
