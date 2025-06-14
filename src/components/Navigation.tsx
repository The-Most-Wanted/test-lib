import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageToggle from "@/components/LanguageToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Menu, User, X, ChevronDown, ShoppingCart, BookOpen } from "lucide-react";

const Navigation = () => {
  const { user, signOut } = useAuth();
  const { getTotalItems } = useCart();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-200/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo optimisé mobile */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg flex items-center justify-center group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-300 transform group-hover:scale-110 shadow-lg">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-playfair text-base sm:text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors leading-none">
                Livres Kakpo
              </span>
              <span className="text-xs text-gray-500 leading-none hidden sm:block">
                Littérature Africaine
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors relative group"
            >
              {t('home')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/catalogue" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors relative group"
            >
              {t('catalogue')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-amber-600 font-medium transition-colors relative group"
            >
              {t('contact')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Right Side Items optimisés mobile */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <div className="hidden sm:block">
              <LanguageToggle />
            </div>
            
            {/* Cart Icon optimisé mobile */}
            {user && (
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative hover:bg-amber-50 transition-colors w-9 h-9 sm:w-10 sm:h-10">
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold text-[10px] sm:text-xs min-w-[16px] sm:min-w-[20px]">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            )}
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-1 sm:space-x-2 hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all duration-300 rounded-xl px-2 sm:px-4 py-2 h-9 sm:h-auto"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="hidden sm:block font-medium text-gray-700">{t('profile')}</span>
                    <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border border-amber-200/50 shadow-xl">
                  <DropdownMenuLabel className="text-gray-900">{t('myAccount')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center space-x-2 cursor-pointer hover:bg-amber-50 transition-colors">
                      <User className="w-4 h-4" />
                      <span>{t('manageProfile')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/cart" className="flex items-center space-x-2 cursor-pointer hover:bg-amber-50 transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                      <span>{t('myCart')}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 cursor-pointer text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('logout')}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-3 sm:px-6 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm">
                  <LogIn className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">{t('login')}</span>
                  <span className="sm:hidden">Login</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg w-9 h-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu optimisé */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-14 sm:top-16 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-amber-200/50 shadow-lg animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              <Link 
                to="/" 
                className="block text-gray-700 hover:text-amber-600 font-medium py-3 transition-colors border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link 
                to="/catalogue" 
                className="block text-gray-700 hover:text-amber-600 font-medium py-3 transition-colors border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('catalogue')}
              </Link>
              <Link 
                to="/contact" 
                className="block text-gray-700 hover:text-amber-600 font-medium py-3 transition-colors border-b border-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              
              {/* Language toggle pour mobile */}
              <div className="py-3 border-b border-gray-100">
                <LanguageToggle />
              </div>
              
              {user && (
                <>
                  <Link 
                    to="/profile" 
                    className="block text-gray-700 hover:text-amber-600 font-medium py-3 transition-colors border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('myProfile')}
                  </Link>
                  <Link 
                    to="/cart" 
                    className="flex items-center justify-between text-gray-700 hover:text-amber-600 font-medium py-3 transition-colors border-b border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{t('myCart')}</span>
                    {totalItems > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-red-600 hover:text-red-700 font-medium py-3 transition-colors"
                  >
                    {t('logout')}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;