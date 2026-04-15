import React from 'react'
import Navbar from '../components/Navbar'
import Navegacion from '../components/Navegacion'

function Page() {
    return (
        /* z-[50] (o un número alto) asegura que esté por encima del footer */
        <div className="fixed inset-0 z-[99] h-screen w-full bg-white">
            <Navbar />
            <Navegacion />

            <iframe 
                src="https://app.overhaulmining.com/reclamaciones" 
                className="h-full w-full border-0"
                title="Libro de Reclamaciones"
                allowFullScreen
            />
        </div>
    )
}

export default Page