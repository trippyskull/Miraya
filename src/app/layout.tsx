import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { Playfair_Display, Caveat } from "next/font/google";

import "./globals.css";
import { LoadingProvider } from "./components/LoadingProvider";


const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const handwritten = Caveat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-hand",
});

export const metadata: Metadata = {
  title: "Miraya Shop",
  description: "Miraya shopping experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LoadingProvider>{children}</LoadingProvider>
      </body>
    </html>
  );
}