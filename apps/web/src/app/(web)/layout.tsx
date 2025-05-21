import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "@/providers";
import { SITE_CONFIG } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Footer } from "@/components/footer";
import { ReactScan } from "@/components/atoms/react-scan";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s - ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "black" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="dark bg-black" lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-[#0a0a0d] font-sans antialiased dark",
          fontSans.variable,
        )}
      >
        <ReactScan />
        <Providers>
          <div className="relative flex flex-col min-h-screen">
            <main className="relative flex-col flex-grow flex items-center justify-center">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
