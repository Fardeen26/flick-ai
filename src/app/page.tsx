import Appbar from "@/components/Appbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Samples from "@/components/Samples";

export default function Home() {
  return (
    <div className="w-full relative">
      <div className="flex justify-center">
        <Appbar />
      </div>
      <div className="mt-32 gap-8 flex flex-col items-center">
        <Hero />
        <Main />
        <Samples />
      </div>
      <div className="flex justify-center">
        <Footer />
      </div>
    </div>
  );
}
