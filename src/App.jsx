import { useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import ScrollProgress from "./components/ScrollProgress";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Rooms from "./components/Rooms";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />

      <AnimatePresence>
        {!ready && <Loader key="loader" onDone={() => setReady(true)} />}
      </AnimatePresence>

      {ready && (
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
          <Footer />
        </>
      )}
    </MotionConfig>
  );
}
