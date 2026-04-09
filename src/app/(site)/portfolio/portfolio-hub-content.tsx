"use client";

import SubpageHero from "@/components/sections/subpage-hero";
import SubNav from "@/components/ui/sub-nav";
import StatsRow from "@/components/sections/stats-row";
import PortfolioGrid from "@/components/sections/portfolio-grid";
import ContactCtaSection from "@/components/sections/contact-cta-section";

interface PortfolioProject {
  id: number;
  name: string;
  slug: string;
  category: string;
  image_url: string;
  year: string;
}

interface PortfolioHubContentProps {
  projects: PortfolioProject[];
}

const STATS = [
  { label: "총 프로젝트", value: "7+" },
  { label: "업종", value: "5개" },
  { label: "평균 제작 기간", value: "2주" },
  { label: "추가 의뢰율", value: "43%" },
];

export default function PortfolioHubContent({ projects }: PortfolioHubContentProps) {
  return (
    <>
      <SubpageHero
        title="PORTFOLIO"
        label="( Our Work )"
      />

      <SubNav pageLabel="PORTFOLIO MENU" items={[
        { label: "STATS", href: "#stats" },
        { label: "PROJECTS", href: "#projects" },
      ]} />

      <div id="stats"><StatsRow stats={STATS} /></div>
      <div id="projects"><PortfolioGrid projects={projects} /></div>
      <ContactCtaSection />
    </>
  );
}
