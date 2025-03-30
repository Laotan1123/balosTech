import React from 'react';
import { brands } from '../../data/brands';

interface FilterSectionProps {
  filters: {
    priceRange: string;
    brand: string;
    condition: string;
    inStock: boolean;
    showLatest: boolean;
    compatibility: string;
    specifications: {
      storage: string;
      screenSize: string;
      batteryLife: string;
    };
  };
  setFilters: (filters: any) => void;
  selectedCategory: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, setFilters, selectedCategory }) => {
  // Get relevant brands based on selected category
  const getBrandsForCategory = () => {
    switch (selectedCategory.toLowerCase()) {
      case 'phones':
        return brands.phones;
      case 'laptops':
        return brands.laptops;
      case 'tablets':
        return brands.tablets;
      case 'wearables':
        return brands.wearables;
      default:
        return [...new Set([
          ...brands.phones,
          ...brands.laptops,
          ...brands.tablets,
          ...brands.wearables
        ])].sort();
    }
  };

  const availableBrands = getBrandsForCategory();

  const updateSpecification = (key: string, value: string) => {
    setFilters({
      ...filters,
      specifications: {
        ...filters.specifications,
        [key]: value
      }
    });
  };

  return (
    <div className="bg-black rounded-xl shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-red-600 mb-2">Price Range</label>
          <select
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-white focus:border-white bg-black hover:ring-2 hover:ring-white transition-all"
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
          >
            <option value="all">All Prices</option>
            <option value="0-750000">Under ₦750,000</option>
            <option value="750000-1500000">₦750,000 - ₦1.5M</option>
            <option value="1500000-3000000">₦1.5M - ₦3M</option>
            <option value="3000000">Above ₦3M</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-red-600 mb-2">Brand</label>
          <select
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-white focus:border-white bg-black hover:ring-2 hover:ring-white transition-all"
            value={filters.brand}
            onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
          >
            <option value="all">All Brands</option>
            {availableBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-red-600 mb-2">Condition</label>
          <select
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-white focus:border-white bg-black hover:ring-2 hover:ring-white transition-all"
            value={filters.condition}
            onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
          >
            <option value="all">All Conditions</option>
            <option value="New">New</option>
            <option value="Refurbished">Refurbished</option>
            <option value="Used">Used</option>
          </select>
        </div>

        {selectedCategory === 'Accessories' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Compatible With</label>
            <select
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-white focus:border-white bg-black hover:ring-2 hover:ring-white transition-all"
              value={filters.compatibility}
              onChange={(e) => setFilters({ ...filters, compatibility: e.target.value })}
            >
              <option value="all">All Devices</option>
              <option value="iPhone">iPhone</option>
              <option value="iPad">iPad</option>
              <option value="Samsung">Samsung</option>
              <option value="MacBook">MacBook</option>
            </select>
          </div>
        )}

        {['Phones', 'Tablets', 'Laptops'].includes(selectedCategory) && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
              <select
                className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-white focus:border-white bg-black hover:ring-2 hover:ring-white transition-all"
                value={filters.specifications.storage}
                onChange={(e) => updateSpecification('storage', e.target.value)}
              >
                <option value="all">All Storage</option>
                <option value="64GB">64GB</option>
                <option value="128GB">128GB</option>
                <option value="256GB">256GB</option>
                <option value="512GB">512GB</option>
                <option value="1TB">1TB</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Screen Size</label>
              <select
                className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-white focus:border-white bg-black hover:ring-2 hover:ring-white transition-all"
                value={filters.specifications.screenSize}
                onChange={(e) => updateSpecification('screenSize', e.target.value)}
              >
                <option value="all">All Sizes</option>
                <option value="13">13" and below</option>
                <option value="14">14"</option>
                <option value="15">15"</option>
                <option value="16">16" and above</option>
              </select>
            </div>
          </>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-red-600 mb-2">Availability</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-purple-600 focus:ring-white bg-black hover:ring-2 hover:ring-white transition-all"
                checked={filters.inStock}
                onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
              />
              <span className="ml-2 text-white">In Stock Only</span>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-purple-600 focus:ring-white bg-black hover:ring-2 hover:ring-white transition-all"
                checked={filters.showLatest}
                onChange={(e) => setFilters({ ...filters, showLatest: e.target.checked })}
              />
              <span className="ml-2 text-white">Show Latest Arrivals Only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;