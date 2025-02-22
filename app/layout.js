import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { connectMongoDB } from "./lib/mongodb";
import { AuthProvider } from "./Providers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const conn = await connectMongoDB();
  return (
    <html lang="en">
      <body
        className="bg-[#614419]">
          <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">

          <AuthProvider>{children}</AuthProvider>    
            
          </div>
        
      </body>
    </html>
  );
}
