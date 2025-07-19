import "./globals.css";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer";

export const metadata = {
  title: "Fetiburgers",
  description: "Deliciosas hamburguesas entregadas a tu puerta.",
  icons: {
    icon: "/icono.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        
        <Footer />

      </body>
    </html>
  );
}
