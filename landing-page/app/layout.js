import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "X History Recorder - Never Lose a Tweet Again",
  description: "Automatically save your browsing history on Twitter/X. The best Chrome extension to track, search, and manage your viewed tweets locally.",
  keywords: ["Twitter history", "X history", "Chrome extension", "Tweet saver", "Browser history"],
  openGraph: {
    title: "X History Recorder",
    description: "Automatically save your browsing history on Twitter/X.",
    url: "https://x-history.vercel.app", // 假设你会部署到 vercel
    siteName: "X History Recorder",
    images: [
      {
        url: "/images/og-image.png", // 需要准备一张宣传图
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "X History Recorder",
    description: "Never lose a tweet again. Local storage, privacy-first.",
    // images: ["/images/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

