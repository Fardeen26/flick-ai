import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Samples from "@/components/Samples";
import Providers from "./Providers";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-40">
      <Providers>
        <Hero />
        <Main />
        <Samples />
      </Providers>
    </div>
  );
}
