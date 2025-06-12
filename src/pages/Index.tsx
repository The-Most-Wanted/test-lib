import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-inter">
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