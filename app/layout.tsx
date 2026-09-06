import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NOVA - Team Productivity Platform",
  description: "Plan. Collaborate. Deliver.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}