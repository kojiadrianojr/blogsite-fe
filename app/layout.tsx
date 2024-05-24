import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Blogsite",
  description: "Connecting People",
};

export const revalidate = 3600;
export const fetchCache = 'force-cache';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <div className="container mx-auto p-0">
          {children}
        </div>
      </body>
    </html>
  );
}
