"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

/** Widget de Cloudflare Turnstile (captcha del Libro de Reclamaciones). */

type OpcionesTurnstile = {
  sitekey: string;
  language?: string;
  theme?: "auto" | "light" | "dark";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
};

type ApiTurnstile = {
  render: (contenedor: HTMLElement, opciones: OpcionesTurnstile) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: ApiTurnstile;
  }
}

const URL_SCRIPT = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let cargaScript: Promise<ApiTurnstile> | null = null;

/** Carga el script una sola vez, aunque el widget se monte varias veces. */
function cargarTurnstile(): Promise<ApiTurnstile> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  cargaScript ??= new Promise<ApiTurnstile>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = URL_SCRIPT;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile no cargó")));
    script.onerror = () => {
      cargaScript = null;
      reject(new Error("No se pudo cargar Turnstile"));
    };
    document.head.appendChild(script);
  });
  return cargaScript;
}

export type TurnstileHandle = {
  /** Pide un token nuevo (cada token sirve para un solo envío). */
  reset: () => void;
};

type Props = {
  siteKey: string;
  /** Token listo, o null si venció o hubo un error. */
  onToken: (token: string | null) => void;
};

export const Turnstile = forwardRef<TurnstileHandle, Props>(function Turnstile({ siteKey, onToken }, ref) {
  const contenedor = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  onTokenRef.current = onToken;

  useImperativeHandle(ref, () => ({
    reset: () => {
      onTokenRef.current(null);
      if (widgetId.current) window.turnstile?.reset(widgetId.current);
    },
  }));

  useEffect(() => {
    let cancelado = false;
    cargarTurnstile()
      .then((api) => {
        if (cancelado || !contenedor.current) return;
        widgetId.current = api.render(contenedor.current, {
          sitekey: siteKey,
          language: "es",
          theme: "light",
          callback: (token) => onTokenRef.current(token),
          "expired-callback": () => onTokenRef.current(null),
          "error-callback": () => onTokenRef.current(null),
        });
      })
      .catch(() => onTokenRef.current(null));

    return () => {
      cancelado = true;
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [siteKey]);

  return <div ref={contenedor} className="min-h-[65px]" />;
});
