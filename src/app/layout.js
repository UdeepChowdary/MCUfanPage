import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const metadata = {
  title: "MCU Encyclopedia & Timeline",
  description: "A highly interactive, premium, multi-page Marvel Cinematic Universe Encyclopedia & Timeline.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} dark`}>
      <body className="bg-void text-starkWhite antialiased min-h-screen overflow-x-hidden">
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-void to-void opacity-80" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
