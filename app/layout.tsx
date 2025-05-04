import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
// import { ConvexClientProvider } from "./ConvexClientProvider";
import NextTopLoader from 'nextjs-toploader';
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Stock Management System - Simplify Inventory Control",
  description:
    "A modern and efficient system for managing stock and inventory with ease. Developed by emino.dev.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full scroll-smooth  transition-all duration-200 ease-in-out  overflow-x-hidden`}
      >
        <ConvexClientProvider>
          <div className="w-full  h-full ">
            <SessionProvider>
            <NextTopLoader />
              {children}</SessionProvider>
          </div>
          {/* <Toaster /> */}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
