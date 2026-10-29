"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/lib/cart";
import { formatNGN, normalizePhoneNumberToPlus234 } from "@/lib/format";
import { initFlutterwaveCheckout, initPaystackCheckout } from "@/lib/payments";
import { useToast } from "./ToastProvider";

const fieldErrorId = (field: keyof CheckoutValues) => `checkout-${field}-error`;

const schema = z.object({
  fulfillment: z.enum(["shipping", "pickup"]),
  address: z.string().optional(),
  city: z.string().optional(),
  contactEmail: z.string().email("Valid email required"),
  contactPhone: z.string().min(10, "Valid phone required")
}).superRefine((values, context) => {
  if (values.fulfillment === "shipping" && !values.address?.trim()) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["address"], message: "Address is required for shipping" });
  }
  if (values.fulfillment === "shipping" && !values.city?.trim()) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["city"], message: "City is required for shipping" });
  }
});

type CheckoutValues = z.infer<typeof schema>;

export default function CheckoutForm() {
  const { items, totalKobo } = useCart();
  const { addToast } = useToast();
  const [loadingProvider, setLoadingProvider] = useState<"paystack" | "flutterwave" | null>(null);
  const { register, handleSubmit, watch, formState } = useForm<CheckoutValues>({
    resolver: zodResolver(schema),
    defaultValues: { fulfillment: "shipping" }
  });
  const { errors } = formState;
  const fulfillment = watch("fulfillment");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCheckout = async (values: CheckoutValues, provider: "paystack" | "flutterwave") => {
    if (!items.length) {
      setSubmitError("Your cart is empty. Add a product before checkout.");
      return;
    }
    setSubmitError(null);
    setLoadingProvider(provider);
    try {
      const payload = {
        items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })),
        email: values.contactEmail,
        phone: normalizePhoneNumberToPlus234(values.contactPhone),
        fulfillment: values.fulfillment,
        address: values.address,
        city: values.city
      };
      const response =
        provider === "paystack"
          ? await initPaystackCheckout(payload)
          : await initFlutterwaveCheckout(payload);

      if (!response.checkoutUrl) {
        throw new Error("Payment provider did not return a checkout URL.");
      }
      addToast({ title: "Redirecting to checkout", variant: "success" });
      window.location.href = response.checkoutUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Please try again.";
      setSubmitError(message);
      addToast({ title: "Payment init failed", description: message, variant: "error" });
    } finally {
      setLoadingProvider(null);
    }
  };

  const onSubmit = (values: CheckoutValues) => {
    // default to Paystack if user clicks plain submit
    return handleCheckout(values, "paystack");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate aria-busy={loadingProvider !== null}>
      {submitError && <p role="alert" className="rounded-lg border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">{submitError}</p>}
      <fieldset className="space-y-2">
        <legend className="label">Fulfillment method</legend>
        <div className="flex gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-100">
            <input type="radio" value="shipping" required {...register("fulfillment")} />
            Shipping
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-100">
            <input type="radio" value="pickup" {...register("fulfillment")} />
            Pickup
          </label>
        </div>
      </fieldset>
      {fulfillment === "shipping" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="label">Address</span>
            <input
              className="input"
              required={fulfillment === "shipping"}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? fieldErrorId("address") : undefined}
              {...register("address")}
            />
            {errors.address && <span id={fieldErrorId("address")} role="alert" className="text-xs text-red-300">{errors.address.message}</span>}
          </label>
          <label className="flex flex-col gap-2">
            <span className="label">City</span>
            <input
              className="input"
              required={fulfillment === "shipping"}
              aria-invalid={Boolean(errors.city)}
              aria-describedby={errors.city ? fieldErrorId("city") : undefined}
              {...register("city")}
            />
            {errors.city && <span id={fieldErrorId("city")} role="alert" className="text-xs text-red-300">{errors.city.message}</span>}
          </label>
        </div>
      ) : (
        <p className="text-sm text-gray-300">Pickup at Lekki or Ikeja branch. We will confirm availability.</p>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="label">Email</span>
          <input
            type="email"
            className="input"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.contactEmail)}
            aria-describedby={errors.contactEmail ? fieldErrorId("contactEmail") : undefined}
            {...register("contactEmail")}
          />
          {errors.contactEmail && <span id={fieldErrorId("contactEmail")} role="alert" className="text-xs text-red-300">{errors.contactEmail.message}</span>}
        </label>
        <label className="flex flex-col gap-2">
          <span className="label">Phone</span>
          <input
            type="tel"
            className="input"
            autoComplete="tel"
            required
            aria-invalid={Boolean(errors.contactPhone)}
            aria-describedby={errors.contactPhone ? fieldErrorId("contactPhone") : undefined}
            {...register("contactPhone")}
          />
          {errors.contactPhone && <span id={fieldErrorId("contactPhone")} role="alert" className="text-xs text-red-300">{errors.contactPhone.message}</span>}
        </label>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-brand-charcoal px-4 py-3">
        <div>
          <p className="text-sm text-gray-400">Order total</p>
          <p className="text-xl font-bold text-white">{formatNGN(totalKobo())}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn-secondary"
            disabled={loadingProvider !== null}
            onClick={handleSubmit((values) => handleCheckout(values, "flutterwave"))}
          >
            {loadingProvider === "flutterwave" ? "Connecting to Flutterwave…" : "Pay with Flutterwave"}
          </button>
          <button type="submit" className="btn" disabled={loadingProvider !== null}>
            {loadingProvider === "paystack" ? "Connecting to Paystack…" : "Pay with Paystack"}
          </button>
        </div>
      </div>
      {loadingProvider && (
        <p role="status" aria-live="polite" className="text-sm text-gray-300">
          Connecting to {loadingProvider === "paystack" ? "Paystack" : "Flutterwave"}. Your cart will remain saved until payment is confirmed.
        </p>
      )}
    </form>
  );
}
