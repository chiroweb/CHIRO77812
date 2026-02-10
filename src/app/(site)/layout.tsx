import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CustomCursor from "@/components/ui/custom-cursor";
import BackgroundVideo from "@/components/ui/background-video";
import MobileCtaBar from "@/components/ui/mobile-cta-bar";
import SiteBanner from "@/components/ui/site-banner";
import SitePopup from "@/components/ui/site-popup";
import LoadingWrapper from "@/components/loading/LoadingWrapper";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoadingWrapper>
      <BackgroundVideo />
      <CustomCursor />
      <SiteBanner />
      <Header />
      <main className="pb-[60px] md:pb-0">{children}</main>
      <MobileCtaBar />
      <Footer />
      <SitePopup />
    </LoadingWrapper>
  );
}
