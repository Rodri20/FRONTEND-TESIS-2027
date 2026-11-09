"use client";
import { useExecutionDetails } from "./execution-details-provider";

import { useState } from "react";

import { alerts, executions } from "../lib/demo-data";

export default function Alerts() {
  const onViewExecution = useExecutionDetails();
  const [selectedId, setSelectedId] = useState(alerts[0].id);
  const selected = alerts.find((alert) => alert.id === selectedId) ?? alerts[0];

  return (
    <div className="alerts-view">
      <section
        className="card alert-summary"
        aria-label="Indicadores de alertas de demostración"
      >
        {[
          ["Alertas pendientes", "12", "amber"],
          ["Confirmadas", "38", "green"],
          ["Falsas alarmas", "6", "rose"],
        ].map(([label, value, color]) => (
          <article key={label}>
            <span className={`alert-summary-icon ${color}`}>
              <span />
            </span>
            <div>
              <h2>{label}</h2>
              <strong>{value}</strong>
              <p>Datos de demostración</p>
            </div>
          </article>
        ))}
      </section>
      <div className="alerts-grid">
        <section className="card alert-inbox">
          <h2>Bandeja de alertas</h2>
          <ul aria-label="Alertas recientes">
            {alerts.map((alert) => (
              <li key={alert.id}>
                <button
                  className={`alert-row ${selectedId === alert.id ? "is-selected" : ""}`}
                  aria-pressed={selectedId === alert.id}
                  aria-controls="alert-details"
                  onClick={() => setSelectedId(alert.id)}
                >
                  <span
                    className={`alert-symbol ${alert.risk}`}
                    aria-hidden="true"
                  >
                    !
                  </span>
                  <span className="alert-row-content">
                    <strong>{alert.title}</strong>
                    <small>
                      {alert.pipeline} #{alert.execution}
                    </small>
                  </span>
                  <span className={`risk-badge ${alert.risk}`}>
                    {alert.risk === "alto"
                      ? "Alto"
                      : alert.risk === "medio"
                        ? "Medio"
                        : "Bajo"}
                  </span>
                  <time>{alert.time}</time>
                </button>
              </li>
            ))}
          </ul>
        </section>
        <section
          className="card alert-details"
          id="alert-details"
          aria-label="Detalle de alerta"
        >
          <h2>Detalle de alerta</h2>
          <div
            className="alert-details-content"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className={`risk-badge ${selected.risk}`}>
              {selected.risk === "alto"
                ? "ALTO RIESGO"
                : selected.risk === "medio"
                  ? "RIESGO MEDIO"
                  : "RIESGO BAJO"}
            </span>
            <h3>#ALT-{selected.id}</h3>
            <dl>
              <div>
                <dt>Pipeline</dt>
                <dd>{selected.pipeline}</dd>
              </div>
              <div>
                <dt>Predicción</dt>
                <dd>{selected.prediction}</dd>
              </div>
              <div>
                <dt>Confianza estimada</dt>
                <dd>{selected.score}%</dd>
              </div>
              <div>
                <dt>Estado</dt>
                <dd>{selected.status}</dd>
              </div>
              <div>
                <dt>Hora</dt>
                <dd>{selected.time}</dd>
              </div>
            </dl>
          </div>
          <button
            className="primary-button"
            onClick={() =>
              onViewExecution(
                executions.find(
                  (execution) => execution.id === selected.execution,
                ) ?? {
                  id: selected.execution,
                  pipeline: selected.pipeline,
                  risk: selected.risk,
                  result: selected.result,
                  time: selected.time,
                  score: selected.score,
                },
              )
            }
          >
            Ver ejecución
          </button>
        </section>
      </div>
    </div>
  );
}
