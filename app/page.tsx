// app/page.tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import WhyChooseUs from "./components/WhyChooseUs";
import Awards from "./components/Awards";
import LatestNews from "./components/LatestNews";
import CtaBanner from "./components/CtaBanner";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <WhyChooseUs />
        {/* <Awards /> */}
        <LatestNews />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
