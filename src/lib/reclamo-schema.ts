import { z } from "zod";

export const TIPOS_DOCUMENTO = ["DNI", "Carné de extranjería", "Pasaporte", "RUC"] as const;

export const TIPOS_CONSUMO = ["Producto", "Servicio"] as const;

export const TIPOS_RECLAMO = ["Reclamo", "Queja"] as const;

export const DEPARTAMENTOS = [
  "Amazonas",
  "Áncash",
  "Apurímac",
  "Arequipa",
  "Ayacucho",
  "Cajamarca",
  "Callao",
  "Cusco",
  "Huancavelica",
  "Huánuco",
  "Ica",
  "Junín",
  "La Libertad",
  "Lambayeque",
  "Lima",
  "Loreto",
  "Madre de Dios",
  "Moquegua",
  "Pasco",
  "Piura",
  "Puno",
  "San Martín",
  "Tacna",
  "Tumbes",
  "Ucayali",
] as const;

const requerido = (campo: string, max = 150) =>
  z
    .string()
    .trim()
    .min(1, `Ingresa ${campo}`)
    .max(max, `Máximo ${max} caracteres`);

const opcion = <T extends readonly [string, ...string[]]>(valores: T) =>
  z.enum(valores, { error: "Selecciona una opción" });

const hoyISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const ReclamoCrearSchema = z
  .object({
    // 1. Identificación del consumidor
    nombres: requerido("tus nombres", 100),
    apellidos: requerido("tus apellidos", 100),
    tipo_documento: opcion(TIPOS_DOCUMENTO),
    numero_documento: z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9-]{6,20}$/, "Ingresa un número de documento válido"),
    celular: z
      .string()
      .trim()
      .regex(/^9\d{8}$/, "Ingresa un celular válido de 9 dígitos"),
    correo: z.string().trim().pipe(z.email("Ingresa un correo válido")),
    departamento: opcion(DEPARTAMENTOS),
    provincia: requerido("la provincia", 100),
    distrito: requerido("el distrito", 100),
    direccion: requerido("la dirección", 200),
    referencia: requerido("una referencia", 200),
    menor_edad: z.enum(["no", "si"]),
    apoderado_nombre: z.string().trim().max(150),
    apoderado_documento: z.string().trim().max(20),

    // 2. Bien contratado
    tipo_consumo: opcion(TIPOS_CONSUMO),
    numero_pedido: requerido("el número de pedido", 50),
    fecha_incidente: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Ingresa la fecha del incidente")
      .refine((f) => f <= hoyISO(), "La fecha no puede ser futura"),
    monto: z
      .string()
      .trim()
      .regex(/^\d+(\.\d{1,2})?$/, "Ingresa un monto válido (ej. 150.00)"),
    descripcion_bien: requerido("la descripción", 1000),

    // 3. Detalle de la reclamación
    tipo_reclamo: opcion(TIPOS_RECLAMO),
    detalle: requerido("el detalle", 3000),
    pedido: requerido("tu pedido", 2000),

    conformidad: z.boolean().refine((v) => v, "Debes aceptar los términos para continuar"),
  })
  .superRefine((data, ctx) => {
    if (data.menor_edad !== "si") return;
    if (!data.apoderado_nombre) {
      ctx.addIssue({ code: "custom", path: ["apoderado_nombre"], message: "Ingresa el nombre del apoderado" });
    }
    if (!/^[A-Za-z0-9-]{6,20}$/.test(data.apoderado_documento)) {
      ctx.addIssue({
        code: "custom",
        path: ["apoderado_documento"],
        message: "Ingresa un número de documento válido",
      });
    }
  });

export type ReclamoCrearInput = z.input<typeof ReclamoCrearSchema>;
export type ReclamoCrear = z.output<typeof ReclamoCrearSchema>;
