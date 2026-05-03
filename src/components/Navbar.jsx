import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import realProducts from '../data/realProducts.json';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { getCartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      // Instant local search — no Firebase
      const fuse = new Fuse(realProducts, {
        keys: ['name', 'category', 'code', 'description'],
        threshold: 0.4,
        distance: 100
      });
      const results = fuse.search(searchQuery).map(result => result.item).slice(0, 7);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(false);
      navigate(`/category?search=${searchQuery}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="bg-white fixed top-0 w-full z-50 border-b border-outline-variant flex items-center justify-between px-4 h-16">
      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined text-outline hover:bg-surface-container-low p-2 rounded-lg transition-colors md:hidden">
          menu
        </button>
        <NavLink to="/" className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="Swastik Electronics" 
            className="h-10 object-contain"
            onError={(e) => { 
              e.target.style.display = 'none'; 
              e.target.nextElementSibling.style.display = 'flex'; 
            }} 
          />
          <div className="hidden items-center gap-2" style={{ display: 'none' }}>
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>memory</span>
            </div>
            <h1 className="font-display font-black text-2xl tracking-tighter text-primary">
              SWASTIK<span className="hidden sm:inline"> KITS</span>
            </h1>
          </div>
        </NavLink>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 font-display text-sm font-bold uppercase tracking-tight text-on-surface-variant">
        <NavLink to="/category" className={({ isActive }) => isActive ? 'text-primary' : 'hover:text-primary transition-colors'}>Boards</NavLink>
        <NavLink to="/category" className="hover:text-primary transition-colors">Modules</NavLink>
        <NavLink to="/category" className="hover:text-primary transition-colors">Components</NavLink>
        <NavLink to="/category" className="hover:text-primary transition-colors">Learning</NavLink>
      </nav>

      <div className="flex items-center gap-2">
        <div ref={searchRef} className="relative hidden lg:block mr-2">
          <form onSubmit={handleSearch} className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">search</span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearching(true);
              }}
              onFocus={() => setIsSearching(true)}
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64"
            />
          </form>

          {isSearching && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-outline-variant/30 overflow-hidden flex flex-col z-50">
              {searchResults.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                    setSearchQuery('');
                    setIsSearching(false);
                  }}
                  className="flex items-center justify-between p-3 hover:bg-surface-container-low cursor-pointer border-b border-outline-variant/20 last:border-0 transition-colors"
                >
                  <div className="flex flex-col">
                    <p className="text-sm font-bold text-on-surface line-clamp-1">
                      {product.name} <span className="text-outline font-medium">({product.code})</span>
                    </p>
                    <span className="text-primary text-[10px] font-black uppercase tracking-widest mt-0.5">[{product.category}]</span>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm font-black text-secondary">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => navigate('/category')} className="material-symbols-outlined text-outline p-2 hover:text-primary transition-colors lg:hidden">
          search
        </button>
        <NavLink to="/cart" className="relative p-2 text-primary hover:bg-surface-container-low rounded-lg transition-colors">
          <span className="material-symbols-outlined">shopping_cart</span>
          {getCartCount() > 0 && (
            <span className="absolute top-1 right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {getCartCount()}
            </span>
          )}
        </NavLink>
        
        {currentUser ? (
          <div className="flex items-center gap-2 ml-2">
            <div className="hidden sm:block text-right">
              <p className="text-[10px] font-black text-outline uppercase tracking-widest leading-none">Engineer</p>
              <p className="text-sm font-bold text-on-surface truncate max-w-[100px]">{currentUser.displayName || 'User'}</p>
            </div>
            <button 
              onClick={handleLogout}
              className="material-symbols-outlined text-outline p-2 hover:text-error transition-colors"
              title="Logout"
            >
              logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="material-symbols-outlined text-outline p-2 hover:text-primary transition-colors">
            account_circle
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
