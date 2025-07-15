import "./globals.css";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer";

export const metadata = {
  title: "Fetiburgers",
  description: "Delicious burgers delivered to your door",
  icons: {
    icon: "/logo.ico",
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
