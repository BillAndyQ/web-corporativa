"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const images = [
    {
        url: "/capacitacion.png",
        title: "CAPACITACIÓN Y CERTIFICACIÓN DE PERSONAL IZAJE",
        description: "Operador Grua puente - Operador Grua telescopica"
    },
    {
        url: "/img/mina.jpeg",
        title: "Gruas puentes - Gruas movil",
        description: "Equipos dedicados y especializados"
    },
    {
        url: "/img/trabajo-campo.png",
        title: "Trabajo Efectivo",
        description: "Eficiencia y rapidez"
    },
    {
        url: "/image-carrusel/image4.png",
        title: "Equipo especializado",
        description: "Servicio rápido y eficiente"
    }
];

const INTERVALO_MS = 6000;

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, []);

    const handlePrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(handleNext, INTERVALO_MS);
        return () => clearInterval(timer);
    }, [isPaused, handleNext, currentIndex]);

    return (
        <section
            className="relative h-[70vh] min-h-[420px] w-full overflow-hidden bg-brand-950 md:h-[calc(100vh-7.5rem)] md:max-h-[820px]"
            aria-roledescription="carrusel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {images.map((image, index) => {
                const active = index === currentIndex;
                return (
                    <div
                        key={image.url}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
                        aria-hidden={!active}
                    >
                        <Image
                            src={image.url}
                            alt={image.title}
                            fill
                            priority={index === 0}
                            sizes="100vw"
                            className={`object-cover object-bottom transition-transform duration-[7000ms] ease-out ${active ? "scale-105" : "scale-100"}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/50 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-20 sm:px-10 md:items-center md:pb-0 lg:px-8">
                            <div className={`max-w-3xl transition-all duration-700 ${active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
                                <span className="mb-4 block h-1 w-16 rounded-full bg-yellow-400" />
                                <p className="text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow sm:text-4xl md:text-5xl lg:text-6xl">
                                    {image.title}
                                </p>
                                <p className="mt-4 text-lg font-medium text-gray-200 sm:text-xl md:text-2xl">
                                    {image.description}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Navigation Buttons */}
            <button
                onClick={handlePrevious}
                aria-label="Anterior"
                className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/25 sm:block"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={handleNext}
                aria-label="Siguiente"
                className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-white/30 bg-white/10 p-3 text-white backdrop-blur transition hover:bg-white/25 sm:block"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
                {images.map((image, index) => (
                    <button
                        key={image.url}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Ir a la imagen ${index + 1}`}
                        aria-current={currentIndex === index}
                        className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index
                            ? 'w-8 bg-yellow-400'
                            : 'w-2 bg-white/60 hover:bg-white'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Carousel;
