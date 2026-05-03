import { NavLink } from 'react-router-dom';

const BottomNav = () => {
  const navItems = [
    { to: "/", icon: "storefront", label: "Shop" },
    { to: "/track", icon: "local_shipping", label: "Track" },
    { to: "/cart", icon: "shopping_cart", label: "Cart" },
    { to: "/login", icon: "person", label: "Account" }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 bg-white/95 backdrop-blur-md border-t border-outline-variant flex justify-around items-center h-16 px-2 pb-safe md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => (
        <NavLink 
          key={item.to} 
          to={item.to} 
          className={({ isActive }) => `flex flex-col items-center justify-center transition-all ${isActive ? 'text-secondary font-bold scale-105' : 'text-outline hover:text-primary'}`}
        >
          {({ isActive }) => (
            <>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "" }}>
                {item.icon}
              </span>
              <span className="font-display text-[10px] uppercase font-bold tracking-tight mt-0.5">
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
