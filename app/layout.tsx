import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Container from "@/components/global/Container";
import Provider from "./provider";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Next Storefront",
  description: "A nifty store build with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className= {inter.className}>
      <Provider>
        <Navbar/>
        <Container className="py-20" >{children}</Container>
      </Provider>
    </body>
    </html>
  );
}
