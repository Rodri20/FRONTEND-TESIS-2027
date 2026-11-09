"use client";

import { useState, type FormEvent } from "react";

type Execution = { id: number; pipeline: string; risk: string; result: string; time: string; score: number; duration: string; date: string };
const executions: Execution[] = [
  { id: 1048, pipeline: "frontend / build", risk: "alto", result: "Falló", duration: "01:54", date: "2026-11-08", time: "10:42", score: 78 },
  { id: 1047, pipeline: "backend / tests", risk: "bajo", result: "Correcta", duration: "04:22", date: "2026-11-08", time: "10:35", score: 8 },
  { id: 1046, pipeline: "app / deploy", risk: "medio", result: "Correcta", duration: "02:18", date: "2026-11-08", time: "10:22", score: 43 },
  { id: 1045, pipeline: "core / build", risk: "alto", result: "Falló", duration: "03:41", date: "2026-11-08", time: "10:18", score: 87 },
  { id: 1044, pipeline: "gateway / tests", risk: "alto", result: "Falló", duration: "05:12", date: "2026-11-08", time: "10:14", score: 85 },
  { id: 1043, pipeline: "auth / build", risk: "bajo", result: "Correcta", duration: "01:21", date: "2026-11-07", time: "16:45", score: 12 },
  { id: 1042, pipeline: "payments / tests", risk: "medio", result: "Falló", duration: "04:16", date: "2026-11-07", time: "15:20", score: 58 },
  { id: 1041, pipeline: "web / deploy", risk: "bajo", result: "Correcta", duration: "02:02", date: "2026-11-07", time: "14:12", score: 18 },
  { id: 1040, pipeline: "core / tests", risk: "bajo", result: "Correcta", duration: "03:43", date: "2026-11-07", time: "11:08", score: 9 },
];
const initialFilters = { search: "", status: "Todos", period: "30" };
// Anchor the demo period to its newest record so sample data remains explorable.
const demoDate = Date.parse("2026-11-08T00:00:00Z");

export default function Executions({ onViewExecution }: { onViewExecution: (execution: Execution) => void }) {
  const [draft, setDraft] = useState(initialFilters);
  const [filters, setFilters] = useState(initialFilters);
  const visible = executions.filter(execution => {
    const query = filters.search.trim().toLocaleLowerCase("es").replace(/^#(?:run-)?/i, "");
    const age = (demoDate - Date.parse(`${execution.date}T00:00:00Z`)) / 86400000;
    return (`${execution.id} ${execution.pipeline}`.toLocaleLowerCase("es").includes(query)) && (filters.status === "Todos" || execution.result === filters.status) && (filters.period === "all" || (age >= 0 && age < Number(filters.period)));
  });
  function applyFilters(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setFilters({ ...draft }); }
  return <div className="executions-view">
    <section className="card execution-filters"><h2>Buscar y filtrar</h2><form onSubmit={applyFilters}>
      <label>Buscar pipeline<input type="search" placeholder="Nombre, ID o repositorio" value={draft.search} onChange={event => setDraft({ ...draft, search: event.target.value })} /></label>
      <label>Estado<select value={draft.status} onChange={event => setDraft({ ...draft, status: event.target.value })}><option value="Todos">Todos los estados</option><option value="Correcta">Correcta</option><option value="Falló">Falló</option></select></label>
      <label>Período<select value={draft.period} onChange={event => setDraft({ ...draft, period: event.target.value })}><option value="30">Últimos 30 días</option><option value="7">Últimos 7 días</option><option value="1">Último día</option><option value="all">Todo el historial</option></select></label>
      <button className="primary-button" type="submit">Aplicar filtros</button>
    </form></section>
    <section className="card execution-history"><h2>Ejecuciones registradas</h2><p>Resultados mostrados como demostración del diseño</p><div className="table-scroll"><table><thead><tr><th scope="col">Ejecución</th><th scope="col">Repositorio / flujo</th><th scope="col">Predicción</th><th scope="col">Resultado</th><th scope="col">Duración</th><th scope="col">Fecha</th></tr></thead><tbody>{visible.map(execution => <tr key={execution.id}><td><button className="run-link" aria-label={`Ver ejecución ${execution.id}`} onClick={() => onViewExecution(execution)}>#{execution.id}</button></td><td>{execution.pipeline}</td><td className="execution-risk">{execution.risk}</td><td>{execution.result}</td><td>{execution.duration}</td><td><time dateTime={execution.date}>{execution.date.endsWith("08") ? "08 nov" : "07 nov"}</time></td></tr>)}</tbody></table></div>
      {visible.length === 0 && <div className="empty-state"><p>No se encontraron ejecuciones con estos filtros.</p><button className="history-button" onClick={() => { setDraft(initialFilters); setFilters(initialFilters); }}>Limpiar filtros</button></div>}
      <p className="execution-count" role="status">Mostrando {visible.length} {visible.length === 1 ? "ejecución simulada" : "ejecuciones simuladas"}</p><p className="execution-period-note">Períodos relativos al 08 nov 2026, fecha de referencia de la demostración.</p>
    </section>
  </div>;
}
