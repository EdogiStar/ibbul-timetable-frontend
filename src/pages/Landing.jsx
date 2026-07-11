import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Features from "@/components/landing/Features";
import Workflow from "@/components/landing/Workflow";
import TechStack from "@/components/landing/TechStack";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

function Landing() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <Hero />

      <About />

      <Features />

      <Workflow />

      <TechStack />

      <CTA />

      <Footer />
    </main>
  );
}

export default Landing;