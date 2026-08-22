import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Career Passport — Build your career once. Use it everywhere.",
  description: "AI-powered career profile and resume tailoring platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F8F8F8] text-[#0A0A0A] antialiased selection:bg-[#FFEB43] selection:text-black">
        {children}
      </body>
    </html>
  );
}