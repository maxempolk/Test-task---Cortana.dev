import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/db";
import "@/auth";
import Header from "@/components/header/Header";
import UserProvider from "./UserProvider";
import { me } from "@/actions/me";
import {getLocale} from 'next-intl/server';
import { NextIntlClientProvider } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product store",
  description: "Product store - best products for you",
  icons: {
    icon: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await me();
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark flex flex-col h-screen`}
      >
        <UserProvider initialUser={user}>
          <NextIntlClientProvider>
            <Header />
            {children}
          </NextIntlClientProvider>
        </UserProvider>
      </body>
    </html>
  );
}
