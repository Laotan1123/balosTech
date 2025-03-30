import { Product } from '../types/product';

export const products: Product[] = [
  // Phones
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    category: 'Phones',
    price: 1199,
    brand: 'Apple',
    condition: 'New',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&q=80',
    stock: 5,
    addedDate: '2024-03-15'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Phones',
    price: 1199,
    brand: 'Samsung',
    condition: 'New',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1678685888468-5f8719c1dd7e?auto=format&fit=crop&q=80',
    stock: 8,
    addedDate: '2024-03-10'
  },
  {
    id: 3,
    name: 'OnePlus 12',
    category: 'Phones',
    price: 799,
    brand: 'OnePlus',
    condition: 'New',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1676911809746-85d90edbbe4a?auto=format&fit=crop&q=80',
    stock: 12,
    addedDate: '2024-03-18'
  },
  // Add more phones...

  // Laptops
  {
    id: 101,
    name: 'MacBook Pro 16" M3 Max',
    category: 'Laptops',
    price: 2499,
    brand: 'Apple',
    condition: 'New',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80',
    stock: 3,
    addedDate: '2024-03-15'
  },
  {
    id: 102,
    name: 'Dell XPS 16 (2024)',
    category: 'Laptops',
    price: 1999,
    brand: 'Dell',
    condition: 'New',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80',
    stock: 6,
    addedDate: '2024-03-14'
  },
  // Add more laptops...

  // Tablets
  {
    id: 201,
    name: 'iPad Pro 12.9" M2',
    category: 'Tablets',
    price: 1099,
    brand: 'Apple',
    condition: 'New',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80',
    stock: 7,
    addedDate: '2024-03-16'
  },
  {
    id: 202,
    name: 'Samsung Galaxy Tab S9 Ultra',
    category: 'Tablets',
    price: 1199,
    brand: 'Samsung',
    condition: 'New',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&q=80',
    stock: 4,
    addedDate: '2024-03-15'
  },
  // Add more tablets...

  // Wearables
  {
    id: 301,
    name: 'Apple Watch Ultra 2',
    category: 'Wearables',
    price: 799,
    brand: 'Apple',
    condition: 'New',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80',
    stock: 10,
    addedDate: '2024-03-17'
  },
  {
    id: 302,
    name: 'Samsung Galaxy Watch 6 Pro',
    category: 'Wearables',
    price: 449,
    brand: 'Samsung',
    condition: 'New',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80',
    stock: 8,
    addedDate: '2024-03-16'
  },
  // Add more wearables...
];