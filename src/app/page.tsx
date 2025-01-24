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
      <div className="mt-36 max-sm:mt-24 gap-8 max-sm:gap-6 flex flex-col items-center min-h-[58vh]">
        <Hero />
        <Main />
        <Samples />
      </div>
      <div className="flex justify-center h-fit">
        <Footer />
      </div>
    </div>
  );
}
