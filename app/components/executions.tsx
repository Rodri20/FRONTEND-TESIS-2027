"use client";
import { useExecutionDetails } from "./execution-details-provider";

import { useState, type FormEvent } from "react";

import { executions, demoDate } from "../lib/demo-data";
import { filterExecutions, formatExecutionDate } from "../lib/executions";
const initialFilters = { search: "", status: "Todos", period: "30" };

export default function Executions() {
  const onViewExecution = useExecutionDetails();
  const [draft, setDraft] = useState(initialFilters);
  const [filters, setFilters] = useState(initialFilters);
  const visible = filterExecutions(executions, filters, demoDate);
  function applyFilters(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFilters({ ...draft });
  }
  return (
    <div className="executions-view">
      <section className="card execution-filters">
        <h2>Buscar y filtrar</h2>
        <form onSubmit={applyFilters}>
          <label>
            Buscar pipeline
            <input
              type="search"
              placeholder="Nombre, ID o repositorio"
              value={draft.search}
              onChange={(event) =>
                setDraft({ ...draft, search: event.target.value })
              }
            />
          </label>
          <label>
            Estado
            <select
              value={draft.status}
              onChange={(event) =>
                setDraft({ ...draft, status: event.target.value })
              }
            >
              <option value="Todos">Todos los estados</option>
              <option value="Correcta">Correcta</option>
              <option value="Falló">Falló</option>
            </select>
          </label>
          <label>
            Período
            <select
              value={draft.period}
              onChange={(event) =>
                setDraft({ ...draft, period: event.target.value })
              }
            >
              <option value="30">Últimos 30 días</option>
              <option value="7">Últimos 7 días</option>
              <option value="1">Último día</option>
              <option value="all">Todo el historial</option>
            </select>
          </label>
          <button className="primary-button" type="submit">
            Aplicar filtros
          </button>
        </form>
      </section>
      <section className="card execution-history">
        <h2>Ejecuciones registradas</h2>
        <p>Resultados mostrados como demostración del diseño</p>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Ejecución</th>
                <th scope="col">Repositorio / flujo</th>
                <th scope="col">Predicción</th>
                <th scope="col">Resultado</th>
                <th scope="col">Duración</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((execution) => (
                <tr key={execution.id}>
                  <td>
                    <button
                      className="run-link"
                      aria-label={`Ver ejecución ${execution.id}`}
                      onClick={() => onViewExecution(execution)}
                    >
                      #{execution.id}
                    </button>
                  </td>
                  <td>{execution.pipeline}</td>
                  <td className="execution-risk">{execution.risk}</td>
                  <td>{execution.result}</td>
                  <td>{execution.duration}</td>
                  <td>
                    <time dateTime={execution.date}>
                      {formatExecutionDate(execution.date)}
                    </time>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {visible.length === 0 && (
          <div className="empty-state">
            <p>No se encontraron ejecuciones con estos filtros.</p>
            <button
              className="history-button"
              onClick={() => {
                setDraft(initialFilters);
                setFilters(initialFilters);
              }}
            >
              Limpiar filtros
            </button>
          </div>
        )}
        <p className="execution-count" role="status">
          Mostrando {visible.length}{" "}
          {visible.length === 1
            ? "ejecución simulada"
            : "ejecuciones simuladas"}
        </p>
        <p className="execution-period-note">
          Períodos relativos al 08 nov 2026, fecha de referencia de la
          demostración.
        </p>
      </section>
    </div>
  );
}
