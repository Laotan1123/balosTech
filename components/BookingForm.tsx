"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useImageUpload } from "@/lib/useImageUpload";
import { postPublicApi } from "@/lib/public-api";
import type { BookingResponse } from "@/lib/api-contracts";
import { useToast } from "./ToastProvider";

const schema = z.object({
  deviceType: z.string().min(2, "Device type is required"),
  issue: z.string().min(5, "Please describe the issue"),
  preferredDate: z.string().min(1, "Date is required"),
  preferredTime: z.string().min(1, "Time is required"),
  contactName: z.string().min(2, "Name is required"),
  contactPhone: z.string().min(10, "Valid phone is required"),
  branch: z.string().min(1, "Select a branch")
});

type FormValues = z.infer<typeof schema>;

export default function BookingForm() {
  const { register, handleSubmit, formState, setValue, reset } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { errors, isSubmitting } = formState;
  const { upload, uploading } = useImageUpload();
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const { addToast } = useToast();

  const onSubmit = async (values: FormValues) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    try {
      const result = await postPublicApi<BookingResponse>("/bookings", {
        ...values,
        imageUrls
      });
      if (!result.success || !result.bookingId) {
        throw new Error("The booking service did not confirm your request.");
      }
      setSubmitSuccess(`Your repair request was submitted (reference ${result.bookingId}). Our team will contact you shortly to confirm the appointment.`);
      reset();
      setImageUrls([]);
      setPreviews([]);
      addToast({ title: "Booking submitted", description: "We will confirm shortly.", variant: "success" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      setSubmitError(message);
      addToast({ title: "Booking failed", description: message, variant: "error" });
    }
  };

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList) return;
    setUploadError(null);
    const files = Array.from(fileList);
    if (files.length > 4) {
      setUploadError("Choose no more than four photos.");
      return;
    }
    const invalidFile = files.find((file) =>
      !["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 10 * 1024 * 1024
    );
    if (invalidFile) {
      setUploadError("Photos must be JPEG, PNG, or WEBP and no larger than 10 MB each.");
      return;
    }
    setPreviews(files.map((file) => URL.createObjectURL(file)));
    try {
      const keys = await upload(files);
      setImageUrls(keys);
      addToast({ title: "Photos attached", variant: "success" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Photos could not be uploaded.";
      setImageUrls([]);
      setUploadError(`${message} You can still submit the booking without photos.`);
      addToast({ title: "Upload failed", description: message, variant: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-busy={isSubmitting || uploading}>
      {submitError && <p role="alert" className="rounded-lg border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">{submitError}</p>}
      {submitSuccess && <p role="status" className="rounded-lg border border-green-800 bg-green-950/30 p-3 text-sm text-green-200">{submitSuccess}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="label">Device type</span>
          <input id="booking-device-type" className="input" required aria-invalid={Boolean(errors.deviceType)} aria-describedby={errors.deviceType ? "booking-device-type-error" : undefined} {...register("deviceType")} />
          {errors.deviceType && <span id="booking-device-type-error" role="alert" className="text-xs text-red-300">{errors.deviceType.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className="label">Branch</span>
          <select id="booking-branch" className="input" required aria-invalid={Boolean(errors.branch)} aria-describedby={errors.branch ? "booking-branch-error" : undefined} {...register("branch")}>
            <option value="">Select</option>
            <option value="Surulere">Surulere</option>
            <option value="Yaba">Yaba</option>
          </select>
          {errors.branch && <span id="booking-branch-error" role="alert" className="text-xs text-red-300">{errors.branch.message}</span>}
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="label">Issue</span>
        <textarea id="booking-issue" className="input" rows={3} required aria-invalid={Boolean(errors.issue)} aria-describedby={errors.issue ? "booking-issue-error" : undefined} {...register("issue")} />
        {errors.issue && <span id="booking-issue-error" role="alert" className="text-xs text-red-300">{errors.issue.message}</span>}
      </label>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-2">
          <span className="label">Preferred date</span>
          <input id="booking-date" type="date" className="input" required aria-invalid={Boolean(errors.preferredDate)} aria-describedby={errors.preferredDate ? "booking-date-error" : undefined} {...register("preferredDate")} />
          {errors.preferredDate && <span id="booking-date-error" role="alert" className="text-xs text-red-300">{errors.preferredDate.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className="label">Preferred time</span>
          <input id="booking-time" type="time" className="input" required aria-invalid={Boolean(errors.preferredTime)} aria-describedby={errors.preferredTime ? "booking-time-error" : undefined} {...register("preferredTime")} />
          {errors.preferredTime && <span id="booking-time-error" role="alert" className="text-xs text-red-300">{errors.preferredTime.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className="label">Contact name</span>
          <input id="booking-name" className="input" placeholder="Your name" autoComplete="name" required aria-invalid={Boolean(errors.contactName)} aria-describedby={errors.contactName ? "booking-name-error" : undefined} {...register("contactName")} />
          {errors.contactName && <span id="booking-name-error" role="alert" className="text-xs text-red-300">{errors.contactName.message}</span>}
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="label">Phone</span>
        <input
          id="booking-phone"
          className="input"
          placeholder="+234..."
          inputMode="tel"
          pattern="[0-9+]*"
          autoComplete="tel"
          required
          aria-invalid={Boolean(errors.contactPhone)}
          aria-describedby={errors.contactPhone ? "booking-phone-error" : undefined}
          {...register("contactPhone", {
            onChange: (e) => setValue("contactPhone", e.target.value.replace(/[^\d+]/g, ""))
          })}
        />
        {errors.contactPhone && <span id="booking-phone-error" role="alert" className="text-xs text-red-300">{errors.contactPhone.message}</span>}
      </label>
      <div>
        <label htmlFor="booking-photos" className="label">Add photos (max 4)</label>
        <input
          id="booking-photos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={uploading || isSubmitting}
          aria-describedby={
            [uploadError && "booking-photo-error", imageUrls.length > 0 && "booking-photo-success"].filter(Boolean).join(" ") || undefined
          }
          onChange={(e) => handleFiles(e.target.files)}
          className="mt-1 text-sm text-gray-300"
        />
        <div className="mt-2 flex gap-2">
          {previews.map((src) => (
            <img key={src} src={src} alt="Preview" className="h-16 w-16 rounded-md border border-gray-700 object-cover" />
          ))}
        </div>
        {uploading && <p role="status" className="text-xs text-gray-300">Uploading photos…</p>}
        {uploadError && <p id="booking-photo-error" role="alert" className="mt-2 text-xs text-red-300">{uploadError}</p>}
        {imageUrls.length > 0 && <p id="booking-photo-success" role="status" className="mt-2 text-xs text-green-200">Photos uploaded and attached to your booking.</p>}
      </div>
      <button type="submit" className="btn" disabled={isSubmitting || uploading}>
        {isSubmitting ? "Submitting booking…" : "Book repair"}
      </button>
      {isSubmitting && <p role="status" aria-live="polite" className="text-sm text-gray-300">Submitting your repair request…</p>}
    </form>
  );
}
