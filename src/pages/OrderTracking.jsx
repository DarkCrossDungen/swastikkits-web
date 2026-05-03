const OrderTracking = () => {
  const steps = [
    { title: 'Order Placed', date: 'Oct 20, 2024', done: true },
    { title: 'Shipped', date: 'Oct 21, 2024', done: true, active: true },
    { title: 'Out for Delivery', date: 'Pending', done: false },
    { title: 'Delivered', date: 'Pending', done: false },
  ];

  return (
    <main className="pt-24 pb-20 container-custom max-w-4xl">
      <div className="bg-white rounded-3xl border border-outline-variant p-8 md:p-12 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2">Track Your Order</h1>
            <p className="text-sm font-bold text-outline uppercase tracking-widest">Order ID: #SK-99283-X</p>
          </div>
          <div className="bg-primary/10 px-6 py-2 rounded-full border border-primary/20">
            <span className="text-primary font-black text-sm uppercase tracking-widest">In Transit</span>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-outline-variant/30 ml-4">
          {steps.map((step) => (
            <div key={step.title} className="flex gap-8 relative">

              <div className={`w-6 h-6 rounded-full border-4 border-white shadow-md z-10 flex-shrink-0 ${step.done ? 'bg-emerald-500' : 'bg-outline-variant/50'}`}>
                {step.done && <span className="material-symbols-outlined text-[12px] text-white flex items-center justify-center h-full">check</span>}
              </div>
              <div className={step.active ? 'opacity-100 scale-105 transition-all' : 'opacity-60'}>
                <h3 className={`font-black text-lg ${step.active ? 'text-primary' : 'text-on-surface'}`}>{step.title}</h3>
                <p className="text-xs font-bold text-outline mt-1 uppercase tracking-widest">{step.date}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-12 border-outline-variant/30" />

        {/* Shipment Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="text-xs font-black text-outline uppercase tracking-[0.2em]">Delivery Address</h4>
            <div className="space-y-1">
              <p className="font-bold text-on-surface">Anand K.</p>
              <p className="text-sm text-outline">SRM Institute of Science and Technology</p>
              <p className="text-sm text-outline">Kattankulathur, Chennai</p>
              <p className="text-sm text-outline">Tamil Nadu, 603203</p>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-black text-outline uppercase tracking-[0.2em]">Shipment Info</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-outline font-bold">Courier:</span>
                <span className="font-bold">Delhivery</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-outline font-bold">Tracking No:</span>
                <span className="font-bold text-primary underline">77283991022</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-outline font-bold">Est. Delivery:</span>
                <span className="font-bold">23 Oct, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm font-bold text-outline mb-6">Need help with your shipment?</p>
        <button onClick={() => alert('Opening support widget...')} className="btn-primary">Contact Support</button>
      </div>
    </main>
  );
};

export default OrderTracking;
