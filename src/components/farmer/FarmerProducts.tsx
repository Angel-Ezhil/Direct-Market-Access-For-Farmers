import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, ProductCategory } from '../../types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Check, 
  X, 
  Package, 
  IndianRupee, 
  Calendar, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';

export const FarmerProducts: React.FC = () => {
  const { products, currentUser, addProduct, updateProduct, deleteProduct, farmers } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Vegetables');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(100);
  const [unit, setUnit] = useState<'kg' | 'quintal' | 'bunch' | 'box' | 'dozen'>('kg');
  const [price, setPrice] = useState<number>(35);
  const [harvestDate, setHarvestDate] = useState('2026-09-30');
  const [district, setDistrict] = useState('Nashik');
  const [farmLocation, setFarmLocation] = useState('Green Acres Sector 4');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80');
  const [isOrganic, setIsOrganic] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Inline edit state for quick stock update
  const [quickStockEditId, setQuickStockEditId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);

  const categories: ProductCategory[] = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Pulses',
    'Spices',
    'Leafy Vegetables',
    'Organic Products'
  ];

  // Filter products belonging to current farmer (or show all if demo farmer)
  const currentFarmerId = currentUser?.id || 'farmer-1';
  const myProducts = products.filter(p => p.farmerId === currentFarmerId || p.farmerName === (currentUser?.name || 'Suresh Patel'));

  const handleOpenAddModal = (presetTomato = false) => {
    if (presetTomato) {
      setName('Vine-Ripened Country Tomatoes');
      setCategory('Vegetables');
      setDescription('Freshly picked farm tomatoes, pesticide free and sun ripened.');
      setQuantity(100);
      setUnit('kg');
      setPrice(35);
      setHarvestDate('2026-09-30');
      setDistrict('Nashik');
      setFarmLocation('Green Acres Plot 3');
      setImage('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80');
      setIsOrganic(true);
    } else {
      setName('');
      setCategory('Vegetables');
      setDescription('');
      setQuantity(50);
      setUnit('kg');
      setPrice(40);
      setHarvestDate(new Date().toISOString().split('T')[0]);
      setDistrict('Nashik');
      setFarmLocation('Nashik Farm Unit');
      setImage('https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80');
      setIsOrganic(true);
    }
    setEditingProductId(null);
    setError(null);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Product name is required');
      return;
    }
    if (quantity <= 0 || price <= 0) {
      setError('Quantity and price must be greater than zero');
      return;
    }

    if (editingProductId) {
      updateProduct(editingProductId, {
        name,
        category,
        description,
        quantity,
        unit,
        price,
        harvestDate,
        district,
        farmLocation,
        image,
        isOrganic
      });
    } else {
      addProduct({
        name,
        category,
        description,
        quantity,
        initialQuantity: quantity,
        unit,
        price,
        harvestDate,
        district,
        farmLocation,
        image,
        isOrganic
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-display">
            My Harvest Catalog & Stock
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Products published here are immediately visible to local customers in the Marketplace.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick 1-click tomato button for testing prompt flow */}
          <button
            onClick={() => handleOpenAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-semibold transition-colors border border-emerald-300/50"
            title="Pre-fill 100 kg Tomato at ₹35/kg as described in prompt"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Preset: Tomato 100kg @ ₹35</span>
          </button>

          <button
            onClick={() => handleOpenAddModal(false)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProducts.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-2xl border border-stone-200 text-center">
            <Package className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">No products listed yet</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1 mb-4">
              Add your freshly harvested crops to start receiving orders directly from consumers.
            </p>
            <button
              onClick={() => handleOpenAddModal(true)}
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold shadow"
            >
              Add 100kg Tomato Preset
            </button>
          </div>
        ) : (
          myProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    {product.isOrganic && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-600/90 text-white shadow-xs backdrop-blur-xs">
                        Organic
                      </span>
                    )}
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-stone-900/80 text-white shadow-xs backdrop-blur-xs">
                      {product.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm text-xs font-bold text-stone-900 flex items-center gap-0.5">
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>{product.price}</span>
                    <span className="text-stone-500 font-normal">/{product.unit}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-stone-900 line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-0.5">{product.description}</p>
                  </div>

                  {/* Stock counter */}
                  <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-stone-400 block">Available Stock</span>
                      {quickStockEditId === product.id ? (
                        <div className="flex items-center gap-1 mt-1">
                          <input
                            type="number"
                            value={tempStockValue}
                            onChange={(e) => setTempStockValue(Number(e.target.value))}
                            className="w-16 px-1.5 py-0.5 text-xs bg-white border border-stone-300 rounded font-bold"
                          />
                          <button
                            onClick={() => {
                              updateProduct(product.id, { quantity: tempStockValue });
                              setQuickStockEditId(null);
                            }}
                            className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => setQuickStockEditId(null)}
                            className="p-1 rounded bg-stone-200 text-stone-600 hover:bg-stone-300"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className={`font-bold text-sm ${product.quantity < 10 ? 'text-amber-600' : 'text-stone-900'}`}>
                          {product.quantity} {product.unit}
                          {product.quantity < 10 && (
                            <span className="ml-1 text-[10px] text-amber-600 font-normal">(Low stock)</span>
                          )}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setQuickStockEditId(product.id);
                        setTempStockValue(product.quantity);
                      }}
                      className="text-xs font-semibold text-emerald-700 hover:underline"
                    >
                      Update Stock
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Harvested: {product.harvestDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {product.district}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 pt-0 flex items-center justify-between gap-2 border-t border-stone-100 mt-2">
                <button
                  onClick={() => {
                    setName(product.name);
                    setCategory(product.category);
                    setDescription(product.description);
                    setQuantity(product.quantity);
                    setUnit(product.unit);
                    setPrice(product.price);
                    setHarvestDate(product.harvestDate);
                    setDistrict(product.district);
                    setFarmLocation(product.farmLocation);
                    setImage(product.image);
                    setIsOrganic(product.isOrganic);
                    setEditingProductId(product.id);
                    setIsModalOpen(true);
                  }}
                  className="flex-1 py-1.5 px-3 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Product</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Remove ${product.name} from catalog?`)) {
                      deleteProduct(product.id);
                    }
                  }}
                  className="p-2 rounded-lg border border-stone-200 hover:border-red-200 text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Delete product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-stone-200 max-w-xl w-full p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <h3 className="text-lg font-bold text-stone-900">
                {editingProductId ? 'Edit Product' : 'Add Fresh Produce to Marketplace'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="my-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Country Red Tomatoes"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Farming Method</label>
                  <label className="flex items-center gap-2 py-2 text-xs font-medium text-stone-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isOrganic}
                      onChange={(e) => setIsOrganic(e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                    />
                    <span>Certified Organic / Zero Chemical</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Total Quantity Available</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Unit of Measurement</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="quintal">Quintal (100 kg)</option>
                    <option value="bunch">Bunch / Jodi</option>
                    <option value="dozen">Dozen</option>
                    <option value="box">Crate / Box (10-15 kg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Price per {unit} (₹)</label>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="number"
                      min="1"
                      required
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Harvest Date</label>
                  <input
                    type="date"
                    required
                    value={harvestDate}
                    onChange={(e) => setHarvestDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">District</label>
                  <input
                    type="text"
                    required
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Farm Location / Plot</label>
                  <input
                    type="text"
                    required
                    value={farmLocation}
                    onChange={(e) => setFarmLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Product Image URL</label>
                  <input
                    type="url"
                    required
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Product Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Freshness, variety, taste profile, and harvest notes..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm"
                >
                  {editingProductId ? 'Update Product' : 'Publish Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
