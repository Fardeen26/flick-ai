import Hero from "@/components/Hero";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-40">
      <Hero />
      <Main />
    </div>
  );
}
