export type EstimateFormData = {
  device: "iPhone 13" | "iPhone 12" | "Samsung S22" | "Samsung S21" | "Google Pixel 6";
  condition: string;
  batteryHealth: string;
  batteryScreenshot: File | null;
  receipt: File | null;
  devicePhotos: {
    front: File | null;
    back: File | null;
    leftSide: File | null;
    rightSide: File | null;
  };
  problems: string;
  unlockStatus: string;
  previousRepairs: string;
  repairDetails: string;
}; 