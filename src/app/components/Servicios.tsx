"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'; // Importa Link de next/navigation

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

interface ServiceSectionProps {
    title: string;
    items: string[];
    imageSlot: React.ReactNode;
    buttonText?: string;
    whatsappLink: string; // Añadido whatsappLink para cada sección
}

const ServiceSection: React.FC<ServiceSectionProps> = ({ title, items, imageSlot, buttonText = "Contactar ahora", whatsappLink }) => (
    <motion.div
        className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        <div className="grid lg:grid-cols-2">
            <div className="p-6 sm:p-8 lg:p-10">
                <h2 className="text-2xl font-bold text-brand-800 md:text-3xl">{title}</h2>
                <span className="mb-6 mt-3 block h-1 w-14 rounded-full bg-yellow-400" />
                <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {items.map((item, index) => (
                        <motion.li
                            key={index}
                            className="flex items-start gap-2 text-gray-700"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600" aria-hidden />
                            <span>{item}</span>
                        </motion.li>
                    ))}
                </ul>

                <Link
                    href={whatsappLink}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-2.5 font-semibold text-white shadow-md shadow-brand-600/20 transition-all hover:-translate-y-0.5 hover:bg-brand-700 active:translate-y-0"
                >
                    <PhoneCall className="h-4 w-4" aria-hidden />
                    {buttonText}
                </Link>
            </div>

            <div className="relative min-h-[260px] bg-gray-100 lg:min-h-full">
                {imageSlot}
            </div>
        </div>
    </motion.div>
);

export default function ServicesPage() {
    const ensayosItems = [
        "Partículas Magnéticas",
        "Líquidos Penetrantes",
        "Ultrasonido haz normal y angular",
        "Inspección Visual",
        "Radiografía Industrial",
        "Medición de Dureza",
        "Réplicas Metalográficas",
        "Prueba de Fuga"
    ];

    const capacitacionItems = [
        "Operador de Grúa puente",
        "Operador de Grúa telescópica",
        "Operador de Grúa de brazo articulado",
        "Operador de Montacargas",
        "Operador de Man lift",
        "Operador de Telehandler",
        "Operador de Monorriel",
        "Entrenadores en Izaje de NACE",
        "Operador de Grúas pórtico",
        "Supervisor de Izaje",
        "Riggers",
        "Venteros",
        "Estrobadores"
    ];

    const certificacionItems = [
        "Grúas Pluma de Colonia",
        "Camión Grúas articuladas",
        "Grúas Puente",
        "Grúas móviles",
        "Telescópica",
        "Grúas Pórtico",
        "Eslingas de cadena",
        "Eslingas de cable",
        "Eslingas sintéticas",
        "Aparejos",
        "Ganchos",
        "Grilletes",
        "Tensores"
    ];

    // Enlace de WhatsApp común
    // const whatsappLink = "https://api.whatsapp.com/send/?phone=51976225732&text=Hola%2C+me+gustar%C3%ADa+recibir+una+cotizaci%C3%B3n+sobre+ensayo+no+destructivos.&type=phone_number&app_absent=0";
    const whatsappLink = ""

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-brand-900 px-4 py-16 sm:px-6 md:py-20 lg:px-8">
                <motion.h1
                    className="mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight text-white md:text-5xl"
                    {...fadeIn}
                >
                    OVERHAUL MINING BRINDA SERVICIOS DE INGENIERÍA
                </motion.h1>
                <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-yellow-400" />
            </div>

            <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <ServiceSection
                    title="ENSAYOS NO DESTRUCTIVOS"
                    items={ensayosItems}
                    imageSlot={
                        <div className="absolute inset-0">
                            {/* Placeholder for your first image */}
                            <Image
                                src="/ensanos-no-destructivos.jpeg"
                                alt="ensayos no destructivos"
                                fill
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                    }
                    whatsappLink={whatsappLink}  // Pasar enlace de WhatsApp
                />

                <ServiceSection
                    title="Capacitación y certificación de personal Izaje"
                    items={capacitacionItems}
                    imageSlot={
                        <div className="absolute inset-0">
                            {/* Placeholder for your second image */}
                            <Image
                                src="/grua.jpg"  // Ajusta la ruta de la imagen
                                alt="Capacitación y certificación"
                                fill
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                    }
                    whatsappLink={whatsappLink}  // Pasar enlace de WhatsApp
                />

                <ServiceSection
                    title="Certificación de Equipos y personal de Izaje"
                    items={certificacionItems}
                    imageSlot={
                        <div className="absolute inset-0">
                            {/* Placeholder for your third image */}
                            <Image
                                src="/equipos.jpeg"  // Ajusta la ruta de la imagen
                                alt="Certificación de equipos"
                                fill
                                sizes="(min-width: 1024px) 50vw, 100vw"
                                className="object-cover"
                            />
                        </div>
                    }
                    whatsappLink={whatsappLink}  // Pasar enlace de WhatsApp
                />
            </div>

        </div>
    );
}
