"use client";

import { useState } from "react";
import Link from "next/link";

const sections = ["Resumen", "Predicciones", "Alertas", "Ejecuciones", "Evaluación"];
const runs = [
  { id: 1048, pipeline: "build / app-web", risk: "alto", result: "Falló", time: "10:42", score: 92 },
  { id: 1047, pipeline: "tests / backend", risk: "bajo", result: "Correcta", time: "10:35", score: 12 },
  { id: 1046, pipeline: "deploy / staging", risk: "medio", result: "Correcta", time: "10:22", score: 54 },
  { id: 1045, pipeline: "build / core-api", risk: "alto", result: "Falló", time: "10:18", score: 87 },
  { id: 1044, pipeline: "tests / app-web", risk: "bajo", result: "Correcta", time: "10:06", score: 18 },
  { id: 1043, pipeline: "deploy / backend", risk: "medio", result: "Correcta", time: "09:54", score: 48 },
];
const activity = [ [54, 12], [70, 18], [59, 11], [84, 20], [76, 16], [100, 22], [83, 15] ];

function Icon({ type = 0 }: { type?: number }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" />{type % 3 === 0 ? <path d="M8 15v-3m4 3V8m4 7v-5" /> : type % 3 === 1 ? <path d="m7 14 4-4 3 3 4-6" /> : <path d="M12 7v6m0 3v1" />}</svg>;
}

export default function Home() {
  const [section, setSection] = useState("Resumen");
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<(typeof runs)[number] | null>(null);
  const visibleRuns = runs.filter(run => (section !== "Alertas" || run.risk === "alto") && (filter === "Todos" || run.risk === filter));
  return (
    <div className="workspace">
      <aside className="sidebar">
        <Link className="brand" href="/" aria-label="Faultwise inicio"><span className="brand-symbol">◈</span> FAULTWISE</Link>
        <p className="brand-caption">PREDICTIVE CI/CD</p>
        <div className="nav-label">ESPACIO DE TRABAJO</div>
        <nav aria-label="Navegación principal">{sections.map((item, index) => <button key={item} className={`nav-item ${section === item ? "active" : ""}`} aria-current={section === item ? "page" : undefined} onClick={() => { setSection(item); setFilter("Todos"); }}><Icon type={index} />{item}{item === "Alertas" && <span className="nav-count">2</span>}</button>)}</nav>
        <div className="project-info"><span>TESIS 2027</span><p>Next.js · Spring Boot</p></div>
        <div className="profile"><span className="avatar">RM</span><div><strong>Administrador</strong><small>Entorno de diseño</small></div><span className="online-dot" /></div>
      </aside>
      <main>
        <header className="page-header"><div><div className="eyebrow">WORKSPACE / {section.toUpperCase()}</div><h1>{section === "Resumen" ? "Centro de monitoreo" : section}</h1><p>Visibilidad predictiva de los procesos automatizados de software</p></div><span className="demo-badge"><span /> DEMO · DATOS SIMULADOS</span></header>
        <section className="metrics" aria-label="Indicadores principales">{[
          ["Ejecuciones analizadas", "1,248", "Historial del entorno demo", "blue"],
          ["Detección · FDR", "88.4%", "Fallas correctamente identificadas", "green"],
          ["Falsas alarmas · FAR", "6.0%", "Alertas incorrectas / normales", "amber"],
          ["Tiempo de predicción", "2.4 s", "Latencia de inferencia · demo", "blue"],
        ].map(([label, value, caption, color], index) => <article className="metric card" key={label}><div className="metric-label"><span className={`icon-box ${color}`}><Icon type={index} /></span>{label}</div><strong className="metric-value">{value}</strong><p>{caption}</p></article>)}</section>
        {section === "Resumen" && <section className="chart-grid"><article className="card activity"><div className="card-heading"><div><h2>Actividad de ejecuciones</h2><p>Correctas vs. fallidas · últimos 7 días</p></div><div className="legend"><span><i className="purple-dot" />Exitosas</span><span><i className="red-dot" />Fallidas</span></div></div><div className="chart" role="img" aria-label="Ejecuciones exitosas y fallidas de lunes a domingo">{activity.map(([success, fail], index) => <div className="chart-column" key={index}><div className="bars"><div className="bar success" style={{ height: `${success}%` }} title={`${success} exitosas`} /><div className="bar failure" style={{ height: `${fail}%` }} title={`${fail} fallidas`} /></div><span>{["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][index]}</span></div>)}</div></article><article className="card risks"><h2>Distribución de riesgos</h2><p>Predicciones clasificadas por nivel</p>{[["Alto", 18, "red"], ["Medio", 36, "amber"], ["Bajo", 46, "green"]].map(([label, value, color]) => <div className="risk-row" key={label}><div><strong>{label}</strong><span>{value}%</span></div><div className="progress-track"><span className={String(color)} style={{ width: `${value}%` }} /></div></div>)}<span className="monitoring"><span />Monitorización activa</span></article></section>}
        {section === "Evaluación" ? <section className="card evaluation"><h2>Evaluación del modelo</h2><p>Resultados de referencia del entorno de demostración.</p><div className="evaluation-grid"><div><strong>88.4%</strong><span>Detección de fallas (FDR)</span></div><div><strong>6.0%</strong><span>Tasa de falsas alarmas (FAR)</span></div><div><strong>2.4 s</strong><span>Tiempo de inferencia</span></div></div><p>Las métricas son ilustrativas. La evaluación con datos reales se habilitará al conectar el servicio de predicción.</p></section> : <section className="card executions"><div className="card-heading"><div><h2>{section === "Resumen" ? "Últimas ejecuciones" : section === "Alertas" ? "Ejecuciones con riesgo alto" : section === "Predicciones" ? "Predicciones recientes" : "Historial de ejecuciones"}</h2><p>Vista previa de ejecuciones y predicciones recientes</p></div>{section === "Resumen" ? <button className="history-button" onClick={() => setSection("Ejecuciones")}>Ver historial <span>↗</span></button> : <select aria-label="Filtrar por riesgo" value={filter} onChange={event => setFilter(event.target.value)}><option>Todos</option><option value="alto">Riesgo alto</option><option value="medio">Riesgo medio</option><option value="bajo">Riesgo bajo</option></select>}</div><div className="table-scroll"><table><thead><tr><th>ID</th><th>Pipeline</th><th>Predicción</th><th>Resultado real</th><th>Hora</th><th><span className="sr-only">Detalles</span></th></tr></thead><tbody>{visibleRuns.slice(0, section === "Resumen" ? 4 : undefined).map(run => <tr key={run.id}><td><button className="run-link" onClick={() => setSelected(run)}>#RUN-{run.id}</button></td><td>{run.pipeline}</td><td><span className={`risk-badge ${run.risk}`}>Riesgo {run.risk}</span></td><td className={run.result === "Falló" ? "text-red" : "text-green"}>{run.result}</td><td className="muted">{run.time}</td><td><button className="detail-button" aria-label={`Ver ejecución ${run.id}`} onClick={() => setSelected(run)}>→</button></td></tr>)}</tbody></table></div>{visibleRuns.length === 0 && <p className="empty-state">No hay ejecuciones para este filtro.</p>}</section>}
        <footer>FAULTWISE <span>·</span> Inteligencia para cada ejecución <span className="footer-version">Prototipo de investigación · v0.1</span></footer>
      </main>
      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="card modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" onClick={event => event.stopPropagation()}><button autoFocus className="close-button" onClick={() => setSelected(null)} aria-label="Cerrar detalles">✕</button><div className="eyebrow">DETALLE DE EJECUCIÓN · DEMO</div><h2 id="detail-title">#RUN-{selected.id}</h2><p>{selected.pipeline}</p><dl><div><dt>Predicción</dt><dd className={`risk-badge ${selected.risk}`}>Riesgo {selected.risk}</dd></div><div><dt>Puntaje de riesgo simulado</dt><dd>{selected.score}%</dd></div><div><dt>Resultado real</dt><dd>{selected.result}</dd></div><div><dt>Hora</dt><dd>{selected.time}</dd></div></dl><button className="primary-button" onClick={() => setSelected(null)}>Volver al monitoreo</button></section></div>}
    </div>
  );
}

