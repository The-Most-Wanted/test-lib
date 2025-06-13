
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    console.log('Index page loaded successfully');
  }, []);

  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />
      
      {/* Featured Books Section */}
      <FeaturedBooks />
      
      <Footer />
    </div>
  );
};

export default Index;
