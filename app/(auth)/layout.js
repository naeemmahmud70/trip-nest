import Navbar from "@/components/Navbar";
import { dbConnect } from "@/service/mongo";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StaySwift",
  description: "One Place Stop for Hospitability",
  icons: {
    icon: "/favicon.ico?v=2", // 👈 add ?v=2 to bust cache
  },
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
      </head>
      <body className={inter.className}>
        <Navbar sideMenu={false} />
        <main>{children}</main>
      </body>
    </html>
  );
}
