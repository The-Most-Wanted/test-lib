
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { Mail, Phone, MapPin, Clock, Award, BookOpen, Send, User, MessageSquare } from "lucide-react";
import AnimatedButton from "@/components/AnimatedButton";

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('messageSent'),
      description: t('messageResponse'),
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 font-inter relative overflow-hidden">
      <FloatingElements />
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-5xl sm:text-6xl font-bold mb-6 animate-fade-in">
            {t('contact')}
          </h1>
          <p className="font-inter text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('contactDescription')}
          </p>
          <div className="mt-8 w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full animate-fade-in" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>

      {/* Contact Content */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <Card className="animate-fade-in shadow-2xl bg-white/90 backdrop-blur-md border-0">
              <CardHeader className="text-center pb-8">
                <CardTitle className="font-playfair text-3xl text-gray-900 mb-4">
                  {t('sendMessage')}
                </CardTitle>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-inter font-medium flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-600" />
                        {t('fullName')}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                        placeholder={t('fullNamePlaceholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-inter font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        {t('email')}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                        placeholder={t('emailPlaceholder')}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-inter font-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-600" />
                      {t('subject')}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      placeholder={t('subjectPlaceholder')}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-inter font-medium">
                      {t('message')}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                      placeholder={t('messagePlaceholder')}
                    />
                  </div>
                  
                  <AnimatedButton type="submit" variant="primary" size="lg" className="w-full">
                    <Send className="w-5 h-5 mr-2" />
                    {t('sendMessage')}
                  </AnimatedButton>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information & Professor Info */}
            <div className="space-y-8">
              
              {/* Contact Info */}
              <Card className="animate-fade-in shadow-2xl bg-white/90 backdrop-blur-md border-0" style={{ animationDelay: "0.2s" }}>
                <CardContent className="p-8">
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-blue-600" />
                    {t('contactInfo')}
                  </h3>
                  <div className="space-y-6 font-inter">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
                      <Mail className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{t('email')}</h4>
                        <p className="text-gray-700">mkakpo2012@yahoo.fr</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
                      <Phone className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{t('phone')}</h4>
                        <p className="text-gray-700">+229 01 97 26 54 70</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
                      <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{t('address')}</h4>
                        <p className="text-gray-700">
                          Godomey Fignonhou<br />
                          Bénin
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Professor Achievements */}
              <Card className="animate-fade-in shadow-2xl bg-white/90 backdrop-blur-md border-0" style={{ animationDelay: "0.4s" }}>
                <CardContent className="p-8">
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <Award className="w-6 h-6 text-yellow-600" />
                    {t('achievements')}
                  </h3>
                  <div className="space-y-4 font-inter text-gray-700">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50">
                      <Award className="w-4 h-4 text-yellow-600" />
                      <span>{t('knightOrder')}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>{t('professorTitle')}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50">
                      <Clock className="w-4 h-4 text-indigo-600" />
                      <span>{t('ministerEducation')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="animate-fade-in shadow-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-0" style={{ animationDelay: "0.6s" }}>
                <CardContent className="p-8 text-center">
                  <h3 className="font-playfair text-2xl font-bold mb-6">
                    {t('exploreMore')}
                  </h3>
                  <div className="space-y-4">
                    <AnimatedButton 
                      variant="secondary" 
                      size="lg" 
                      className="w-full"
                      onClick={() => window.location.href = '/catalogue'}
                    >
                      {t('viewBooks')}
                    </AnimatedButton>
                    <AnimatedButton 
                      variant="outline" 
                      size="lg" 
                      className="w-full border-white text-white hover:bg-white hover:text-blue-600"
                      onClick={() => window.location.href = '/'}
                    >
                      {t('backToHome')}
                    </AnimatedButton>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
