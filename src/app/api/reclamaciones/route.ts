import { NextResponse, type NextRequest } from "next/server";
import { ReclamoCrearSchema } from "@/lib/reclamo-schema";

/**
 * Libro de Reclamaciones: puente entre el formulario y el backend de OVERSITE.
 *
 * El backend no está expuesto a internet: este handler corre en el servidor de Next y lo
 * llama por la red interna de Docker (`OVERSITE_API_URL`, p. ej. http://backend:3000/api).
 * Adapta los nombres del formulario (snake_case) a los de la API (camelCase) y reenvía la
 * IP del visitante, que el backend usa para su límite de peticiones.
 */

export const dynamic = "force-dynamic";

const API_URL = process.env.OVERSITE_API_URL;

type RespuestaBackend = { message?: string | string[] } & Record<string, unknown>;

function error(mensaje: string, status: number) {
  return NextResponse.json({ message: mensaje }, { status });
}

/** IP del visitante: la primera de X-Forwarded-For (Next la completa con la de la conexión). */
function ipVisitante(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
}

async function llamarBackend(req: NextRequest, path: string, init: RequestInit = {}) {
  if (!API_URL) {
    console.error("Falta OVERSITE_API_URL: no se puede contactar al backend de reclamaciones");
    return { res: null, data: null };
  }
  const ip = ipVisitante(req);
  try {
    const res = await fetch(`${API_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(ip ? { "X-Forwarded-For": ip } : {}),
        ...init.headers,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    const data = (await res.json().catch(() => ({}))) as RespuestaBackend;
    return { res, data };
  } catch (e) {
    console.error("No se pudo contactar al backend de reclamaciones:", e);
    return { res: null, data: null };
  }
}

/** Mensaje en español para el formulario a partir de la respuesta del backend. */
function mensajeDeError(status: number, data: RespuestaBackend | null) {
  if (status === 429) return "Demasiados intentos. Espera unos minutos y vuelve a intentarlo.";
  const m = data?.message;
  const texto = Array.isArray(m) ? m[0] : m;
  if (texto && status < 500) return texto;
  if (status === 503 && texto) return texto;
  return "No se pudo registrar el reclamo. Inténtalo nuevamente.";
}

/** RF-REC-015: número referencial de la próxima hoja. */
export async function GET(req: NextRequest) {
  const { res, data } = await llamarBackend(req, "/reclamaciones/siguiente-numero");
  if (!res?.ok || typeof data?.siguiente !== "string") return error("Número no disponible", 502);
  return NextResponse.json({ siguiente: data.siguiente });
}

/** RF-REC-001 a 014: valida con el mismo esquema del formulario y registra la hoja. */
export async function POST(req: NextRequest) {
  const cuerpo = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!cuerpo) return error("Solicitud no válida", 400);

  const { captcha_token: captchaToken, ...campos } = cuerpo;
  const parsed = ReclamoCrearSchema.safeParse(campos);
  if (!parsed.success) return error(parsed.error.issues[0]?.message ?? "Revisa los datos del formulario", 400);
  if (typeof captchaToken !== "string" || !captchaToken) {
    return error("Completa la verificación de seguridad", 400);
  }

  const v = parsed.data;
  const esMenor = v.menor_edad === "si";
  const payload = {
    nombres: v.nombres,
    apellidos: v.apellidos,
    tipoDocumento: v.tipo_documento,
    numeroDocumento: v.numero_documento,
    celular: v.celular,
    correo: v.correo,
    departamento: v.departamento,
    provincia: v.provincia,
    distrito: v.distrito,
    direccion: v.direccion,
    referencia: v.referencia,
    menorEdad: esMenor,
    ...(esMenor ? { apoderadoNombre: v.apoderado_nombre, apoderadoDocumento: v.apoderado_documento } : {}),
    tipoConsumo: v.tipo_consumo,
    numeroPedido: v.numero_pedido,
    fechaIncidente: v.fecha_incidente,
    monto: Number(v.monto),
    descripcionBien: v.descripcion_bien,
    tipoReclamo: v.tipo_reclamo,
    detalle: v.detalle,
    pedido: v.pedido,
    conformidad: v.conformidad,
    captchaToken,
  };

  const { res, data } = await llamarBackend(req, "/reclamaciones", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res) return error("No se pudo conectar con el servidor. Inténtalo más tarde.", 502);
  if (!res.ok) return error(mensajeDeError(res.status, data), res.status >= 500 ? 502 : res.status);

  return NextResponse.json({ numero: data?.numeroHoja, fecha_emision: data?.fechaEmision }, { status: 201 });
}
