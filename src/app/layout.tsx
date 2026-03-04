import type { Metadata } from "next";
import "./globals.css";
import { Playfair_Display, Caveat } from "next/font/google";
import { LoadingProvider } from "./components/LoadingProvider";
import SmoothScroll from "./components/SmoothScroll";


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
    <html lang="en" className={`${display.variable} ${handwritten.variable}`}>
      <body className="overflow-x-hidden">
         <SmoothScroll>
        <LoadingProvider>{children}</LoadingProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}