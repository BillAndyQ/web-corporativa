"use client"
import React, { useEffect, useState } from 'react';
import { Menu, X, Book, Users, Phone, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type NavItem = {
  href: string;
  label: string;
  icon?: React.ElementType;
};

const desktopItems: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/cursos", label: "CURSOS" },
  { href: "/#nosotros", label: "Nosotros", icon: Users },
  { href: "/reclamaciones", label: "Contacto", icon: Phone },
];

const mobileItems: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios", icon: Users },
  { href: "/cursos", label: "Cursos End", icon: Book },
  { href: "/#nosotros", label: "Nosotros", icon: Users },
  { href: "/#contacto", label: "Contacto", icon: Phone },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    !href.includes("#") && (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <nav className="w-full border-b border-gray-200 bg-white/95 text-gray-800 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo + certificación */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-5">
            <Link href="/" aria-label="Inicio" className="shrink-0">
              <Image src="/logo.png" alt="Logo" width={72} height={72} priority quality={100} className="h-16 w-16 object-contain" />
            </Link>
            <Image src="/cert_iso-remove.png" alt="Certificación ISO" width={100} height={100} quality={100} priority className="hidden h-14 w-auto object-contain sm:block" />
            <Link
              href="/consultar-certificados"
              className="hidden items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 sm:inline-flex"
            >
              <BadgeCheck className="h-4 w-4" aria-hidden />
              <span>Consultar certificado</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-1 lg:flex">
            {desktopItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-brand-700"
                }`}
              >
                {Icon && <Icon className="h-4 w-4" aria-hidden />}
                <span>{label}</span>
              </Link>
            ))}
            <Link
              href="/registroParticipante"
              className="ml-2 flex items-center gap-1.5 rounded-lg border border-brand-600 px-4 py-2 text-sm font-semibold text-brand-700 transition-colors hover:bg-brand-600 hover:text-white"
            >
              <span>Registro de participante</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 lg:hidden"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="menu-movil"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="menu-movil" className="max-h-[calc(100vh-7rem)] overflow-y-auto border-t border-gray-200 bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden">
          <div className="space-y-1">
            <Link
              href="/consultar-certificados"
              className="mb-3 flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 sm:hidden"
            >
              <BadgeCheck className="h-5 w-5" aria-hidden />
              <span>Consultar certificado</span>
            </Link>
            {mobileItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 font-medium ${
                  isActive(href) ? "bg-brand-50 text-brand-700" : "text-gray-800 hover:bg-gray-100"
                }`}
              >
                {Icon ? <Icon className="h-5 w-5 text-gray-500" aria-hidden /> : <span className="h-5 w-5" />}
                <span>{label}</span>
              </Link>
            ))}

            <Link
              href="/registroParticipante"
              className="mt-3 flex items-center justify-center gap-2 rounded-lg border border-brand-600 px-4 py-3 font-semibold text-brand-700 hover:bg-brand-50"
            >
              <Book className="h-5 w-5" aria-hidden />
              <span>Registro de participante</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
