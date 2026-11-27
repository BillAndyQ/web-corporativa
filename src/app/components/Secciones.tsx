import React from 'react';
import { ServiceCard } from './ServiceCard';
import { Truck, PhoneCall, Mail, Target, Eye, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SeccionServices from './SeccionServices';

const services = [
  {
    title: "Capacitación y Certificación de Personal IZAJE",
    image: "/gruas.jpg",
    services: [
      "Operador de grúa puente",
      "Operador de Grúa telescópica",
      "Operador de Grúa de brazo articulado",
      "Operador de Montacargas",
      "Operador de Man lift",
      "Operador de Telehadler",
      "Supervisor de izaje"
    ]
  },
  {
    title: "Ensayos No Destructivos",
    image: "/cursos/particulas-magneticas.jpeg",
    services: [
      "Partículas Magnéticas",
      "Líquidos Penetrantes",
      "Ultrasonido haz normal y angular",
      "Inspección Visual",
      "Radiografía Industrial",
      "Medición de Dureza",
      "Réplicas Metalográficas"
    ]
  }
];

const galleryImages = [
  "/Cetrificacion-Izaje.jpeg",
  "/maquina-pesada.jpg",
  "/maquinaria.jpg",
  "/maquinarias.jpg",
  "/trabajando.jpg",
  "/gruas.jpg",

];

function Secciones() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-24 lg:px-8">
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Servicios Profesionales de Certificación y Capacitación
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-100 md:text-xl">
            Expertos en certificación, capacitación y ensayos no destructivos
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/servicios" className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-brand-950 shadow-lg shadow-yellow-400/20 transition-colors hover:bg-yellow-300">
              Nuestros Servicios
            </Link>
            <Link href="#contacto" className="rounded-lg border-2 border-white/80 px-6 py-3 font-semibold transition-colors hover:bg-white hover:text-brand-900">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-20" id="nosotros">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Quiénes Somos",
                text: "Somos una empresa que presta servicios de ingeniería, Ensayos No Destructivos, control de calidad de materiales con personal calificado en  uniones soldadas y termo fundidas, inspección estructural de equipos de izaje y certificación de personal operador de  grúas , montacargas, manlift y equipos de transporte.",
              },
              {
                icon: Eye,
                title: "Nuestra Visión",
                text: "Ser reconocida a nivel nacional como una empresa líder en mantenimiento predictivo y metrología con altos estándares de seguridad y confiabilidad.",
              },
              {
                icon: Target,
                title: "Nuestra Misión",
                text: "Brindar servicios de excelencia: Ensayos , certificación de equipos y metrología, aplicando en todo momento una cultura de calidad.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-2xl border border-gray-100 bg-gray-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-100 hover:bg-white hover:shadow-xl"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/30">
                  <Icon className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
                <p className="leading-7 text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-brand-950">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
            Nuestros Servicios
            <span className="mt-3 block h-1 w-16 rounded-full bg-yellow-400" />
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      <SeccionServices/>

      {/* Gallery Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {galleryImages.map((image, index) => (
              <div key={index} className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={800}
                  height={800}
                  sizes="(min-width: 768px) 33vw, 50vw"
                />
                <div className="absolute inset-0 bg-brand-950/0 transition-colors duration-300 group-hover:bg-brand-950/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-20" id="contacto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold text-gray-900 md:text-4xl">
            Contáctanos
            <span className="mt-3 block h-1 w-16 rounded-full bg-brand-600" />
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Phone */}
            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <PhoneCall className="h-6 w-6 text-brand-600" aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Teléfono</h3>
              </div>
            </div>

            {/* Email */}
            <a
              href="mailto:servicios@overhaulmining.com"
              className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <Mail className="h-6 w-6 text-brand-600" aria-hidden />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="break-all text-gray-600">servicios@overhaulmining.com</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <Truck className="h-6 w-6 text-brand-600" aria-hidden />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Oficina Principal</h3>
                <p className="text-gray-600">Cajamarca Perú</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Secciones;
