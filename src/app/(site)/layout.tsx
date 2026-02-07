import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CustomCursor from "@/components/ui/custom-cursor";
import BackgroundVideo from "@/components/ui/background-video";
import MobileCtaBar from "@/components/ui/mobile-cta-bar";
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
      <Header />
      <main className="pb-[60px] md:pb-0">{children}</main>
      <MobileCtaBar />
      <Footer />
    </LoadingWrapper>
  );
}
