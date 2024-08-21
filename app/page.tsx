import Content from "@/components/Content";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="flex flex-col items-center  w-screen h-screen gap-2 m-5 md:m-0 lg:m-0">
      <NavBar />
      <Content />
      <Footer />
    </main>
  );
}
