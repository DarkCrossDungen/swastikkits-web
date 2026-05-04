
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="bg-white rounded-2xl border border-outline-variant/50 shadow-sm hover:shadow-lg hover:border-primary/30 transition-shadow p-4 group cursor-pointer h-full flex flex-col"
    >
      <div className="aspect-square bg-surface-container-low rounded-xl mb-4 flex items-center justify-center overflow-hidden relative border border-outline-variant/30">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-2" />
        ) : (
          <div className="text-center text-outline">
            <p className="font-black text-2xl uppercase tracking-widest text-outline-variant">{product.code}</p>
            <p className="text-xs font-bold mt-2">PRODUCT IMAGE</p>
          </div>
        )}
        
        {product.discount && (
          <div className="absolute top-3 left-3 bg-error text-white text-xs font-black px-3 py-1 rounded-full tracking-wider shadow-sm">
            {product.discount}% OFF
          </div>
        )}
      </div>


      <div className="space-y-1 mb-4 flex-grow">
        <h3 className="font-bold text-on-surface text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-xs font-medium text-outline uppercase tracking-wider">Code: {product.code}</p>
      </div>

      <div className="flex items-end gap-3 mb-5 border-t border-outline-variant/30 pt-4">
        <span className="text-2xl font-black text-on-surface leading-none">₹{product.price}</span>
        {product.originalPrice > product.price && (
          <span className="text-sm text-outline line-through font-bold mb-0.5">₹{product.originalPrice}</span>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-auto">
        <button 
          onClick={handleAddToCart}
          className="w-full bg-primary/10 text-primary py-2.5 rounded-xl font-bold hover:bg-primary hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
          Add to Cart
        </button>
        <button 
          onClick={handleBuyNow}
          className="w-full bg-emerald-600 text-white py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all active:scale-95 hover:shadow-lg hover:shadow-emerald-600/20 flex items-center justify-center gap-2"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
