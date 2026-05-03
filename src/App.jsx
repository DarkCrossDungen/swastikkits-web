import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Category from './pages/Category';
import Cart from './pages/Cart';
import { Login, Signup } from './pages/Auth';
import OrderTracking from './pages/OrderTracking';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import Account from './pages/Account';
import { AuthProvider } from './context/AuthContext';



import { CartProvider } from './context/CartContext';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category" element={<Category />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/track" element={<OrderTracking />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/account" element={<Account />} />
              </Routes>



            </div>
            <Footer />
            <BottomNav />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}


export default App;
