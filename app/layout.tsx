import { ReactQueryProvider } from "@/global/provider/ReactQueryProvider";
import { Inter } from "next/font/google"; // ✅ Use Nunito
import type { Metadata } from "next";
import "./globals.css";

// ✅ Import Nunito
const nunito = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // choose the weights you need
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Cravings - Restaurant Management",
  description: "Streamline your restaurant operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased`}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
