
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen pt-28 pb-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center text-outline mb-6">
          <span className="material-symbols-outlined text-5xl">shopping_cart</span>
        </div>
        <h1 className="text-3xl font-black text-on-surface mb-4">Your cart is empty</h1>
        <p className="text-outline max-w-xs mb-10 font-medium">Looks like you haven't added any engineering kits to your workspace yet.</p>
        <NavLink to="/category" className="btn-secondary px-10 py-4">Start Shopping</NavLink>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28 pb-20 px-4">
      <div className="container-custom max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-on-surface mb-10">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl border border-outline-variant p-4 flex gap-4 items-center shadow-sm"
              >
                <div className="w-24 h-24 bg-surface-container-low rounded-2xl flex-shrink-0 flex items-center justify-center border border-outline-variant/30 overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <span className="text-xs font-black text-outline uppercase">{item.code}</span>
                  )}
                </div>
                
                <div className="flex-grow min-w-0">
                  <p className="text-[10px] font-black text-outline uppercase tracking-widest leading-none mb-1">{item.category}</p>
                  <h3 className="font-bold text-on-surface truncate">{item.name}</h3>
                  <p className="text-primary font-black text-lg">₹{item.price}</p>
                </div>

                <div className="flex items-center gap-3 bg-surface-container-low p-2 rounded-xl border border-outline-variant">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-outline hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">remove</span>
                  </button>
                  <span className="w-6 text-center font-black">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-outline hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">add</span>
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-outline hover:text-error transition-colors"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-outline-variant p-8 shadow-sm sticky top-24">
              <h2 className="text-xl font-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-outline font-bold">
                  <span>Subtotal</span>
                  <span>₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-outline font-bold">
                  <span>Shipping</span>
                  <span className="text-success uppercase tracking-widest text-xs">Calculated at checkout</span>
                </div>
                <div className="h-px bg-outline-variant/30 my-4"></div>
                <div className="flex justify-between text-on-surface text-2xl font-black">
                  <span>Total</span>
                  <span className="text-primary">₹{getCartTotal()}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full btn-secondary h-16 text-lg shadow-xl"
              >
                PROCEED TO CHECKOUT
              </button>
              
              <p className="text-center text-[10px] font-black text-outline uppercase tracking-widest mt-6">
                Secure checkout guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;
