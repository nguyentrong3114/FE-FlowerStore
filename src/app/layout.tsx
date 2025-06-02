import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ScrollToTopButton from "@/components/ui/ScrollTopButton";
import Footer from "@/components/ui/Footer";
import { Noto_Sans_Balinese } from "next/font/google";
import ClientOnly from "@/components/base/ClientOnly";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
// Import phông chữ
const notoSans = Noto_Sans_Balinese({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Perfume Store",
  description: "Perfume Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <link rel="icon" type="image/png" href="/logo.png" />
      <body className={`${notoSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            pauseOnHover
            draggable
          />
          <LanguageProvider>
            <AuthProvider>
              <ClientOnly>
                <Navbar />
                <ScrollToTopButton />
              </ClientOnly>
              {children}
              <Footer />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
