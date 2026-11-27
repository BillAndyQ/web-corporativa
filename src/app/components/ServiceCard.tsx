import React from 'react';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  services: string[];
  image: string;
}

export function ServiceCard({ title, services, image }: ServiceCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur transition-colors hover:border-white/20">
      <div className="relative h-60 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />
        <h3 className="absolute inset-x-0 bottom-0 p-6 text-xl font-bold text-white md:text-2xl">{title}</h3>
      </div>
      <div className="p-6">
        <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {services.map((service, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" aria-hidden />
              <span className="text-gray-200">{service}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
