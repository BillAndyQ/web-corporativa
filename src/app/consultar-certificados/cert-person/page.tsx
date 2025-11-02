"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useSearchParams } from "next/navigation";

interface certPerson {
  dni: string;
  n_order: string;
  src_certificate: string;
  date: string;
  names: string;
  last_names: string;
}

export default function PageCertPerson() {
  const searchParams = useSearchParams();
  const [dni, setDni] = useState("");
  const [codigo, setCodigo] = useState("");
  const [data, setData] = useState<certPerson | null>(null);

  const fetchData = async (dniValue: string, codigoValue: string) => {
    if (!dniValue || !codigoValue) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search-certificados/persona?dni=${dniValue}&codigo=${codigoValue}`
    );
    const result = await res.json();
    console.log(result);
    setData(result.data || null);
  };

  // 🔍 Al cargar la página, lee los params y busca automáticamente
  useEffect(() => {
    const dniParam = searchParams.get("dni");
    const codigoParam = searchParams.get("codigo");

    if (dniParam) setDni(dniParam);
    if (codigoParam) setCodigo(codigoParam);

    if (dniParam && codigoParam) {
      fetchData(dniParam, codigoParam);
    }
  }, [searchParams]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="font-bold text-2xl mb-2">Certificaciones de Personal</h2>
      <div className="mb-4">
        <Input placeholder="Ingrese DNI" value={dni} onChange={(e) => setDni(e.target.value)} />
        <Input placeholder="CODIGO" className="mt-2" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
      </div>
      <Button onClick={() => fetchData(dni, codigo)}>Buscar</Button>

      {data && (
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>DNI</TableHead>
              <TableHead>Código</TableHead>
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
              <TableCell>
                {data.names} {data.last_names}
              </TableCell>
              <TableCell>
                <Button onClick={() => window.open(data.src_certificate, "_blank")}>Descargar</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
}
