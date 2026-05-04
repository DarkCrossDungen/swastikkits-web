import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';


const Account = () => {
  const { currentUser, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", currentUser.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        setOrders(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!currentUser) return null;

  return (
    <main className="min-h-screen pt-28 pb-20 px-4">
      <div className="container-custom max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          
          {/* Profile Sidebar */}
          <aside className="w-full md:w-80 space-y-6">
            <div className="bg-white rounded-3xl border border-outline-variant p-8 shadow-sm text-center">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-4xl">account_circle</span>
              </div>
              <h2 className="text-xl font-black text-on-surface mb-1">{currentUser.displayName || 'Engineer'}</h2>
              <p className="text-sm font-bold text-outline mb-6">{currentUser.email}</p>
              <button 
                onClick={handleLogout}
                className="w-full py-3 px-6 bg-surface-container-low text-outline font-black rounded-xl border border-outline-variant hover:bg-error/5 hover:text-error hover:border-error transition-all text-xs uppercase tracking-widest"
              >
                Logout Account
              </button>
            </div>

            <div className="bg-primary rounded-3xl p-8 text-white shadow-xl">
              <h3 className="font-black text-lg mb-2">Need Help?</h3>
              <p className="text-white/80 text-sm font-bold mb-6">Our technical support team is ready to assist you.</p>
              <a href="tel:+916379306961" className="flex items-center gap-2 font-black">
                <span className="material-symbols-outlined">call</span>
                +91 6379306961
              </a>
            </div>
          </aside>

          {/* Order History */}
          <section className="flex-grow">
            <h1 className="text-2xl font-black text-on-surface mb-8">Order History</h1>
            
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-surface-container-low rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div 
                    key={order.id}
                    className="bg-white rounded-3xl border border-outline-variant p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Order ID</p>
                        <p className="font-black text-on-surface">{order.trackingId}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-outline uppercase tracking-widest mb-1">Status</p>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          order.status === 'Delivered' ? 'bg-success/10 text-success' : 'bg-secondary/10 text-secondary'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex-shrink-0 flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl border border-outline-variant/30">
                          <span className="text-[10px] font-black">{item.quantity}x</span>
                          <span className="text-xs font-bold truncate max-w-[100px]">{item.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-outline-variant/30 flex justify-between items-center">
                      <p className="text-sm font-bold text-outline">
                        {new Date(order.createdAt?.seconds * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <p className="text-xl font-black text-primary">₹{order.totalAmount}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-surface-container-low rounded-3xl p-12 text-center border-2 border-dashed border-outline-variant">
                <span className="material-symbols-outlined text-5xl text-outline mb-4">shopping_basket</span>
                <p className="text-outline font-black">No orders found yet.</p>
                <button onClick={() => navigate('/category')} className="text-primary font-black uppercase text-xs tracking-widest mt-4 hover:underline">
                  Start your first build
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Account;
