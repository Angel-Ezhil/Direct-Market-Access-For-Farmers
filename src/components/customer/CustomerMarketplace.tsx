import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory } from '../../types';
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  Calendar, 
  ShoppingCart, 
  Eye, 
  Check, 
  Sparkles, 
  IndianRupee, 
  User, 
  Plus, 
  Minus, 
  ShieldCheck, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';

export const CustomerMarketplace: React.FC = () => {
  const { products, addToCart, cart, setActiveCustomerTab } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(5);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories: (ProductCategory | 'All')[] = [
    'All',
    'Vegetables',
    'Fruits',
    'Grains',
    'Pulses',
    'Spices',
    'Leafy Vegetables',
    'Organic Products'
  ];

  const districts = ['All', 'Nashik', 'Pune', 'Ratnagiri', 'Karnal', 'Nagpur'];

  const filteredProducts = products.filter(product => {
    if (product.status === 'suspended') return false;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === 'All' || product.district === selectedDistrict;
    const matchesCategory = 
      selectedCategory === 'All' 
        ? true 
        : selectedCategory === 'Organic Products' 
        ? product.isOrganic 
        : product.category === selectedCategory;

    return matchesSearch && matchesDistrict && matchesCategory;
  });

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setOrderQuantity(Math.min(10, Math.max(1, product.quantity)));
  };

  const handleAddToCart = (product: Product, qty: number) => {
    const res = addToCart(product, qty);
    setToastMessage(res.message);
    setTimeout(() => setToastMessage(null), 3500);
    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-800 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-600 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <Check className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setActiveCustomerTab('cart')}
            className="ml-2 underline text-emerald-200 hover:text-white"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-teal-900 via-emerald-900 to-green-950 p-6 sm:p-10 text-white shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            100% Direct From Verified Farmers
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display">
            Fresh From Local Farms 🌱
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Support local farmers directly. Zero middlemen markups, harvested within hours, and delivered straight from the field to your doorstep.
          </p>

          {/* Quick filter chips */}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-300 font-medium">Trending:</span>
            <button
              onClick={() => { setSearchTerm('Tomato'); setSelectedCategory('All'); }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Nashik Tomatoes (₹35/kg)
            </button>
            <button
              onClick={() => { setSearchTerm('Alphonso'); setSelectedCategory('All'); }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              Devgad Mangoes
            </button>
            <button
              onClick={() => setSelectedCategory('Organic Products')}
              className="px-2.5 py-1 rounded-lg bg-emerald-500/30 text-emerald-200 border border-emerald-400/40"
            >
              Certified Organic
            </button>
          </div>
        </div>
      </div>

      {/* Search & District Selector */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full sm:flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search farm fresh vegetables, fruits, grains, pulses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
          />
        </div>

        {/* District Selector */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 whitespace-nowrap">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>Farm District:</span>
          </div>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm bg-white text-stone-800 focus:outline-none focus:border-teal-600 w-full sm:w-44"
          >
            {districts.map(d => (
              <option key={d} value={d}>
                {d === 'All' ? 'All Districts' : d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-teal-800 text-white shadow-sm'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-2xl border border-stone-200 text-center">
            <ShoppingCart className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">No matching farm products found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              Try adjusting your search query, selecting another district, or resetting the category filter.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSelectedDistrict('All'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-teal-800 text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProducts.map(product => {
            const isOutOfStock = product.quantity <= 0;
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo & Badges */}
                  <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {product.isOrganic && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-600 text-white shadow-xs">
                          Organic
                        </span>
                      )}
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-900/80 text-white shadow-xs">
                        {product.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-md text-[11px] font-semibold text-stone-800 flex items-center gap-1 shadow-xs">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-stone-400 font-normal">({product.reviewsCount})</span>
                    </div>

                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center text-white text-xs font-bold uppercase tracking-wider">
                        Sold Out
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2.5">
                    <div>
                      <h3 className="text-base font-bold text-stone-900 line-clamp-1 group-hover:text-teal-800 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                        <User className="w-3.5 h-3.5 text-stone-400" />
                        <span className="font-medium text-stone-700">{product.farmerName}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-stone-400" />
                          {product.district}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-stone-400" />
                        Harvest: {product.harvestDate}
                      </span>
                      <span className={`font-semibold ${product.quantity < 10 ? 'text-amber-600' : 'text-stone-700'}`}>
                        {product.quantity > 0 ? `${product.quantity} ${product.unit} left` : 'Out of stock'}
                      </span>
                    </div>

                    {/* Price banner */}
                    <div className="pt-2 flex items-baseline justify-between border-t border-stone-100">
                      <div>
                        <span className="text-xs text-stone-400">Direct Farm Price</span>
                        <div className="flex items-baseline text-lg font-extrabold text-stone-900">
                          <span>₹{product.price}</span>
                          <span className="text-xs font-normal text-stone-500 ml-1">/{product.unit}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleOpenProduct(product)}
                    className="py-2 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <button
                    disabled={isOutOfStock}
                    onClick={() => handleAddToCart(product, 1)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                      isOutOfStock
                        ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                        : 'bg-teal-700 hover:bg-teal-800 text-white shadow-xs active:scale-95'
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Product Details & Quantity Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-stone-200 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white flex items-center justify-center text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                  {selectedProduct.category}
                </span>
                <span className="text-xs text-stone-400">Harvested: {selectedProduct.harvestDate}</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-display">
                {selectedProduct.name}
              </h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                {selectedProduct.description}
              </p>
            </div>

            {/* Farm & Origin Info */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100 space-y-1.5 text-xs text-stone-600">
              <p>
                <strong className="text-stone-900">Farmer: </strong>
                {selectedProduct.farmerName}
              </p>
              <p>
                <strong className="text-stone-900">Location: </strong>
                {selectedProduct.farmLocation || 'Farm Site 1'}, {selectedProduct.district}
              </p>
              <p>
                <strong className="text-stone-900">Available Stock: </strong>
                <span className="font-bold text-stone-900">{selectedProduct.quantity} {selectedProduct.unit}</span>
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="p-4 rounded-xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-700">Select Quantity ({selectedProduct.unit}):</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold flex items-center justify-center"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-extrabold text-base text-stone-900 min-w-8 text-center">
                    {orderQuantity}
                  </span>
                  <button
                    disabled={orderQuantity >= selectedProduct.quantity}
                    onClick={() => setOrderQuantity(Math.min(selectedProduct.quantity, orderQuantity + 1))}
                    className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center ${
                      orderQuantity >= selectedProduct.quantity
                        ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {orderQuantity >= selectedProduct.quantity && (
                <p className="text-[11px] text-amber-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Maximum available farm stock reached.
                </p>
              )}

              <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
                <span className="text-stone-500">Subtotal:</span>
                <span className="text-base font-extrabold text-teal-800">
                  ₹{orderQuantity * selectedProduct.price}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="py-2.5 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
              >
                Continue Browsing
              </button>
              <button
                disabled={selectedProduct.quantity <= 0}
                onClick={() => handleAddToCart(selectedProduct, orderQuantity)}
                className="py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add {orderQuantity} {selectedProduct.unit} to Cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
