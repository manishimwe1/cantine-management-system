import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import type { Metadata } from "next";
import "../globals.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Canteen Management System",
  description: "Canteen Management System",
  icons: {
    icon: "/convex.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sidebarOpen = true; //:TODO
  const user = await auth();
  if (!user?.user) {
    return redirect("/login");
  }
  return (
    <main className="flex h-screen bg-gray-50">
      <Sidebar />
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-58" : "ml-20"}`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </main>
  );
}
