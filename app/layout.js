import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Infivent Admin Panel",
  // description: "Reactor World Expo Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/next.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
