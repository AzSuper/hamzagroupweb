import type { Metadata } from "next";
import "./globals.css";
import "../components/Navbar";
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import PageTransition from '../utils/PageTransition';

import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: "Hamza Group",
  description: "Generated by AzSuper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-light antialiased relative bg-slate-100">
        <Navbar />
        <PageTransition>
        {children}
        <Toaster richColors />
        </PageTransition>
        <Footer/>
      </body>
    </html>
  );
}
