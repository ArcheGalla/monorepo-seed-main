import { LegalPagesHeader } from "@/modules/navbar/legal-pages-header";

export default function LegalPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LegalPagesHeader />
      {children}
    </>
  );
}
