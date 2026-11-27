'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import CursoCard from '@/app/components/CursoCard';

const Cursos = () => {
  const [cursos, setCursos] = useState([]);
  //loading
  const [loading, setLoading] = useState(true);
  //error
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/public/cursos')
      .then((response) => {
        setCursos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-[70vh] bg-gray-50">
      {loading ? (
        <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-gray-600">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" aria-hidden />
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="mx-auto max-w-xl px-4 py-20">
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            <p>Error: {error.message}</p>
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
          {cursos.map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cursos;
