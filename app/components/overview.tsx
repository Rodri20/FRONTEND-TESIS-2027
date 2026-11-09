"use client";
import Link from "next/link";
import Icon from "./dashboard-icon";
import { executions } from "../lib/demo-data";
import { useExecutionDetails } from "./execution-details-provider";
const activity = [
  [54, 12],
  [70, 18],
  [59, 11],
  [84, 20],
  [76, 16],
  [100, 22],
  [83, 15],
];

export default function Overview() {
  const setSelected = useExecutionDetails();
  return (
    <>
      {" "}
      {
        <section className="metrics" aria-label="Indicadores principales">
          {[
            [
              "Ejecuciones analizadas",
              "1,248",
              "Historial del entorno demo",
              "blue",
            ],
            [
              "Detección · FDR",
              "88.4%",
              "Fallas correctamente identificadas",
              "green",
            ],
            [
              "Falsas alarmas · FAR",
              "6.0%",
              "Alertas incorrectas / normales",
              "amber",
            ],
            [
              "Tiempo de predicción",
              "2.4 s",
              "Latencia de inferencia · demo",
              "blue",
            ],
          ].map(([label, value, caption, color], index) => (
            <article className="metric card" key={label}>
              <div className="metric-label">
                <span className={`icon-box ${color}`}>
                  <Icon type={index} />
                </span>
                {label}
              </div>
              <strong className="metric-value">{value}</strong>
              <p>{caption}</p>
            </article>
          ))}
        </section>
      }
      {
        <section className="chart-grid">
          <article className="card activity">
            <div className="card-heading">
              <div>
                <h2>Actividad de ejecuciones</h2>
                <p>Correctas vs. fallidas · últimos 7 días</p>
              </div>
              <div className="legend">
                <span>
                  <i className="purple-dot" />
                  Exitosas
                </span>
                <span>
                  <i className="red-dot" />
                  Fallidas
                </span>
              </div>
            </div>
            <div
              className="chart"
              role="img"
              aria-label="Ejecuciones exitosas y fallidas de lunes a domingo"
            >
              {activity.map(([success, fail], index) => (
                <div className="chart-column" key={index}>
                  <div className="bars">
                    <div
                      className="bar success"
                      style={{ height: `${success}%` }}
                      title={`${success} exitosas`}
                    />
                    <div
                      className="bar failure"
                      style={{ height: `${fail}%` }}
                      title={`${fail} fallidas`}
                    />
                  </div>
                  <span>
                    {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][index]}
                  </span>
                </div>
              ))}
            </div>
          </article>
          <article className="card risks">
            <h2>Distribución de riesgos</h2>
            <p>Predicciones clasificadas por nivel</p>
            {[
              ["Alto", 18, "red"],
              ["Medio", 36, "amber"],
              ["Bajo", 46, "green"],
            ].map(([label, value, color]) => (
              <div className="risk-row" key={label}>
                <div>
                  <strong>{label}</strong>
                  <span>{value}%</span>
                </div>
                <div className="progress-track">
                  <span
                    className={String(color)}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
            <span className="monitoring">
              <span />
              Monitorización activa
            </span>
          </article>
        </section>
      }
      <section className="card executions">
        <div className="card-heading">
          <div>
            <h2>Últimas ejecuciones</h2>
            <p>Vista previa de ejecuciones y predicciones recientes</p>
          </div>
          <Link className="history-button" href="/ejecuciones">
            Ver historial <span>↗</span>
          </Link>
        </div>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Pipeline</th>
                <th>Predicción</th>
                <th>Resultado real</th>
                <th>Hora</th>
                <th>
                  <span className="sr-only">Detalles</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {executions.slice(0, 4).map((run) => (
                <tr key={run.id}>
                  <td>
                    <button
                      className="run-link"
                      onClick={() => setSelected(run)}
                    >
                      #RUN-{run.id}
                    </button>
                  </td>
                  <td>{run.pipeline}</td>
                  <td>
                    <span className={`risk-badge ${run.risk}`}>
                      Riesgo {run.risk}
                    </span>
                  </td>
                  <td
                    className={
                      run.result === "Falló" ? "text-red" : "text-green"
                    }
                  >
                    {run.result}
                  </td>
                  <td className="muted">{run.time}</td>
                  <td>
                    <button
                      className="detail-button"
                      aria-label={`Ver ejecución ${run.id}`}
                      onClick={() => setSelected(run)}
                    >
                      →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
