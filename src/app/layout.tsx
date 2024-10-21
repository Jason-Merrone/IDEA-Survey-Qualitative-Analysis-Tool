import "~/styles/globals.css";
import Header from '../components/header'; 
import Footer from '../components/footer'; 

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Idea Ideas",
  description: "Qualitative Idea Survey analysis",
  icons: [{ rel: "icon", url: "https://www.usu.edu/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header /> 
        <main>{children}</main> 
        <Footer /> 
      </body>
    </html>
  );
}
