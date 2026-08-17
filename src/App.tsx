import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Team from "./components/Team";
import Journey from "./components/Journey";
import Values from "./components/Values";
import Vision from "./components/Vision";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-base-950 font-body">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Team />
        <Journey />
        <Values />
        <Vision />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
