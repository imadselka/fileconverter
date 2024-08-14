import Content from "@/components/Content";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="flex flex-col w-screen h-screen">
      <NavBar />
      <Content />
      <Footer />
    </main>
  );
}
