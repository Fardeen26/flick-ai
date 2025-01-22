import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Samples from "@/components/Samples";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-28 filter">
      <Hero />
      <Main />
      <Samples />
    </div>
  );
}
