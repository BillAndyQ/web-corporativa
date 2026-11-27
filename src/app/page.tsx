import React from 'react'
import Carrusel from './components/Carrusel'
import Secciones from "@/app/components/Secciones"
import LogoCarousel from './components/empresas-carrusel'

function Page() {
  return (
    <div>
      <Carrusel />
      <Secciones />
      <LogoCarousel />
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
        {/* <HeroVideoDialog
          className="block dark:hidden"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/watch?v=2BrzqUQAQTQ"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
          thumbnailAlt="Hero Video"
        />
        <HeroVideoDialog
          className="hidden dark:block"
          animationStyle="from-center"
          videoSrc="https://www.youtube.com/watch?v=2BrzqUQAQTQ"
          thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
          thumbnailAlt="Hero Video"
        /> */}
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gray-900 shadow-xl ring-1 ring-black/5">
        <iframe className="h-full w-full" width="560" height="315" src="https://www.youtube.com/embed/2BrzqUQAQTQ?si=BoM-UByeq0ZJdZLe" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        </div>
      </section>
    </div>
  )
}

export default Page