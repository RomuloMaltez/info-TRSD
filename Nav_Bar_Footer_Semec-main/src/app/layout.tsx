import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "REFIS Municipal 2025 — Porto Velho",
  description:
    "Programa de Estímulo à Regularização Fiscal: descontos de até 100% em multas e juros e parcelamento em até 36 vezes.",
  metadataBase: new URL("https://semec-porto-velho.gov.br"),
  icons: {
    icon: "/logo-semec.svg",
    shortcut: "/logo-semec.svg",
    apple: "/logo-semec.svg",
  },
  openGraph: {
    title: "REFIS Municipal 2025 — Porto Velho",
    description:
      "Programa de Estímulo à Regularização Fiscal com descontos em multas e juros e parcelamento em até 36 vezes.",
    url: "https://semec-porto-velho.gov.br",
    type: "website",
    images: [
      {
        url: "/logo-nfse.png",
        width: 1200,
        height: 630,
        alt: "SEMEC Porto Velho — Emissão de NFS-e",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "REFIS Municipal 2025 — Porto Velho",
    description:
      "Descontos de até 100% em multas e juros e parcelamento em até 36 vezes para débitos municipais.",
    images: ["/logo-nfse.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
