import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Dashboard from "./components/dashboard";
import { ExecutionDetailsProvider } from "./components/execution-details-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Faultwise | Centro de monitoreo",
  description:
    "Monitoreo predictivo de fallas en procesos CI/CD. Proyecto de tesis 2027.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ExecutionDetailsProvider>
          <Dashboard>{children}</Dashboard>
        </ExecutionDetailsProvider>
      </body>
    </html>
  );
}
