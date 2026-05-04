import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import realProducts from '../data/realProducts.json';

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'BOARDS', icon: 'developer_board', color: 'var(--color-cat-boards)', items: '45+ items' },
    { name: 'SENSOR MODULES', icon: 'sensors', color: 'var(--color-cat-modules)', items: '80+ items' },
    { name: 'COMPONENTS', icon: 'settings_input_component', color: 'var(--color-cat-components)', items: '200+ items' },
    { name: 'TOOLS', icon: 'construction', color: 'var(--color-cat-tools)', items: '30+ items' },
    { name: 'MOTORS', icon: 'motion_mode', color: 'var(--color-cat-motors)', items: '25+ items' },
  ];

  // Hot sales — products with discount
  const saleProducts = realProducts.filter(p => p.discount && p.originalPrice > p.price).slice(0, 10);

  // Featured — one from each major category
  const featuredProducts = [
    'BOARDS', 'MOTORS', 'SENSOR MODULES', 'COMPONENTS', 'TOOLS', 'WIRELESS MODULES', 'DISPLAYS', 'ROBOTICS'
  ].map(cat => realProducts.find(p => p.category === cat && p.image)).filter(Boolean);

  return (
    <main className="overflow-x-hidden">

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full bg-orange-50/20 -z-10" />
        
        <div className="container-custom relative z-10 pt-28 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* --- LEFT COLUMN: TEXT CONTENT --- */}
            <div className="flex flex-col items-start text-left space-y-8">
              <div className="flex flex-col items-start space-y-6">

                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.05] text-gray-900">
                  Build Your{' '}
                  <span className="relative inline-block">
                    <span className="text-orange-500">Next Big</span>
                    <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-orange-400 rounded-full" />
                  </span>
                  <br />
                  <span className="text-gray-900">Idea.</span>
                </h1>

                <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl">
                  835+ electronic components, sensors, motors & kits at the best prices.
                  Trusted by 5,000+ students, makers, and engineers across India.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 w-full">
                <button
                  onClick={() => navigate('/category')}
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-xl shadow-orange-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 text-lg"
                >
                  Shop Now
                  <span className="material-symbols-outlined font-black">arrow_forward</span>
                </button>
                <button
                  onClick={() => navigate('/category?cat=NEW%20ARRIVALS')}
                  className="px-8 py-4 bg-white border-2 border-orange-200 text-orange-600 font-black rounded-2xl hover:bg-orange-50 hover:border-orange-400 transition-all hover:-translate-y-1 text-lg"
                >
                  New Arrivals ✨
                </button>
              </div>
            </div>

            {/* --- RIGHT COLUMN: VIDEO --- */}
            <div className="relative group flex items-center justify-center lg:h-full">
              <div className="bg-white/40 backdrop-blur-sm p-4 rounded-[2.5rem] border border-orange-100 shadow-2xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto max-h-[60vh] object-contain rounded-[2rem]"
                >
                  <source src="/hero-animation.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ===== HOT SALES ===== */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black mb-2 flex items-center gap-2">
                🔥 Hot Sales
              </h2>
              <p className="text-outline text-sm">Best deals — grab them before they're gone!</p>
            </div>
            <button onClick={() => navigate('/category?cat=STOCK%20CLEARANCE')} className="text-primary font-bold hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
            {saleProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[220px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORY GRID ===== */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom text-center mb-14">
          <h2 className="text-4xl font-black mb-4">Shop by Category</h2>
          <p className="text-outline text-lg">Everything you need for your next build</p>
        </div>

        <div className="container-custom grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate(`/category?cat=${encodeURIComponent(cat.name)}`)}
              className="bg-white p-8 rounded-3xl border-2 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col items-center relative overflow-hidden hover:-translate-y-1"
              style={{ borderColor: `${cat.color}40` }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
              >
                <span className="material-symbols-outlined text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {cat.icon}
                </span>
              </div>
              <h3 className="font-display font-black text-sm text-on-surface mb-1 text-center">{cat.name}</h3>
              <p className="text-outline text-xs font-medium">{cat.items}</p>

              <div className="absolute bottom-0 left-0 right-0 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 text-center border-t"
                style={{ backgroundColor: `${cat.color}10`, borderColor: `${cat.color}30` }}>
                <span className="text-xs font-black flex items-center justify-center gap-1" style={{ color: cat.color }}>
                  Explore <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TRUST INDICATORS ===== */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'verified', color: 'text-blue-600', bg: 'bg-blue-50', title: 'Quality Components', sub: '100% authentic and tested products' },
            { icon: 'school', color: 'text-purple-600', bg: 'bg-purple-50', title: 'Educational Focus', sub: 'Trusted by 5000+ students & makers' },
            { icon: 'workspace_premium', color: 'text-orange-600', bg: 'bg-orange-50', title: 'Trusted Brands', sub: 'Premium quality engineering components' },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-full flex items-center justify-center shrink-0`}>
                <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
              </div>
              <div>
                <h4 className="font-black text-lg text-on-surface">{item.title}</h4>
                <p className="text-sm text-outline">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom mb-10 text-center">
          <h2 className="text-3xl font-black mb-2">Featured Products</h2>
          <p className="text-outline">Hand-picked from every category</p>
        </div>
        <div className="container-custom grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="container-custom mt-10 text-center">
          <button
            onClick={() => navigate('/category')}
            className="px-12 py-4 bg-orange-500 text-white font-black rounded-2xl hover:-translate-y-1 transition-all shadow-lg shadow-orange-500/20 active:scale-95"
          >
            View All 835+ Products →
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
