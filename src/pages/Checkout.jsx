import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/ProductService';

const Checkout = () => {
  const { cartItems, getCartTotal, getCartCount, clearCart, updateQuantity } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    pincode: '',
    district: '',
    state: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    pincode: ''
  });

  const [couponCode, setCouponCode] = useState('');

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: '', phone: '', pincode: '' };

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Warning: Email doesn't exist or is invalid format.";
      isValid = false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Warning: Must be a valid 10-digit Indian mobile number.";
      isValid = false;
    }

    const pinRegex = /^[1-9][0-9]{5}$/;
    if (!pinRegex.test(formData.pincode) && formData.pincode.length > 0) {
      newErrors.pincode = "Delivery not available for this pincode!";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const order = {
        userId: currentUser?.uid || 'guest',
        items: cartItems,
        totalAmount: getCartTotal(),
        deliveryAddress: {
          address: formData.address,
          pincode: formData.pincode,
          district: formData.district,
          state: formData.state
        },
        email: formData.email,
        phone: formData.phone,
        userName: formData.name
      };
      
      await createOrder(order);
      clearCart();
      navigate('/thank-you');
    } catch (error) {
      alert("Order failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const deliveryCharges = 140;
  const subtotal = getCartTotal();
  const totalAmount = subtotal + deliveryCharges;

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 bg-gray-50">
      <div className="container-custom max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-on-surface mb-10 text-center">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Delivery Details */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded p-6 shadow-sm border border-gray-200">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Full Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Full Name" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Email <span className="text-red-500">*</span></label>
                  <input 
                    type="email" required value={formData.email} onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if(errors.email) setErrors({...errors, email: ''});
                    }}
                    placeholder="Email Address" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Mobile Number <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" required value={formData.phone} maxLength="10" onChange={(e) => {
                      setFormData({...formData, phone: e.target.value});
                      if(errors.phone) setErrors({...errors, phone: ''});
                    }}
                    placeholder="Mobile Number" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.phone}</p>}
                  <p className="text-xs text-gray-500">Note: Please provide your active WhatsApp number.</p>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Street Address <span className="text-red-500">*</span></label>
                  <textarea 
                    required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm min-h-[80px]"
                  ></textarea>
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-700">Pincode <span className="text-red-500">*</span></label>
                  <input 
                    type="text" required value={formData.pincode} maxLength="6" onChange={(e) => {
                      setFormData({...formData, pincode: e.target.value});
                      if(errors.pincode) setErrors({...errors, pincode: ''});
                    }}
                    placeholder="Pincode" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-700">District <span className="text-red-500">*</span></label>
                  <select 
                    required value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm bg-white"
                  >
                    <option value="">Select District</option>
                    <option value="Type">📝 Type your district manually</option>
                    <optgroup label="Tamil Nadu Districts">
                      <option value="Ariyalur">Ariyalur</option>
                      <option value="Chengalpattu">Chengalpattu</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Coimbatore">Coimbatore</option>
                      <option value="Cuddalore">Cuddalore</option>
                      <option value="Dharmapuri">Dharmapuri</option>
                      <option value="Dindigul">Dindigul</option>
                      <option value="Erode">Erode</option>
                      <option value="Kallakurichi">Kallakurichi</option>
                      <option value="Kancheepuram">Kancheepuram</option>
                      <option value="Kanyakumari">Kanyakumari</option>
                      <option value="Karur">Karur</option>
                      <option value="Krishnagiri">Krishnagiri</option>
                      <option value="Madurai">Madurai</option>
                      <option value="Mayiladuthurai">Mayiladuthurai</option>
                      <option value="Nagapattinam">Nagapattinam</option>
                      <option value="Namakkal">Namakkal</option>
                      <option value="Nilgiris">Nilgiris (Ooty)</option>
                      <option value="Perambalur">Perambalur</option>
                      <option value="Pudukkottai">Pudukkottai</option>
                      <option value="Ramanathapuram">Ramanathapuram</option>
                      <option value="Ranipet">Ranipet</option>
                      <option value="Salem">Salem</option>
                      <option value="Sivaganga">Sivaganga</option>
                      <option value="Tenkasi">Tenkasi</option>
                      <option value="Thanjavur">Thanjavur</option>
                      <option value="Theni">Theni</option>
                      <option value="Thoothukudi">Thoothukudi (Tuticorin)</option>
                      <option value="Tiruchirappalli">Tiruchirappalli (Trichy)</option>
                      <option value="Tirunelveli">Tirunelveli</option>
                      <option value="Tirupattur">Tirupattur</option>
                      <option value="Tiruppur">Tiruppur</option>
                      <option value="Tiruvallur">Tiruvallur</option>
                      <option value="Tiruvannamalai">Tiruvannamalai</option>
                      <option value="Tiruvarur">Tiruvarur</option>
                      <option value="Vellore">Vellore</option>
                      <option value="Viluppuram">Viluppuram</option>
                      <option value="Virudhunagar">Virudhunagar</option>
                    </optgroup>
                  </select>
                  {formData.district === 'Type' && (
                    <input
                      type="text"
                      placeholder="Type your district name..."
                      className="w-full px-3 py-2 border border-blue-400 rounded focus:outline-none focus:border-blue-500 text-sm mt-2"
                      onChange={(e) => setFormData({...formData, district: e.target.value})}
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-sm text-gray-700">State <span className="text-red-500">*</span></label>
                  <input 
                    type="text" required value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})}
                    placeholder="State" className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>
              </div>
            </section>
            
            {/* Added Product Quantities as requested */}
            <section className="bg-white rounded p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold mb-4">Cart Items</h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded border">
                    <span className="font-medium text-sm truncate max-w-[200px]">{item.name}</span>
                    <div className="flex items-center gap-3 bg-white border rounded">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 hover:bg-gray-100">-</button>
                      <span className="text-sm font-bold min-w-[20px] text-center">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 hover:bg-gray-100">+</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary matching screenshot */}
          <div className="lg:col-span-1">
            <section className="bg-white rounded border border-gray-200 p-6 shadow-sm sticky top-24">
              <div className="space-y-3 text-sm text-gray-800">
                <div className="flex justify-between">
                  <span>Price ({getCartCount()} items)</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount (0%)</span>
                  <span className="text-green-600 font-semibold">- ₹0</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">₹{deliveryCharges}</span>
                </div>
                <div className="border-t pt-3 mt-2 flex justify-between font-bold text-base">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              {errors.pincode && (
                <div className="mt-4 text-center">
                  <p className="text-red-500 text-xs font-medium">{errors.pincode}</p>
                </div>
              )}

              <div className="mt-6 space-y-3">
                <input 
                  type="text" 
                  placeholder="Enter coupon code" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none text-sm"
                />
                <button 
                  type="button" 
                  className="w-full bg-[#82c99a] hover:bg-[#6eb585] text-white font-medium py-2 rounded transition-colors text-sm"
                >
                  Apply Coupon
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#fca56d] hover:bg-[#e8915a] text-white font-bold py-2.5 rounded transition-colors"
                >
                  {loading ? "Processing..." : "Place Order"}
                </button>
              </div>
            </section>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Checkout;
