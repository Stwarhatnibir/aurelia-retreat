import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Rooms from "./components/Rooms";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
