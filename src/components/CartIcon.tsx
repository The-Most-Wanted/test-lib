import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CartIcon = () => {
  const { getTotalItems } = useCart();
  const { user } = useAuth();
  const totalItems = getTotalItems();

  if (!user) return null;

  return (
    <Link to="/cart">
      <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 transition-colors">
        <ShoppingCart className="h-5 w-5 text-gray-700" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold min-w-[20px]">
            {totalItems}
          </span>
        )}
      </Button>
    </Link>
  );
};

export default CartIcon;