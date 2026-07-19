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
  // Variable + Softness/opsz — static weight subset ships a flat-bottom "g"
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "HA · Haneen Abou Hamdan — Senior Software Engineer & Engineering Lead · Dubai",
    template: "%s · HA",
  },
  description:
    "Senior Software Engineer and Engineering Lead in Dubai. Building scalable software, AI-powered platforms and enterprise digital experiences across web and mobile.",
  metadataBase: new URL("https://haneenabouhamdan.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "HA · Haneen Abou Hamdan — Senior Software Engineer & Engineering Lead",
    description:
      "Building scalable software, AI-powered platforms and enterprise digital experiences.",
    url: "https://haneenabouhamdan.com",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Haneen Abou Hamdan — Senior Software Engineer & Engineering Lead · Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HA · Haneen Abou Hamdan — Senior Software Engineer & Engineering Lead",
    description:
      "Building scalable software, AI-powered platforms and enterprise digital experiences.",
    images: ["/og.png"],
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
