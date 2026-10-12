import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="pb-20 md:pb-0">{children}</main>
      <div className="pb-20 md:pb-0">
        <SiteFooter />
      </div>
      <MobileStickyCta />
      <WhatsAppFab />
    </>
  );
}
