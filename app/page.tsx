import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { ServiceCategories } from "@/components/landing/service-categories"
import { FeaturedServices } from "@/components/landing/featured-services"
import { TrustSection } from "@/components/landing/trust-section"
import { CTASection } from "@/components/landing/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServiceCategories />
        <FeaturedServices />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
