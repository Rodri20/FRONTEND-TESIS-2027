"use client";

import { useEffect, useRef } from "react";
import type { Execution } from "../lib/types";

export default function ExecutionDialog({
  execution,
  onClose,
}: {
  execution: Execution;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="card execution-dialog"
      aria-labelledby="detail-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative p-7">
        <button
          autoFocus
          className="close-button"
          onClick={onClose}
          aria-label="Cerrar detalles"
        >
          ✕
        </button>
        <div className="eyebrow">DETALLE DE EJECUCIÓN · DEMO</div>
        <h2 id="detail-title" className="mt-4 mb-2 text-2xl">
          #RUN-{execution.id}
        </h2>
        <p>{execution.pipeline}</p>
        <dl className="execution-dialog-details">
          <div>
            <dt>Predicción</dt>
            <dd className={`risk-badge ${execution.risk}`}>
              Riesgo {execution.risk}
            </dd>
          </div>
          <div>
            <dt>Puntaje de riesgo simulado</dt>
            <dd>{execution.score}%</dd>
          </div>
          <div>
            <dt>Resultado real</dt>
            <dd>{execution.result}</dd>
          </div>
          <div>
            <dt>Hora</dt>
            <dd>{execution.time}</dd>
          </div>
          {execution.duration && (
            <div>
              <dt>Duración</dt>
              <dd>{execution.duration}</dd>
            </div>
          )}
        </dl>
        <button className="primary-button" onClick={onClose}>
          Cerrar detalle
        </button>
      </div>
    </dialog>
  );
}
