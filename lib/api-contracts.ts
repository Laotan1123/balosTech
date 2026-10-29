export type Condition = "New" | "Refurbished" | "Used";

export type ProductDTO = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  description: string;
  specs: string[];
  condition: Condition;
  priceKobo: number;
  images: string[];
  tags?: string[];
  inStock: boolean;
};

export type BookingDTO = {
  id?: string;
  deviceType: string;
  issue: string;
  preferredDate: string;
  preferredTime: string;
  contactName: string;
  contactPhone: string;
  branch: string;
  imageUrls?: string[];
};

export type SwapDTO = {
  id?: string;
  currentDevice: string;
  condition: Condition | "Fair" | "Needs Repair";
  desiredDevice: string;
  askingPrice: number;
  description?: string;
  imageUrls?: string[];
};

export type ApiError = {
  message: string;
  code?: string;
};

export type ProductListResponse = {
  products: ProductDTO[];
  total: number;
};

export type ProductResponse = {
  product: ProductDTO;
};

export type CheckoutResponse = {
  checkoutUrl?: string;
  orderId?: string;
  sessionId?: string;
  reference?: string;
  error?: ApiError;
};

export type OrderStatusResponse = {
  id: string;
  status: "Pending" | "Paid" | "Failed";
  totalKobo: number;
  createdAt: string;
  paidAt: string | null;
};

export type BookingResponse = {
  success: boolean;
  bookingId?: string;
  error?: ApiError;
};

export type SwapResponse = {
  success: boolean;
  swapId?: string;
  error?: ApiError;
};

export type UploadResponse = {
  urls: string[];
  error?: ApiError;
};
