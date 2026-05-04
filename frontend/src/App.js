import React from "react";
import Navbar   from "./components/Navbar";
import Hero     from "./components/Hero";
import About    from "./components/About";
import Games    from "./components/Games";
import Contact  from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Games />
      <Contact />
      <Footer />
    </>
  );
}

export default App;