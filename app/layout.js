import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import AuthProvider from "@/components/Provider"; // අපි හදාගත්ත SessionProvider එක

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Suma Automation | Premium Industrial Electronics",
  description: "Advanced Automation Solutions & Electronics Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 transition-colors duration-300">
        
        {/* 1. මුලින්ම AuthProvider එකෙන් මුළු app එකම wrap කරනවා */}
        <AuthProvider>
          
          {/* 2. ඊට පස්සේ CartProvider එක */}
          <CartProvider>
            
            <Navbar />
            
            <main className="flex-1">
              {children}
            </main>
            
            {/* Footer එකත් Provider එක ඇතුළට ගත්තා */}
            <Footer /> 
            
          </CartProvider>
          
        </AuthProvider>

      </body>
    </html>
  );
}