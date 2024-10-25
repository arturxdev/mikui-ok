import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { ThemeProvider } from "./components/ThemeContext";
import ClientThemeWrapper from "./components/ClientThemeWrapper";
import { PHProvider } from "./provider";
import PostHogPageView from "./PostHogageView";

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
  title: "Mikui",
  description: "Practice your english",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="retro">
        <PHProvider>
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
            <PostHogPageView />
            <ThemeProvider>
              <ClientThemeWrapper>
                {children}
              </ClientThemeWrapper>
            </ThemeProvider>
          </body>
        </PHProvider>
      </html>
    </ClerkProvider>
  );
}
