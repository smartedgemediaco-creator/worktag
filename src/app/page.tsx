import { ScrollProgress } from "@/components/landing/scroll-progress";
import {
  MegaNav,
  HeroCinematic,
  HowItWorks,
  BenefitIdentity,
  BenefitQR,
  BenefitTrust,
  BenefitReviews,
  BenefitVerification,
  BenefitStorefront,
  LifeTimeline,
  PortfolioGallery,
  StatsBranded,
  FAQSection,
  CTASection,
  MegaFooter,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <>
      <ScrollProgress />
      <MegaNav />
      <main>
        <HeroCinematic />
        <HowItWorks />
        <BenefitIdentity />
        <BenefitQR />
        <BenefitTrust />
        <BenefitReviews />
        <BenefitVerification />
        <BenefitStorefront />
        <StatsBranded />
        <LifeTimeline />
        <PortfolioGallery />
        <FAQSection />
        <CTASection />
      </main>
      <MegaFooter />
    </>
  );
}
