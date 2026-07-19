import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import SpaceBackground from "@/components/site/SpaceBackground";
import Nav from "@/components/site/Nav";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Haneen Abou Hamdan — Senior Software Engineer & Engineering Lead",
  description:
    "Senior Software Engineer and Engineering Lead in Dubai. Building scalable software, AI-powered platforms and enterprise digital experiences across web and mobile.",
  metadataBase: new URL("https://haneenabouhamdan.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Haneen Abou Hamdan — Senior Software Engineer & Engineering Lead",
    description:
      "Building scalable software, AI-powered platforms and enterprise digital experiences.",
    url: "https://haneenabouhamdan.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="grain bg-ink text-cream antialiased">
        <SpaceBackground />
        <SmoothScroll>
          <Nav />
          <main className="relative z-10">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}
