
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowLeft, BookOpen, Users, Globe, Star } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Connexion réussie !');
          navigate('/');
        }
      } else {
        if (!formData.firstName || !formData.lastName) {
          toast.error('Veuillez remplir tous les champs');
          return;
        }
        
        const { error } = await signUp(formData.email, formData.password, formData.firstName, formData.lastName);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Compte créé ! Vérifiez votre email pour confirmer votre inscription.');
        }
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 text-white">
          <div className="max-w-lg">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour à l'accueil
            </Link>
            
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-playfair font-bold">Livres Kakpo</span>
            </div>

            <h1 className="text-5xl font-playfair font-bold mb-6 leading-tight">
              Découvrez un monde
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> 
                {" "}infini de livres
              </span>
            </h1>
            
            <p className="text-xl text-white/80 mb-12 leading-relaxed">
              Rejoignez notre communauté de lecteurs passionnés et accédez à une collection exceptionnelle de livres soigneusement sélectionnés.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Collection Premium</h3>
                  <p className="text-white/70">Plus de 1000 livres soigneusement sélectionnés</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Communauté Active</h3>
                  <p className="text-white/70">Rejoignez des milliers de lecteurs passionnés</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center">
                  <Globe className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Livraison Gratuite</h3>
                  <p className="text-white/70">Dans tout le Bénin, rapidement et en sécurité</p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mt-12 p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <div className="flex items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-white/90 italic mb-3">
                "Une expérience d'achat exceptionnelle ! La qualité des livres et la rapidité de livraison sont remarquables."
              </p>
              <p className="text-white/70 text-sm">— Marie K., Cotonou</p>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="lg:hidden mb-8 text-center">
              <Link to="/" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Link>
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-playfair font-bold text-white">Livres Kakpo</span>
              </div>
            </div>

            <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0 animate-scale-in">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-playfair font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  {isLogin ? 'Bon retour !' : 'Rejoignez-nous'}
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  {isLogin 
                    ? 'Connectez-vous pour accéder à votre espace personnel'
                    : 'Créez votre compte et découvrez notre univers littéraire'
                  }
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-4 animate-fade-in">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">Prénom</Label>
                        <Input
                          id="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required={!isLogin}
                          className="mt-1 h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">Nom</Label>
                        <Input
                          id="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required={!isLogin}
                          className="mt-1 h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Adresse email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1 h-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">Mot de passe</Label>
                    <div className="relative mt-1">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        className="h-12 pr-12 border-gray-200 focus:border-violet-500 focus:ring-violet-500/20"
                        placeholder={isLogin ? 'Votre mot de passe' : 'Créez un mot de passe sécurisé'}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-12 px-3 text-gray-400 hover:text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Chargement...</span>
                      </div>
                    ) : (
                      isLogin ? 'Se connecter' : 'Créer mon compte'
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">ou</span>
                  </div>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-violet-600 hover:text-violet-800 font-medium transition-colors duration-300"
                  >
                    {isLogin 
                      ? "Pas encore de compte ? Créez-en un gratuitement" 
                      : "Déjà un compte ? Connectez-vous"
                    }
                  </button>
                </div>

                {!isLogin && (
                  <div className="text-xs text-gray-500 text-center animate-fade-in">
                    En créant un compte, vous acceptez nos{' '}
                    <a href="#" className="text-violet-600 hover:underline">conditions d'utilisation</a>
                    {' '}et notre{' '}
                    <a href="#" className="text-violet-600 hover:underline">politique de confidentialité</a>.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
