import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "../lib/ToastProvider";
import TopBar from "../components/layout/TopBar";
import LeftSideBar from "../components/layout/LeftSideBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Borcelle Admin Dashboard",
  description: "Manage Borcelle's store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <ToastProvider />
          <div className="flex h-screen">
            <LeftSideBar />
            <div className="flex flex-col flex-1">
              <TopBar />
              <div className="flex-1 overflow-y-auto p-4">{children}</div>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
