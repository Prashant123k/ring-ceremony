import type { Metadata } from "next";
import "./globals.css";
import ScrollProvider from "@/components/ScrollProvider";

export const metadata: Metadata = {
  title: "Prashant & Mitali's Ring Ceremony Invitation",
  description: "Join us in celebrating the beginning of forever. Prashant & Mitali cordially invite you to their Ring Ceremony on 19 July 2026, 5:00 PM at Shajapur, Madhya Pradesh.",
  openGraph: {
    title: "Prashant & Mitali's Ring Ceremony Invitation",
    description: "Join us in celebrating the beginning of forever on 19 July 2026.",
    url: "https://prashant-mitali.vercel.app",
    siteName: "Prashant & Mitali Ring Ceremony",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashant & Mitali's Ring Ceremony Invitation",
    description: "Join us in celebrating the beginning of forever on 19 July 2026.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
    >
      <body className="bg-luxury text-dark font-inter antialiased selection:bg-gold selection:text-maroon">
        <ScrollProvider>{children}</ScrollProvider>
      </body>
    </html>
  );
}
