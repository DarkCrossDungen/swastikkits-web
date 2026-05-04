import { NavLink } from 'react-router-dom';


const ThankYou = () => {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md">
        <div 
          className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto"
        >
          <span className="material-symbols-outlined text-6xl">check_circle</span>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl font-black text-on-surface leading-tight">Order Placed!</h1>
          <p className="text-outline font-bold leading-relaxed">
            Thank you for shopping with Swastik Kits. We've sent a confirmation email to your workspace.
          </p>
        </div>

        <div className="pt-6 flex flex-col gap-4">
          <NavLink to="/track" className="btn-secondary h-14 flex items-center justify-center">TRACK ORDER</NavLink>
          <NavLink to="/" className="text-primary font-black uppercase tracking-widest text-sm hover:underline">Continue Shopping</NavLink>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
