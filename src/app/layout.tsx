import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Navegacion from "./components/Navegacion";
import { Providers } from "./providers";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <title>Mina de Servicios | Ofrecemos soluciones en minería</title>
        <meta
          name="description"
          content="Descubre los servicios especializados que ofrece nuestra mina, con tecnología de punta y compromiso con el medio ambiente."
        />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-gray-900">
        <Providers>
          <header className="sticky top-0 z-50 w-full shadow-sm">
            <Navbar />
            <Navegacion />
          </header>
          <main className="w-full flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
