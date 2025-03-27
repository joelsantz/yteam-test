import type { Metadata } from "next";
import { inter, poppins } from "./styles/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "yteam | Hire Remote Top LaTam Tech Talent",
  description: "Hire remote top Latin Americantech talent, matched to your goals, budget, and time zone seamlessly.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/favicon.ico" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
