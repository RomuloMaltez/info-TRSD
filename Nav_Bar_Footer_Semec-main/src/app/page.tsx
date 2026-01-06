import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:gap-12 sm:py-12 lg:gap-14 lg:py-16">
        {/* Conteúdo principal aqui */}
      </main>
      <Footer />
    </div>
  );
}
