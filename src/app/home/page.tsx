import {
  BeforeAfterLab,
  CapabilityConstellation,
  DashboardPreview,
  HeroCommandCenter,
  LaunchPlan,
  ScoreSection,
  ServiceCards,
  WhatsAppCTA
} from '@/components/commerce-command-center'

export default function HomeExperiencePage() {
  return (
    <>
      <HeroCommandCenter />
      <ScoreSection />
      <BeforeAfterLab />
      <CapabilityConstellation />
      <DashboardPreview />
      <ServiceCards />
      <LaunchPlan />
      <WhatsAppCTA />
    </>
  )
}
