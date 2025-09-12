import { ReactQueryProvider } from "@/global/provider/ReactQueryProvider";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

// ✅ Import Poppins
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // choose the weights you need
  variable: "--font-poppins",
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
      <body className={`${poppins.className} antialiased`}>
        <ReactQueryProvider>
            {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}