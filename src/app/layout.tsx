import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import ClientThemeWrapper from "../components/ClientThemeWrapper";
import { GoogleAnalytics } from '@next/third-parties/google'
import { LocalProvider } from "app/components/LocalStorageContext";


const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
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
      <html lang="en" suppressHydrationWarning={true}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          <GoogleAnalytics gaId="G-2QPQL3Q6EW" />
          <LocalProvider>
            <ClientThemeWrapper>
              {children}
            </ClientThemeWrapper>
          </LocalProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
