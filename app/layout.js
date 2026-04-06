import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // Footer එක import කරන්න
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ElectroHub | Premium Electronics Store",
  description: "Get the latest gadgets at best prices",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 transition-colors duration-300">
        <CartProvider>

       
        <Navbar />
        {/* main tag එක flex-1 නිසා footer එක හැමතිස්සෙම පහළට තල්ලු වෙනවා */}
        <main className="flex-1">
          {children}
        </main>
         </CartProvider>
        <Footer /> {/* මෙතනට Footer එක වැටෙනවා */}
      </body>
    </html>
  );
}