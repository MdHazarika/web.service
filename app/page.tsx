"use client";

import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustCounters } from "@/components/sections/TrustCounters";
import { TechStack } from "@/components/sections/TechStack";
import { Industries } from "@/components/sections/Industries";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AdvancedFAQ } from "@/components/sections/AdvancedFAQ";
import { PlanComparison } from "@/components/sections/PlanComparison";
import { InteractiveTimeline } from "@/components/sections/InteractiveTimeline";
import { ClientDashboardPreview } from "@/components/sections/ClientDashboardPreview";
import { AIRecommendation } from "@/components/sections/AIRecommendation";
import { LivePriceCalculator } from "@/components/sections/LivePriceCalculator";
import { WebsiteBuilder } from "@/components/sections/WebsiteBuilder";
import { LiveWebsiteBuilder } from "@/components/sections/LiveWebsiteBuilder";
import { ROICalculator } from "@/components/sections/ROICalculator";
import { BookConsultation } from "@/components/sections/BookConsultation";
import { AIBusinessConsultant } from "@/components/sections/AIBusinessConsultant";
import { WebsiteCostCalculator } from "@/components/sections/WebsiteCostCalculator";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { PerformanceDemo } from "@/components/sections/PerformanceDemo";
import { SuccessStories } from "@/components/sections/SuccessStories";
import { FreeResources } from "@/components/sections/FreeResources";
import { AIProposalGenerator } from "@/components/sections/AIProposalGenerator";
import { CustomerJourneyWizard } from "@/components/sections/CustomerJourneyWizard";
import { ProjectProgressAnimation } from "@/components/sections/ProjectProgressAnimation";
import { InteractiveWorldMap } from "@/components/sections/InteractiveWorldMap";
import { Team } from "@/components/sections/Team";
import { Newsletter } from "@/components/sections/Newsletter";
import { useSiteConfig } from "@/components/ConfigProvider";

export default function Home() {
  const { config } = useSiteConfig();
  const s = config.sections;

  return (
    <main>
      {s.hero && <Hero />}
      {s.stats && <StatsStrip />}
      {s.services && <Services />}
      {s.pricing && <Pricing />}
      {s.process && <Process />}
      {s.testimonials && <Testimonials />}
      {s.trust && <TrustCounters />}
      {s.techStack && <TechStack />}
      {s.industries && <Industries />}
      {s.whyChooseUs && <WhyChooseUs />}
      {s.faq && <AdvancedFAQ />}
      {s.planComparison && <PlanComparison />}
      {s.timeline && <InteractiveTimeline />}
      {s.dashboard && <ClientDashboardPreview />}
      {s.aiConsultant && <AIBusinessConsultant />}
      {s.costCalculator && <WebsiteCostCalculator />}
      {s.beforeAfter && <BeforeAfter />}
      {s.performance && <PerformanceDemo />}
      {s.successStories && <SuccessStories />}
      {s.freeResources && <FreeResources />}
      {s.proposal && <AIProposalGenerator />}
      {s.journey && <CustomerJourneyWizard />}
      {s.progress && <ProjectProgressAnimation />}
      {s.worldMap && <InteractiveWorldMap />}
      {s.recommendation && <AIRecommendation />}
      {s.liveCalculator && <LivePriceCalculator />}
      {s.websiteBuilder && <WebsiteBuilder />}
      {s.liveWebsiteBuilder && <LiveWebsiteBuilder />}
      {s.roi && <ROICalculator />}
      {s.bookConsultation && <BookConsultation />}
      {s.team && <Team />}
      {s.newsletter && <Newsletter />}
    </main>
  );
}
