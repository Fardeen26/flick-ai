import Hero from "@/components/Hero";
import Main from "@/components/Main";
import Samples from "@/components/Samples";
import TweetProvider from "@/context/TweetContext";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center mt-40">
      <TweetProvider>
        <Hero />
        <Main />
        <Samples />
      </TweetProvider>
    </div>
  );
}
