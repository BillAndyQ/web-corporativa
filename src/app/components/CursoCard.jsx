import Link from 'next/link';

const CursoCard = ({ curso }) => {
    const {
      nombre_curso,
      src_portada,
      titulo,
      descripcion,
      fecha_inicio,
      fecha_final,
    } = curso;

  
    // Construir la URL de la imagen si src_portada existe
    const imagenUrl = src_portada ? `${process.env.NEXT_PUBLIC_API_URL}/${src_portada}` : null;
  
    // Función para formatear fechas
    const formatDate = (dateString) =>
      dateString
        ? new Date(dateString).toLocaleDateString('es-ES')
        : 'No especificada';
  
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {imagenUrl && (
          <div className="overflow-hidden">
            <img
              src={imagenUrl}
              alt={`Portada del curso ${nombre_curso}`}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              width={400}
              height={400}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <h2 className="text-xl font-bold text-gray-900">{nombre_curso}</h2>
          <h3 className="pt-1 text-base font-medium text-brand-700">{titulo}</h3>
          <p className="line-clamp-4 pt-3 text-sm leading-6 text-gray-600">{descripcion}</p>
          <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 mt-5 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Fecha de inicio:</dt>
              <dd className="mt-0.5 text-gray-900">{formatDate(fecha_inicio)}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Fecha de finalización:</dt>
              <dd className="mt-0.5 text-gray-900">{formatDate(fecha_final)}</dd>
            </div>
          </dl>
        </div>

        <div className="px-6 pb-6">
          <Link
            href={`/cursos/${curso.id}`}
            className="inline-flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Ver curso
          </Link>
        </div>
      </article>
    );
  };

  export default CursoCard;
