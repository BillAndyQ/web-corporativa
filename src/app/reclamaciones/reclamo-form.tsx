"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Printer } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm, useWatch, type Control, type FieldPath } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  DEPARTAMENTOS,
  ReclamoCrearSchema,
  TIPOS_CONSUMO,
  TIPOS_DOCUMENTO,
  type ReclamoCrear,
  type ReclamoCrearInput,
} from "@/lib/reclamo-schema";
import { cn } from "@/lib/utils";
import { Turnstile, type TurnstileHandle } from "./turnstile";

type Campo = FieldPath<ReclamoCrearInput>;

const valoresIniciales: Partial<ReclamoCrearInput> = {
  nombres: "",
  apellidos: "",
  numero_documento: "",
  celular: "",
  correo: "",
  provincia: "",
  distrito: "",
  direccion: "",
  referencia: "",
  menor_edad: "no",
  apoderado_nombre: "",
  apoderado_documento: "",
  numero_pedido: "",
  fecha_incidente: "",
  monto: "",
  descripcion_bien: "",
  detalle: "",
  pedido: "",
  conformidad: false,
};

const TIPOS_RECLAMO_INFO = [
  { valor: "Reclamo", texto: "Disconformidad relacionada a los productos o servicios." },
  {
    valor: "Queja",
    texto:
      "Disconformidad no relacionada a los productos o servicios o malestar o descontento respecto a la atención al público.",
  },
] as const;

const PLACEHOLDER_SELECT = "—Por favor, elige una opción—";

const fechaLarga = (fecha: Date) =>
  fecha.toLocaleDateString("es-PE", { day: "numeric", month: "long", year: "numeric" });

const hoy = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/* ---------- Piezas reutilizables ---------- */

function Requerido() {
  return <span className="text-destructive"> *</span>;
}

function Seccion({ numero, titulo, children }: { numero: number; titulo: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 text-base font-semibold">
        <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
          {numero}
        </span>
        {titulo}
      </h2>
      {children}
    </section>
  );
}

type CampoBaseProps = {
  control: Control<ReclamoCrearInput>;
  name: Campo;
  label: string;
  hint?: string;
  className?: string;
};

function CampoTexto({
  control,
  name,
  label,
  hint,
  className,
  ...inputProps
}: CampoBaseProps & Omit<React.ComponentProps<typeof Input>, "name">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            <Requerido />
          </FormLabel>
          <FormControl>
            <Input {...inputProps} {...field} value={(field.value as string | undefined) ?? ""} />
          </FormControl>
          {hint && <FormDescription>{hint}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function CampoAreaTexto({
  control,
  name,
  label,
  hint,
  className,
  ...textareaProps
}: CampoBaseProps & Omit<React.ComponentProps<typeof Textarea>, "name">) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            <Requerido />
          </FormLabel>
          <FormControl>
            <Textarea {...textareaProps} {...field} value={(field.value as string | undefined) ?? ""} />
          </FormControl>
          {hint && <FormDescription>{hint}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function CampoSelect({
  control,
  name,
  label,
  hint,
  className,
  opciones,
}: CampoBaseProps & { opciones: readonly string[] }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            <Requerido />
          </FormLabel>
          <Select value={(field.value as string | undefined) ?? ""} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger ref={field.ref} onBlur={field.onBlur}>
                <SelectValue placeholder={PLACEHOLDER_SELECT} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {opciones.map((op) => (
                <SelectItem key={op} value={op}>
                  {op}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hint && <FormDescription>{hint}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/* ---------- Pantalla de confirmación ---------- */

function ReclamoEnviado({
  numero,
  fecha,
  correo,
  onNuevo,
}: {
  numero: string;
  fecha: Date;
  correo: string;
  onNuevo: () => void;
}) {
  return (
    <Card>
      <CardHeader className="items-center text-center">
        <CheckCircle2 className="mx-auto size-12 text-green-600" />
        <CardTitle className="text-xl">Reclamo registrado</CardTitle>
        <CardDescription>Tu hoja de reclamación fue registrada el {fechaLarga(fecha)}.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 text-center">
        <div className="rounded-lg border bg-muted/50 px-6 py-3">
          <p className="text-xs uppercase text-muted-foreground">N° de hoja</p>
          <p className="font-mono text-2xl font-semibold">{numero}</p>
        </div>
        <p className="max-w-md text-sm text-muted-foreground">
          Guarda este número para dar seguimiento. Te responderemos a <strong>{correo}</strong> en un plazo no
          mayor a quince (15) días calendario.
        </p>
        <div className="flex flex-wrap justify-center gap-2 print:hidden">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer /> Imprimir
          </Button>
          <Button onClick={onNuevo}>Registrar otro reclamo</Button>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------- Formulario ---------- */

export default function ReclamoForm({ siteKey }: { siteKey?: string }) {
  const [numeroHoja, setNumeroHoja] = useState("------");
  const [enviado, setEnviado] = useState<{ numero: string; fecha: Date; correo: string } | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [faltaCaptcha, setFaltaCaptcha] = useState(false);
  const captcha = useRef<TurnstileHandle>(null);

  const form = useForm<ReclamoCrearInput, unknown, ReclamoCrear>({
    resolver: zodResolver(ReclamoCrearSchema),
    defaultValues: valoresIniciales,
  });
  const { control, handleSubmit, reset, formState } = form;

  const esMenor = useWatch({ control, name: "menor_edad" }) === "si";

  const cargarNumero = useCallback(() => {
    fetch("/api/reclamaciones")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { siguiente: string }) => setNumeroHoja(data.siguiente))
      .catch(() => setNumeroHoja("------"));
  }, []);

  useEffect(() => {
    cargarNumero();
  }, [cargarNumero]);

  async function onSubmit(values: ReclamoCrear) {
    if (!captchaToken) {
      setFaltaCaptcha(true);
      toast.error("Completa la verificación de seguridad");
      return;
    }
    const datos =
      values.menor_edad === "si" ? values : { ...values, apoderado_nombre: "", apoderado_documento: "" };
    const payload = { ...datos, captcha_token: captchaToken };
    try {
      const res = await fetch("/api/reclamaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(data.message ?? "No se pudo registrar el reclamo");
        // Cada token sirve para un solo envío: se pide otro para el siguiente intento
        captcha.current?.reset();
        return;
      }
      setEnviado({ numero: data.numero, fecha: new Date(data.fecha_emision), correo: values.correo });
      toast.success(`Hoja de reclamación N° ${data.numero} registrada`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Error de conexión. Inténtalo nuevamente.");
      captcha.current?.reset();
    }
  }

  if (enviado) {
    return (
      <ReclamoEnviado
        {...enviado}
        onNuevo={() => {
          reset(valoresIniciales);
          setCaptchaToken(null);
          setFaltaCaptcha(false);
          setEnviado(null);
          cargarNumero();
        }}
      />
    );
  }

  return (
    <Card>
      <CardHeader className="gap-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-2xl">Libro de Reclamación Virtual</CardTitle>
            <CardDescription className="mt-1">
              Fecha de emisión de hoja de reclamo: {fechaLarga(new Date())}
            </CardDescription>
          </div>
          <div className="shrink-0 rounded-lg border px-4 py-2 text-center">
            <p className="text-xs uppercase text-muted-foreground">N° de hoja</p>
            <p className="font-mono text-lg font-semibold">{numeroHoja}</p>
          </div>
        </div>
        <p className="text-center text-sm font-semibold tracking-wide">HOJA DE RECLAMACIÓN</p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-8">
            <Seccion numero={1} titulo="Identificación del consumidor reclamante">
              <div className="grid gap-4 sm:grid-cols-2">
                <CampoTexto control={control} name="nombres" label="Nombres:" autoComplete="given-name" />
                <CampoTexto control={control} name="apellidos" label="Apellidos:" autoComplete="family-name" />
                <CampoSelect
                  control={control}
                  name="tipo_documento"
                  label="Tipo de Documento:"
                  opciones={TIPOS_DOCUMENTO}
                />
                <CampoTexto control={control} name="numero_documento" label="N° Documento:" />
                <CampoTexto
                  control={control}
                  name="celular"
                  label="Celular:"
                  hint="Podremos comunicarnos"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                />
                <CampoTexto
                  control={control}
                  name="correo"
                  label="Correo:"
                  hint="Recibirás este documento"
                  type="email"
                  autoComplete="email"
                />
                <CampoSelect control={control} name="departamento" label="Departamento:" opciones={DEPARTAMENTOS} />
                <CampoTexto control={control} name="provincia" label="Provincia:" />
                <CampoTexto control={control} name="distrito" label="Distrito:" />
                <CampoTexto
                  control={control}
                  name="direccion"
                  label="Dirección:"
                  autoComplete="street-address"
                  placeholder="Av Psj Calle Jr, N° Mz Lt Int"
                />
                <CampoTexto
                  control={control}
                  name="referencia"
                  label="Referencia:"
                  placeholder="Plaza, Colegio, Paradero, etc"
                  className="sm:col-span-2"
                />

                <FormField
                  control={control}
                  name="menor_edad"
                  render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>
                        ¿Es menor de edad?
                        <Requerido />
                      </FormLabel>
                      <FormControl>
                        <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-6">
                          {(["no", "si"] as const).map((v) => (
                            <FormItem key={v} className="flex items-center gap-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={v} />
                              </FormControl>
                              <FormLabel className="font-normal">{v === "no" ? "No" : "Sí"}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {esMenor && (
                  <>
                    <CampoTexto
                      control={control}
                      name="apoderado_nombre"
                      label="Nombre del padre, madre o apoderado:"
                    />
                    <CampoTexto
                      control={control}
                      name="apoderado_documento"
                      label="N° Documento del apoderado:"
                    />
                  </>
                )}
              </div>
            </Seccion>

            <Separator />

            <Seccion numero={2} titulo="Identificación del Bien Contratado">
              <div className="grid gap-4 sm:grid-cols-2">
                <CampoSelect control={control} name="tipo_consumo" label="Tipo de consumo:" opciones={TIPOS_CONSUMO} />
                <CampoTexto
                  control={control}
                  name="numero_pedido"
                  label="N° de pedido:"
                  hint="Recibo, boleta, guía, etc"
                />
                <CampoTexto
                  control={control}
                  name="fecha_incidente"
                  label="Fecha del incidente:"
                  type="date"
                  max={hoy()}
                />
                <FormField
                  control={control}
                  name="monto"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Monto del producto o servicio contratado objeto del reclamo:
                        <Requerido />
                      </FormLabel>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          S/
                        </span>
                        <FormControl>
                          <Input inputMode="decimal" placeholder="0.00" className="pl-8" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CampoAreaTexto
                  control={control}
                  name="descripcion_bien"
                  label="Descripción:"
                  rows={3}
                  placeholder="Describa correcta y solamente de qué se trata el producto/servicio ..."
                  className="sm:col-span-2"
                />
              </div>
            </Seccion>

            <Separator />

            <Seccion numero={3} titulo="Detalle de la reclamación y pedido del consumidor">
              <FormField
                control={control}
                name="tipo_reclamo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Tipo de Reclamo:
                      <Requerido />
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                        className="grid gap-3 sm:grid-cols-2"
                      >
                        {TIPOS_RECLAMO_INFO.map((op) => (
                          <FormItem
                            key={op.valor}
                            className={cn(
                              "flex items-start gap-3 space-y-0 rounded-lg border p-3 transition-colors",
                              field.value === op.valor && "border-primary bg-primary/5",
                            )}
                          >
                            <FormControl>
                              <RadioGroupItem value={op.valor} className="mt-0.5" />
                            </FormControl>
                            <FormLabel className="cursor-pointer font-normal leading-snug">
                              <strong>{op.valor}:</strong> {op.texto}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CampoAreaTexto
                control={control}
                name="detalle"
                label="Detalle de la reclamación o queja:"
                rows={5}
                placeholder="Describa correctamente sólo su queja o reclamación, cómo recibió el producto/servicio o atención ..."
              />
              <CampoAreaTexto
                control={control}
                name="pedido"
                label="Pedido concreto del consumidor respecto al hecho que motiva el reclamo o queja:"
                rows={3}
                placeholder="Qué solicita con su queja/reclamo ..."
              />
            </Seccion>

            <Separator />

            <Seccion numero={4} titulo="Observaciones y acciones adoptadas por el proveedor">
              <Textarea
                disabled
                rows={3}
                aria-label="Observaciones y acciones adoptadas por el proveedor"
                placeholder="Describa la solución provista por el negocio/empresa ... (completado por el proveedor)"
              />
            </Seccion>

            <FormField
              control={control}
              name="conformidad"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-start gap-3">
                    <FormControl>
                      <Checkbox
                        checked={field.value === true}
                        onCheckedChange={(c) => field.onChange(c === true)}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        className="mt-0.5"
                      />
                    </FormControl>
                    <FormLabel className="font-normal leading-snug">
                      <span className="text-destructive">* </span>
                      Me encuentro conforme con los términos de mi reclamo o queja.
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ul className="flex flex-col gap-2 rounded-lg bg-muted/60 p-4 text-xs text-muted-foreground">
              <li>
                * En caso que el consumidor no consigne como mínimo su nombre, DNI, domicilio o correo electrónico y el
                detalle del reclamo o queja, de conformidad con el artículo 5 del Reglamento del Libro de
                Reclamaciones, estos se considerarán como no presentados.
              </li>
              <li>
                * La formulación del reclamo no excluye el recurso a otros medios de resolución de controversias ni es
                un requisito previo para presentar una denuncia ante el Indecopi.
              </li>
              <li>
                * El proveedor deberá dar respuesta al reclamo en un plazo no mayor a quince (15) días calendario,
                pudiendo extender el plazo hasta quince días.
              </li>
              <li>
                * Con la firma de este documento, el cliente autoriza a ser contactado después de la tramitación de la
                reclamación para evaluar la calidad y satisfacción del proceso de atención de reclamaciones.
              </li>
            </ul>

            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">
                Verificación de seguridad
                <Requerido />
              </p>
              {siteKey ? (
                <Turnstile
                  ref={captcha}
                  siteKey={siteKey}
                  onToken={(token) => {
                    setCaptchaToken(token);
                    if (token) setFaltaCaptcha(false);
                  }}
                />
              ) : (
                <p className="text-sm text-destructive">
                  La verificación de seguridad no está disponible. Inténtalo más tarde.
                </p>
              )}
              {faltaCaptcha && siteKey && (
                <p className="text-sm font-medium text-destructive">Completa la verificación de seguridad</p>
              )}
            </div>

            <Button type="submit" size="lg" disabled={formState.isSubmitting || !siteKey} className="self-end">
              {formState.isSubmitting && <Loader2 className="animate-spin" />}
              Enviar reclamo
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
