import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useEffect, useState, useRef } from 'react';
import realProducts from '../data/realProducts.json';


// --- Scroll-triggered section wrapper ---
const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Animated counter ---
const Counter = ({ target, label }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl font-black text-primary">{count.toLocaleString()}+</p>
      <p className="text-xs font-bold text-outline uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const categories = [
    { name: 'BOARDS', icon: 'developer_board', color: 'var(--color-cat-boards)', items: '45+ items', emoji: '🖥️' },
    { name: 'SENSOR MODULES', icon: 'sensors', color: 'var(--color-cat-modules)', items: '80+ items', emoji: '📡' },
    { name: 'COMPONENTS', icon: 'settings_input_component', color: 'var(--color-cat-components)', items: '200+ items', emoji: '⚡' },
    { name: 'TOOLS', icon: 'construction', color: 'var(--color-cat-tools)', items: '30+ items', emoji: '🔧' },
    { name: 'MOTORS', icon: 'motion_mode', color: 'var(--color-cat-motors)', items: '25+ items', emoji: '⚙️' },
  ];

  // Pick one product with image from each category for carousel
  const heroProducts = [
    'BOARDS', 'MOTORS', 'SENSOR MODULES', 'WIRELESS MODULES', 'DISPLAYS', 'LEDS'
  ].map(cat => realProducts.find(p => p.category === cat && p.image)).filter(Boolean);

  // Hot sales — products with discount
  const saleProducts = realProducts.filter(p => p.discount && p.originalPrice > p.price).slice(0, 10);

  // Featured — one from each major category
  const featuredProducts = [
    'BOARDS', 'MOTORS', 'SENSOR MODULES', 'COMPONENTS', 'TOOLS', 'WIRELESS MODULES', 'DISPLAYS', 'ROBOTICS'
  ].map(cat => realProducts.find(p => p.category === cat && p.image)).filter(Boolean);

  // Floating product images for hero grid
  const floatingImages = realProducts.filter(p => p.image).slice(0, 9);

  return (
    <main className="overflow-x-hidden">

      {/* ===== HERO SECTION ===== */}
      <section ref={heroRef} className="relative min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full bg-orange-50/20 -z-10" />
        
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }} 
          className="container-custom flex flex-col items-center text-center px-6 pt-32 pb-20 max-w-5xl"
        >
          {/* Header Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center space-y-6 mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-full text-orange-600 text-[10px] sm:text-xs font-black uppercase tracking-widest">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              Tamil Nadu's #1 Electronics Store
            </span>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.05] text-gray-900 max-w-4xl">
              Build Your{' '}
              <span className="relative inline-block">
                <span className="text-orange-500">Next Big</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-orange-400 origin-left rounded-full"
                />
              </span>
              <br />
              <span className="text-gray-900">Idea.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-500 leading-relaxed max-w-2xl">
              835+ electronic components, sensors, motors & kits at the best prices.
              Trusted by 5,000+ students, makers, and engineers across India.
            </p>
          </motion.div>

          {/* Centered Video Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full relative group mb-16"
          >
            <div className="absolute inset-0 bg-orange-500/5 blur-[100px] rounded-full -z-10 transition-all duration-500 group-hover:bg-orange-500/15" />
            <div className="bg-white/40 backdrop-blur-sm p-4 sm:p-6 rounded-[2.5rem] border border-orange-100 shadow-2xl overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-contain rounded-[2rem] shadow-inner"
              >
                <source src="/hero-animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-500/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl animate-pulse delay-700" />
          </motion.div>

          {/* CTA and Stats */}
          <div className="flex flex-col items-center space-y-12 w-full">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/category')}
                className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl shadow-xl shadow-orange-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3 text-lg"
              >
                Shop Now
                <span className="material-symbols-outlined font-black">arrow_forward</span>
              </button>
              <button
                onClick={() => navigate('/category?cat=NEW%20ARRIVALS')}
                className="px-10 py-5 bg-white border-2 border-orange-200 text-orange-600 font-black rounded-2xl hover:bg-orange-50 hover:border-orange-400 transition-all hover:-translate-y-1 text-lg"
              >
                New Arrivals ✨
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 sm:gap-20 pt-10 border-t border-orange-100 w-full max-w-3xl">
              <Counter target={835} label="Products" />
              <Counter target={5000} label="Happy Makers" />
              <Counter target={38} label="Districts Served" />
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-orange-400/60 flex flex-col items-center gap-1"
        >
          <p className="text-xs font-bold uppercase tracking-widest">Scroll</p>
          <span className="material-symbols-outlined text-[20px]">keyboard_arrow_down</span>
        </motion.div>
      </section>


      {/* ===== HOT SALES ===== */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <FadeInSection>
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
          </FadeInSection>

          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4">
            {saleProducts.map((product, i) => (
              <FadeInSection key={product.id} delay={i * 0.05} className="flex-shrink-0 w-[220px]">
                <ProductCard product={product} />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORY GRID ===== */}
      <section className="py-20 bg-gray-50">
        <FadeInSection className="container-custom text-center mb-14">
          <h2 className="text-4xl font-black mb-4">Shop by Category</h2>
          <p className="text-outline text-lg">Everything you need for your next build</p>
        </FadeInSection>

        <div className="container-custom grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat, i) => (
            <FadeInSection key={cat.name} delay={i * 0.1}>
              <div
                onClick={() => navigate(`/category?cat=${encodeURIComponent(cat.name)}`)}
                className="bg-white p-8 rounded-3xl border-2 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col items-center relative overflow-hidden hover:-translate-y-2"
                style={{ borderColor: `${cat.color}40` }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
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
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ===== TRUST INDICATORS ===== */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'verified', color: 'text-blue-600', bg: 'bg-blue-50', title: 'Quality Components', sub: '100% authentic and tested products' },
            { icon: 'local_shipping', color: 'text-green-600', bg: 'bg-green-50', title: 'Fast Shipping', sub: '2-3 day delivery across Tamil Nadu' },
            { icon: 'school', color: 'text-purple-600', bg: 'bg-purple-50', title: 'Educational Focus', sub: 'Trusted by 5000+ students & makers' },
          ].map((item, i) => (
            <FadeInSection key={item.title} delay={i * 0.15}>
              <div className="flex items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-full flex items-center justify-center shrink-0`}>
                  <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-black text-lg text-on-surface">{item.title}</h4>
                  <p className="text-sm text-outline">{item.sub}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-16 bg-gray-50">
        <FadeInSection className="container-custom mb-10 text-center">
          <h2 className="text-3xl font-black mb-2">Featured Products</h2>
          <p className="text-outline">Hand-picked from every category</p>
        </FadeInSection>
        <div className="container-custom grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product, i) => (
            <FadeInSection key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </FadeInSection>
          ))}
        </div>
        <FadeInSection className="container-custom mt-10 text-center">
          <button
            onClick={() => navigate('/category')}
            className="px-12 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-2xl hover:-translate-y-1 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            View All 835+ Products →
          </button>
        </FadeInSection>
      </section>
    </main>
  );
};

export default Home;
