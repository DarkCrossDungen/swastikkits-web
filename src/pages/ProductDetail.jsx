import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import realProducts from '../data/realProducts.json';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Instant lookup — no Firebase, no loading state
  const product = realProducts.find(p => String(p.id) === String(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="material-symbols-outlined text-6xl text-outline">search_off</span>
        <p className="text-xl font-bold text-outline">Product not found</p>
        <button onClick={() => navigate('/category')} className="btn-primary px-8 py-3">Browse Products</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    navigate('/checkout');
  };

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container-custom max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-outline mb-8 font-medium">
          <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <button onClick={() => navigate(`/category?cat=${encodeURIComponent(product.category)}`)} className="hover:text-primary transition-colors">{product.category}</button>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface font-bold truncate max-w-[200px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div
            className="aspect-square bg-white rounded-3xl flex items-center justify-center border border-outline-variant/40 overflow-hidden relative shadow-sm"
          >
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4" />
            ) : (
              <div className="text-center text-outline p-8">
                <span className="material-symbols-outlined text-8xl mb-3 block">inventory_2</span>
                <p className="font-black text-2xl uppercase tracking-widest">{product.code}</p>
                <p className="text-sm font-bold mt-1">PRODUCT IMAGE</p>
              </div>
            )}
            {product.discount && (
              <div className="absolute top-6 left-6 bg-red-500 text-white text-sm font-black px-4 py-2 rounded-full tracking-wider shadow-md">
                {product.discount} OFF
              </div>
            )}
          </div>

          {/* Product Info */}
          <div
            className="flex flex-col"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-surface-container-low text-outline text-[10px] font-black uppercase tracking-widest rounded-full border border-outline-variant/30">
                  CODE: {product.code}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-on-surface mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-5xl font-black text-primary">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-2xl text-outline line-through font-bold">₹{product.originalPrice}</span>
                    <span className="text-lg font-black text-green-600">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="mb-8">
                <p className="text-sm font-bold text-on-surface mb-3 uppercase tracking-wider">Quantity</p>
                <div className="flex items-center gap-4 bg-surface-container-low w-fit p-1.5 rounded-2xl border border-outline-variant/50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-on-surface hover:text-primary transition-colors font-bold text-xl"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-black text-xl">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-on-surface hover:text-primary transition-colors font-bold text-xl"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-outline mt-2">Total: <strong>₹{product.price * quantity}</strong></p>
              </div>
            </div>

            <div className="space-y-4 mt-auto">
              <button onClick={handleAddToCart} className="w-full btn-primary h-14 text-lg flex items-center justify-center gap-3">
                <span className="material-symbols-outlined">add_shopping_cart</span>
                ADD TO CART
              </button>
              <button onClick={handleBuyNow} className="w-full btn-secondary h-14 text-lg flex items-center justify-center gap-3">
                <span className="material-symbols-outlined">bolt</span>
                BUY NOW
              </button>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-outline-variant/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-success text-[16px]">verified</span>
                  <p className="text-[10px] font-black text-outline uppercase">Quality Tested</p>
                </div>
                <div className="text-center">
                  <span className="material-symbols-outlined text-primary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <p className="text-[10px] font-black text-outline uppercase">Genuine Parts</p>
                </div>
                <div className="text-center">
                  <span className="material-symbols-outlined text-primary mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                  <p className="text-[10px] font-black text-outline uppercase">Trusted Brands</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <section className="mt-16 pt-10 border-t border-outline-variant/30">
          <div className="flex gap-8 border-b border-outline-variant/50 mb-8 overflow-x-auto no-scrollbar">
            {['description', 'specifications'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-black uppercase tracking-wider whitespace-nowrap transition-colors relative ${
                  activeTab === tab ? 'text-primary' : 'text-outline hover:text-on-surface'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[180px]">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-lg leading-relaxed text-on-surface">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="border border-outline-variant/50 rounded-2xl overflow-hidden max-w-3xl">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {Object.entries(product.specifications).map(([key, value], index) => (
                          <tr key={key} className={index % 2 === 0 ? 'bg-surface-container-low/50' : 'bg-white'}>
                            <td className="py-4 px-6 border-b border-outline-variant/30 font-bold text-on-surface capitalize w-1/3">{key}</td>
                            <td className="py-4 px-6 border-b border-outline-variant/30 text-outline">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-outline text-lg">Detailed specifications coming soon.</p>
                )}
              </div>
            )}

          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetail;
