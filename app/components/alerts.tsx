"use client";

import { useState } from "react";

type AlertExecution = { id: number; pipeline: string; risk: string; result: string; time: string; score: number };
const alerts = [
  { id: 1082, title: "Riesgo alto de fallo en compilación", pipeline: "frontend / build", execution: 1048, risk: "alto", score: 78, time: "10:42", prediction: "Fallo probable", status: "Pendiente de verificación", result: "Pendiente" },
  { id: 1081, title: "Posible problema en pruebas de integración", pipeline: "api-gateway / tests", execution: 1044, risk: "alto", score: 85, time: "10:14", prediction: "Fallo probable", status: "Confirmada", result: "Falló" },
  { id: 1080, title: "Probabilidad elevada de fallo en despliegue", pipeline: "staging / deploy", execution: 1039, risk: "medio", score: 58, time: "09:52", prediction: "Requiere revisión", status: "Pendiente de verificación", result: "Pendiente" },
  { id: 1079, title: "Predicción por verificar", pipeline: "user-service / build", execution: 1034, risk: "medio", score: 43, time: "09:31", prediction: "Requiere revisión", status: "Falsa alarma", result: "Correcta" },
  { id: 1078, title: "Posible error en dependencias", pipeline: "payments / tests", execution: 1030, risk: "bajo", score: 18, time: "09:12", prediction: "Fallo poco probable", status: "Pendiente de verificación", result: "Pendiente" },
];

export default function Alerts({ onViewExecution }: { onViewExecution: (execution: AlertExecution) => void }) {
  const [selectedId, setSelectedId] = useState(alerts[0].id);
  const selected = alerts.find(alert => alert.id === selectedId)!;

  return <div className="alerts-view">
    <section className="card alert-summary" aria-label="Indicadores de alertas de demostración">
      {[["Alertas pendientes", "12", "amber"], ["Confirmadas", "38", "green"], ["Falsas alarmas", "6", "rose"]].map(([label, value, color]) => <article key={label}><span className={`alert-summary-icon ${color}`}><span /></span><div><h2>{label}</h2><strong>{value}</strong><p>Datos de demostración</p></div></article>)}
    </section>
    <div className="alerts-grid">
      <section className="card alert-inbox"><h2>Bandeja de alertas</h2><ul aria-label="Alertas recientes">{alerts.map(alert => <li key={alert.id}><button className={`alert-row ${selectedId === alert.id ? "is-selected" : ""}`} aria-pressed={selectedId === alert.id} aria-controls="alert-details" onClick={() => setSelectedId(alert.id)}><span className={`alert-symbol ${alert.risk}`} aria-hidden="true">!</span><span className="alert-row-content"><strong>{alert.title}</strong><small>{alert.pipeline} #{alert.execution}</small></span><span className={`risk-badge ${alert.risk}`}>{alert.risk === "alto" ? "Alto" : alert.risk === "medio" ? "Medio" : "Bajo"}</span><time>{alert.time}</time></button></li>)}</ul></section>
      <section className="card alert-details" id="alert-details" aria-label="Detalle de alerta">
        <h2>Detalle de alerta</h2>
        <div className="alert-details-content" aria-live="polite" aria-atomic="true">
          <span className={`risk-badge ${selected.risk}`}>{selected.risk === "alto" ? "ALTO RIESGO" : selected.risk === "medio" ? "RIESGO MEDIO" : "RIESGO BAJO"}</span>
          <h3>#ALT-{selected.id}</h3>
          <dl><div><dt>Pipeline</dt><dd>{selected.pipeline}</dd></div><div><dt>Predicción</dt><dd>{selected.prediction}</dd></div><div><dt>Confianza estimada</dt><dd>{selected.score}%</dd></div><div><dt>Estado</dt><dd>{selected.status}</dd></div><div><dt>Hora</dt><dd>{selected.time}</dd></div></dl>
        </div>
        <button className="primary-button" onClick={() => onViewExecution({ id: selected.execution, pipeline: selected.pipeline, risk: selected.risk, result: selected.result, time: selected.time, score: selected.score })}>Ver ejecución</button>
      </section>
    </div>
  </div>;
}
