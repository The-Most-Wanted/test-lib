
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-inter relative overflow-hidden">
      <FloatingElements />
      <Navigation />
      
      {/* Enhanced Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <Hero />
      </div>

      {/* Improved spacing and visual flow */}
      <div className="relative z-10">
        <About />
        
        {/* Enhanced Featured Books Section */}
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 py-16">
          <FeaturedBooks />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
