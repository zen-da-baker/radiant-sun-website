// Import components
import type { Metadata } from "next";

import { Header } from "@/page-components/Header";
import { Footer } from "@/page-components/Footer";

// Import styling
import "../../styles/main.css";
import "../../styles/typography.css";

// Create the meta data of the website applied to all pages
export const metadata: Metadata = {
  title: "Radiant Sun",
  description: "This is the official landing page for the video game Radiant Sun. Radiant Sun is an Role Playing Game with super heroes.",
  icons: "/icons/bytesized-orange.png"
};

// The root layout of all pages are applied of which the header and footer are included on all pages
export default function RootLayout( { children } : Readonly < { children: React.ReactNode } > ) {
  
  return (
    <html lang="en">

      <body>

        <Header />

        { children }

        <Footer />

      </body>

    </html>
  )

}
