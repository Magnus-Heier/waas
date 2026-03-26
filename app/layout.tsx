import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LeadPopup } from "./components/LeadPopup";
import { SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | weboki Norge",
    default: "Profesjonell Nettside for Småbedrifter | weboki Norge",
  },
  description:
    "Skreddersydde nettsider for norske småbedrifter. Fra kr 5 500, live på 3–7 dager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <LeadPopup />
      </body>
    </html>
  );
}
