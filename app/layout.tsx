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
    <html lang="en" className="light bg-[#FBFBFA]" style={{ colorScheme: "light" }}>
      <body className="bg-[#FBFBFA] text-[#171717] min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}