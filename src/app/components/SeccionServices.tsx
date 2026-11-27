"use client"
import React from 'react';
//import Carousel from './components/Carousel';
import ServiceCardCarousel from './serviceCardCarrusel';
import Image from 'next/image';

function SeccionServices() {


  // Imágenes para los carruseles de las tarjetas de servicios
  const equipmentCertificationImages = [
    <Image key="crane-1" src="/img/maquinaria-grua.jpg" alt="Grúa" className="h-full w-full object-cover" width={800} height={600} sizes="(min-width: 768px) 40vw, 100vw"/>,
    <Image key="crane-2" src="/img/persona-mina.jpeg" alt="persona-mina" className="h-full w-full object-cover" width={800} height={600} sizes="(min-width: 768px) 40vw, 100vw"/>,
    <Image key="crane-3" src="/img/mina.jpeg" alt="Grúa" className="h-full w-full object-cover" width={800} height={600} sizes="(min-width: 768px) 40vw, 100vw"/>
  ];

  const personnelCertificationImages = [
    <Image key="operator-1" src="/img/izaje.jpeg" alt="Operador" className="h-full w-full object-cover" width={800} height={600} sizes="(min-width: 768px) 40vw, 100vw"/>,
    <Image key="operator-2" src="/img/izaje2.jpg" alt="Operador" className="h-full w-full object-cover" width={800} height={600} sizes="(min-width: 768px) 40vw, 100vw"/>,
    <Image key="operator-3" src="/img/izaje3.jpg" alt="Operador" className="h-full w-full object-cover" width={800} height={600} sizes="(min-width: 768px) 40vw, 100vw"/>
  ];

  const maintenanceImages = [
    <Image key="maintenance-1" src="/img/mantenimiento1.jpg" alt="Mantenimiento" className="h-full w-full object-cover" width={800} height={600} sizes="(min-width: 768px) 40vw, 100vw"/>,
    <Image key="maintenance-2" src="/img/mantenimiento2.jpg" alt="Mantenimiento" className="h-full w-full object-cover" width={800} height={600} sizes="(min-width: 768px) 40vw, 100vw"/>,
    <Image key="maintenance-3" src="/img/mantenimiento3.jpg" alt="Mantenimiento" className="h-full w-full object-cover" width={800} height={600} sizes="(min-width: 768px) 40vw, 100vw"/>
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Carousel */}
      {/* <Carousel items={carouselItems} /> */}

      {/* Services Section */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-14 text-center text-3xl font-bold text-gray-900 md:text-4xl">Nuestros Servicios<span className="mx-auto mt-3 block h-1 w-16 rounded-full bg-brand-600" /></h2>

          <div className="flex flex-col gap-10">
            {/* Service 1 */}
            <div className="grid overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition-shadow duration-300 hover:shadow-xl md:grid-cols-2">
              <ServiceCardCarousel images={equipmentCertificationImages} />
              <div className="flex flex-col justify-center p-8 md:p-10">
                <h3 className="mb-3 text-2xl font-bold text-brand-800">Certificación de equipos de izaje</h3>
                <p className="leading-7 text-gray-600">Ofrecemos servicios de certificación para todo tipo de equipos de izaje, garantizando su seguridad y cumplimiento normativo.</p>
                {/* <Link href="https://api.whatsapp.com/send/?phone=51976225732&text=Hola%2C+me+gustar%C3%ADa+recibir+una+cotizaci%C3%B3n+sobre+ensayo+no+destructivos.&type=phone_number&app_absent=0" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                  Más información
                </Link> */}
              </div>
            </div>

            {/* Service 2 */}
            <div className="grid overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition-shadow duration-300 hover:shadow-xl md:grid-cols-2 md:[&>*:first-child]:order-2">
              <ServiceCardCarousel images={personnelCertificationImages} />
              <div className="flex flex-col justify-center p-8 md:p-10">
                <h3 className="mb-3 text-2xl font-bold text-brand-800">Certificación de personal</h3>
                <p className="leading-7 text-gray-600">Certificamos operadores de grúas y personal especializado en izaje, asegurando que cumplan con los estándares de seguridad requeridos.</p>
                {/* <Link href="https://api.whatsapp.com/send/?phone=51976225732&text=Hola%2C+me+gustar%C3%ADa+recibir+una+cotizaci%C3%B3n+sobre+ensayo+no+destructivos.&type=phone_number&app_absent=0" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                  Más información
                </Link> */}
              </div>
            </div>

            {/* Service 3 */}
            <div className="grid overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm transition-shadow duration-300 hover:shadow-xl md:grid-cols-2">
              <ServiceCardCarousel images={maintenanceImages} />
              <div className="flex flex-col justify-center p-8 md:p-10">
                <h3 className="mb-3 text-2xl font-bold text-brand-800">Mantenimiento Industrial</h3>
                <p className="leading-7 text-gray-600">Servicios completos de mantenimiento preventivo, correctivo, planeamiento y soldadura industrial para optimizar sus operaciones.</p>
                {/* <Link href="https://api.whatsapp.com/send/?phone=51976225732&text=Hola%2C+me+gustar%C3%ADa+recibir+una+cotizaci%C3%B3n+sobre+ensayo+no+destructivos.&type=phone_number&app_absent=0" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                  Más información
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-brand-600 px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">¿Necesita nuestros servicios?</h2>
          <p className="text-lg text-brand-100">Contáctenos hoy mismo para obtener más información sobre nuestros servicios de certificación y mantenimiento industrial.</p>
          {/* <Link href="https://api.whatsapp.com/send/?phone=51976225732&text=Hola%2C+me+gustar%C3%ADa+recibir+una+cotizaci%C3%B3n+sobre+ensayo+no+destructivos.&type=phone_number&app_absent=0" className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300">
            Más información
          </Link> */}
        </div>
      </section>


    </div>
  );
}

export default SeccionServices;