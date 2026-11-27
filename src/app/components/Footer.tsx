import React from 'react';
import { Mail, MapPin, Facebook, Linkedin, Book, BadgeCheck } from 'lucide-react';
import Link from 'next/link';

const linkClass = "text-gray-400 transition-colors hover:text-white";
const headingClass = "mb-4 text-sm font-semibold uppercase tracking-wider text-white";

const Footer = () => {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Company Info */}
          <div>
            <h3 className={headingClass}>Nuestra Empresa</h3>
            <p className="mb-5 text-sm leading-6 text-gray-400">
              Comprometidos con la excelencia y la innovación en cada proyecto que realizamos.
            </p>
            <div className="flex gap-2">
              <Link
                href="https://www.facebook.com/overhaulmining.eirl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="rounded-full bg-white/5 p-2 text-gray-300 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/overhaul-mining-eirl-908b04191/recent-activity/all/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="rounded-full bg-white/5 p-2 text-gray-300 transition-colors hover:bg-brand-600 hover:text-white"
              >
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={headingClass}>Información de Contacto</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-brand-300" aria-hidden />
                <span className="break-all text-gray-400">servicios@overhaulmining</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-300" aria-hidden />
                <span className="text-gray-400">Cajamarca Perú</span>
              </li>
            </ul>
          </div>

          {/* Reclamos Info */}
          <div>
            <h3 className={headingClass}>Libro reclamaciones</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Book size={18} className="shrink-0 text-brand-300" aria-hidden />
                <Link href="/reclamaciones" className={linkClass}>
                  Reclamaciones
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <BadgeCheck size={18} className="shrink-0 text-brand-300" aria-hidden />
                <Link href="/politica-calidad" className={linkClass}>
                  Política de Calidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={headingClass}>Enlaces Rápidos</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className={linkClass}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className={linkClass}>
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="/cursos" className={linkClass}>
                  Cursos End
                </Link>
              </li>
              <li>
                <Link href="/contacto" className={linkClass}>
                  contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className={headingClass}>Boletín Informativo</h3>
            <p className="mb-4 text-sm leading-6 text-gray-400">
              Suscríbete para recibir las últimas noticias y actualizaciones.
            </p>
            <form className="space-y-2">
              <label htmlFor="footer-email" className="sr-only">
                Tu correo electrónico
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} OverHaul Mining. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
