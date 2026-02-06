import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CustomCursor from "@/components/ui/custom-cursor";
import BackgroundVideo from "@/components/ui/background-video";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundVideo />
      <CustomCursor />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
