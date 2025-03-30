export interface Product {
  id: number;
  name: string;
  category: 'Phones' | 'Laptops' | 'Tablets' | 'Wearables' | 'Gadgets' | 'Accessories';
  price: number;
  brand: string;
  condition: 'New' | 'Refurbished' | 'Used';
  rating: number;
  image: string;
  stock: number;
  addedDate: string;
  specifications?: {
    storage?: string;
    screenSize?: string;
    batteryLife?: string;
    processor?: string;
    ram?: string;
    camera?: string;
    connectivity?: string[];
    os?: string;
  };
  compatibility?: string[];
  description?: string;
  features?: string[];
}