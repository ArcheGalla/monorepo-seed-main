import { GameShowcase } from "@/components/game-showcase";
import { HeroSection } from "@/components/hero-section";
import { PlayerTestimonials } from "@/components/player-testimonials";
import { Promotions } from "@/components/promotions";
import { ProviderBanners } from "@/components/provider-banners";
import { FAQ } from "@/components/faq";
import { Categories } from "@/components/categories";
import { MainNavbar } from "@/modules/navbar/main-navbar";

export default function Home() {
  return (
    <>
      <MainNavbar />
      <div className="min-h-screen flex flex-col bg-black w-full">
        <HeroSection />
        <ProviderBanners />
        <Categories />
        <GameShowcase />
        <Promotions />
        <PlayerTestimonials />
        <FAQ />
      </div>
    </>
  );
}
