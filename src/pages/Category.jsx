import { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Fuse from 'fuse.js';
import realProducts from '../data/realProducts.json';

// All unique categories from the real scraped data
const ALL_CATEGORIES = [
  'All',
  'BOARDS',
  'SENSOR MODULES',
  'SENSOR ONLY (WITHOUT MODULE)',
  'MOTOR DRIVERS',
  'MOTORS',
  'COMPONENTS',
  'WIRELESS MODULES',
  'POWER BOARDS',
  'OTHER MODULES',
  'DISPLAYS',
  'LEDS',
  'RELAY MODULES, RELAYS',
  'ROBOTICS',
  'BATTERIES',
  'BATTERY HOLDERS',
  'RESISTORS (SEPARATED VALUES)',
  'CAPACITORS (SEPARATED VALUES)',
  'ICS',
  'JUMPERS - WIRES - CABLES',
  'TOOLS',
  'BASIC TOOLS',
  'WHEELS',
  'AUDIO RELATED',
  'SOLDERING',
  'VOLTMETERS',
  'BIOMEDICAL',
  'SWASTIK KITS',
  'NEW ARRIVALS',
  'STOCK CLEARANCE',
  'LIMITED OFFER 🔥',
  'KIDS SUMMER SALE',
];

const Category = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const catFromUrl = params.get('cat');
  const searchFromUrl = params.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(catFromUrl || 'All');
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);

  // Sync category from URL when navigating from Home page
  useEffect(() => {
    if (catFromUrl) setSelectedCategory(catFromUrl);
    if (searchFromUrl) setSearchQuery(searchFromUrl);
  }, [catFromUrl, searchFromUrl]);

  // Filter products using Fuse.js for fuzzy search + category filter
  const filteredProducts = useMemo(() => {
    let data = selectedCategory === 'All'
      ? realProducts
      : realProducts.filter(p => p.category === selectedCategory);

    if (searchQuery.trim().length > 0) {
      const fuse = new Fuse(data, {
        keys: ['name', 'category', 'code', 'description'],
        threshold: 0.4,
        distance: 100,
      });
      data = fuse.search(searchQuery).map(r => r.item);
    }

    return data;
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setSearchQuery('');
    navigate(`/category?cat=${encodeURIComponent(cat)}`);
  };

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container-custom">
        <header className="mb-10">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">Explore Our Collection</p>
          <h1 className="text-4xl font-black text-on-surface mb-6">
            {selectedCategory === 'All' ? 'All Engineering Kits' : selectedCategory}
          </h1>
          <p className="text-outline text-sm mb-6">{filteredProducts.length} products found</p>

          {/* Search bar on category page */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within this category..."
            className="w-full max-w-md px-5 py-3 rounded-2xl border border-outline-variant bg-white outline-none focus:ring-2 focus:ring-primary/30 text-sm mb-6"
          />

          {/* Category filter buttons */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-5 py-2.5 rounded-2xl font-black text-xs transition-all whitespace-nowrap border-2 ${
                  selectedCategory === cat
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white border-outline-variant text-outline hover:border-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center">
            <span className="material-symbols-outlined text-6xl text-outline mb-4">search_off</span>
            <p className="text-outline font-bold text-xl">No products found</p>
            <button onClick={() => handleCategorySelect('All')} className="mt-6 btn-primary px-8 py-3">
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Category;
