"use client";
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

  interface certPerson {
    dni: string;
    n_order: string;
    src_certificate: string;
    date: string;
    names: string;
    last_names: string;
  }

export default function PageCertPerson() {

  const [dni, setDni] = useState("");
  const [codigo, setCodigo] = useState("");
  const [data, setData] = useState <certPerson | null>(
    null
  );

  const fetchData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/search-certificados/persona?dni=${dni}&codigo=${codigo}`);
    const data = await res.json();
    console.log(data);
    setData(data.data || null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="font-bold text-2xl mb-2">Certificaciones de Personal</h2>
      <div className="mb-4">
        <Input placeholder="Ingrese DNI" value={dni} onChange={(e) => setDni(e.target.value)} />
        <Input placeholder="CODIGO" className='mt-2' value={codigo} onChange={(e) => setCodigo(e.target.value)}/>
      </div>
      <Button onClick={fetchData}>Buscar</Button>

      {data && (
      <Table className='mt-4'>
        <TableHeader>
          <TableRow>
            <TableHead>DNI</TableHead>
            <TableHead>Codigo</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Certificado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow key={data.dni}>
              <TableCell>{data.dni}</TableCell>
              <TableCell>{data.n_order}</TableCell>
              <TableCell>{data.date}</TableCell>
              <TableCell>{data.names} {data.last_names}</TableCell>
              <TableCell>
                <Button onClick={() => window.open(data.src_certificate, '_blank')}>Descargar</Button>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
      )}
    </div>
  )
}
