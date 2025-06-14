import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAnalytics } from "@/hooks/useAnalytics";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, BookOpen, Award, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const { trackContactForm } = useAnalytics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Track form submission
    trackContactForm('contact_form');
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message envoyé avec succès ! Nous vous répondrons bientôt.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50/30 to-red-50/50">
      <Navigation />
      
      {/* Hero Section harmonisé */}
      <section className="relative pt-24 pb-16 overflow-hidden bg-gradient-to-r from-amber-900 via-orange-900 to-red-900">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-8">
            <Link to="/" className="inline-flex items-center text-orange-200 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour à l'accueil
            </Link>
            
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              Contactez le
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mt-2">
                Professeur Kakpo
              </span>
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Une question sur ses œuvres, ses recherches ou ses activités académiques ? 
              Le Professeur et son équipe sont à votre écoute.
            </p>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">29+</div>
              <div className="text-orange-200 text-sm">Ouvrages publiés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">25+</div>
              <div className="text-orange-200 text-sm">Années d'enseignement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-orange-200 text-sm">Étudiants formés</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">2016</div>
              <div className="text-orange-200 text-sm">Chevalier de l'Ordre</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                  Envoyez un message
                </h2>
                <p className="text-gray-600 text-lg">
                  Que ce soit pour une question académique, une collaboration ou simplement pour échanger sur ses travaux, 
                  n'hésitez pas à nous contacter.
                </p>
              </div>

              <Card className="bg-white/80 backdrop-blur-md shadow-xl border-0">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="h-12 border-gray-200 focus:border-amber-500 focus:ring-amber-500/20"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="h-12 border-gray-200 focus:border-amber-500 focus:ring-amber-500/20"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Sujet
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="h-12 border-gray-200 focus:border-amber-500 focus:ring-amber-500/20"
                        placeholder="Question sur vos recherches, collaboration, etc."
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="border-gray-200 focus:border-amber-500 focus:ring-amber-500/20 resize-none"
                        placeholder="Décrivez votre demande en détail..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      {loading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Envoi en cours...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="w-5 h-5" />
                          <span>Envoyer le message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & About Professor */}
            <div className="space-y-8">
              
              {/* About Professor Card */}
              <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-gray-900 flex items-center gap-3">
                    <Award className="w-7 h-7 text-amber-600" />
                    Professeur Mahougnon KAKPO
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Professeur titulaire à l'Université d'Abomey-Calavi, spécialiste de la littérature africaine 
                    francophone et des traditions spirituelles du Bénin.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm text-gray-700">Chevalier de l'Ordre national du Bénin (2016)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <BookOpen className="w-5 h-5 text-amber-600" />
                      <span className="text-sm text-gray-700">Auteur de plus de 29 ouvrages</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-orange-600" />
                      <span className="text-sm text-gray-700">Président du Comité des rites Vodun (2023)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-white/80 backdrop-blur-md shadow-xl border-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair text-gray-900 flex items-center gap-3">
                    <MessageSquare className="w-7 h-7 text-amber-600" />
                    Informations de contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">mkakpo2012@yahoo.fr</p>
                      <p className="text-gray-600">contact@livreskakpo.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                      <p className="text-gray-600">+229 01 97 26 54 70</p>
                      <p className="text-gray-600">Disponible en semaine</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Adresse</h3>
                      <p className="text-gray-600">Bénin, Godomey Fignonhou</p>
                      <p className="text-gray-600">Université d'Abomey-Calavi</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Disponibilité</h3>
                      <p className="text-gray-600">Lun - Ven: 9h00 - 17h00</p>
                      <p className="text-gray-600">Réponse sous 24-48h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Link to="/catalogue">
                  <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <BookOpen className="w-8 h-8 mx-auto mb-3" />
                      <div className="text-lg font-bold mb-1">Catalogue</div>
                      <div className="text-sm opacity-90">Découvrir les livres</div>
                    </CardContent>
                  </Card>
                </Link>

                <Link to="/">
                  <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Users className="w-8 h-8 mx-auto mb-3" />
                      <div className="text-lg font-bold mb-1">À propos</div>
                      <div className="text-sm opacity-90">Son parcours</div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;