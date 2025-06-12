
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
      <Hero />
      <About />
      <FeaturedBooks />
      <Footer />
    </div>
  );
};

export default Index;
