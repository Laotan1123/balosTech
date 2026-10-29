"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useImageUpload } from "@/lib/useImageUpload";
import { postPublicApi } from "@/lib/public-api";
import type { SwapResponse } from "@/lib/api-contracts";
import { useToast } from "./ToastProvider";

const schema = z.object({
  currentDevice: z.string().min(2, "Current device is required"),
  condition: z.string().min(2, "Condition is required"),
  desiredDevice: z.string().min(2, "Desired device is required"),
  askingPrice: z.number().int("Enter a whole-number price").min(0, "Price cannot be negative"),
  description: z.string().optional()
});

type SwapValues = z.infer<typeof schema>;

export default function SwapForm() {
  const { register, handleSubmit, formState, reset } = useForm<SwapValues>({ resolver: zodResolver(schema) });
  const { errors, isSubmitting } = formState;
  const { addToast } = useToast();
  const { upload, uploading } = useImageUpload();
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onSubmit = async (values: SwapValues) => {
    setSubmitError(null);
    setSubmitSuccess(null);
    try {
      const result = await postPublicApi<SwapResponse>("/swaps", { ...values, imageUrls });
      if (!result.success || !result.swapId) {
        throw new Error("The swap service did not confirm your request.");
      }
      setSubmitSuccess(`Your swap request was submitted (reference ${result.swapId}). Our team will review the details and contact you with a quote.`);
      reset();
      setImageUrls([]);
      setPreviews([]);
      addToast({ title: "Swap submitted", description: "We will respond with a quote.", variant: "success" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Please try again.";
      setSubmitError(message);
      addToast({ title: "Swap failed", description: message, variant: "error" });
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
    } catch (error) {
      const message = error instanceof Error ? error.message : "Photos could not be uploaded.";
      setImageUrls([]);
      setUploadError(`${message} You can still submit the swap request without photos.`);
      addToast({ title: "Image upload failed", description: message, variant: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-busy={isSubmitting || uploading}>
      {submitError && <p role="alert" className="rounded-lg border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">{submitError}</p>}
      {submitSuccess && <p role="status" className="rounded-lg border border-green-800 bg-green-950/30 p-3 text-sm text-green-200">{submitSuccess}</p>}
      <label className="flex flex-col gap-2">
        <span className="label">Current device</span>
        <input id="swap-current-device" className="input" placeholder="iPhone 12, 128GB" required aria-invalid={Boolean(errors.currentDevice)} aria-describedby={errors.currentDevice ? "swap-current-device-error" : undefined} {...register("currentDevice")} />
        {errors.currentDevice && <span id="swap-current-device-error" role="alert" className="text-xs text-red-300">{errors.currentDevice.message}</span>}
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="label">Condition</span>
          <select id="swap-condition" className="input" required aria-invalid={Boolean(errors.condition)} aria-describedby={errors.condition ? "swap-condition-error" : undefined} {...register("condition")}>
            <option value="">Select</option>
            <option>New</option>
            <option>Refurbished</option>
            <option>Used</option>
            <option>Fair</option>
            <option>Needs Repair</option>
          </select>
          {errors.condition && <span id="swap-condition-error" role="alert" className="text-xs text-red-300">{errors.condition.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className="label">Desired device</span>
          <input id="swap-desired-device" className="input" placeholder="Samsung S23, Pixel 8..." required aria-invalid={Boolean(errors.desiredDevice)} aria-describedby={errors.desiredDevice ? "swap-desired-device-error" : undefined} {...register("desiredDevice")} />
          {errors.desiredDevice && <span id="swap-desired-device-error" role="alert" className="text-xs text-red-300">{errors.desiredDevice.message}</span>}
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="label">Asking price (NGN)</span>
        <input id="swap-asking-price" type="number" min="0" step="1" className="input" required aria-invalid={Boolean(errors.askingPrice)} aria-describedby={errors.askingPrice ? "swap-asking-price-error" : undefined} {...register("askingPrice", { valueAsNumber: true })} />
        {errors.askingPrice && <span id="swap-asking-price-error" role="alert" className="text-xs text-red-300">{errors.askingPrice.message}</span>}
      </label>
      <label className="flex flex-col gap-2">
        <span className="label">Description</span>
        <textarea id="swap-description" className="input" rows={3} placeholder="Include accessories, scratches, battery health..." {...register("description")} />
      </label>
      <div>
        <label htmlFor="swap-photos" className="label">Photos (up to 4)</label>
        <input
          id="swap-photos"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          disabled={uploading || isSubmitting}
          aria-describedby={
            [uploadError && "swap-photo-error", imageUrls.length > 0 && "swap-photo-success"].filter(Boolean).join(" ") || undefined
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
        {uploadError && <p id="swap-photo-error" role="alert" className="mt-2 text-xs text-red-300">{uploadError}</p>}
        {imageUrls.length > 0 && <p id="swap-photo-success" role="status" className="mt-2 text-xs text-green-200">Photos uploaded and attached to your swap request.</p>}
      </div>
      <button type="submit" className="btn" disabled={isSubmitting || uploading}>
        {isSubmitting ? "Submitting swap…" : "Submit swap"}
      </button>
      {isSubmitting && <p role="status" aria-live="polite" className="text-sm text-gray-300">Submitting your swap request…</p>}
    </form>
  );
}
