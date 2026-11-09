"use client";

import { useState, type FormEvent } from "react";

type Prediction = {
  id: number;
  pipeline: string;
  probability: number;
  result: string;
};
const initialPredictions: Prediction[] = [
  {
    id: 284,
    pipeline: "build / plataforma-web",
    probability: 78,
    result: "Pendiente",
  },
  {
    id: 283,
    pipeline: "tests / user-service",
    probability: 8,
    result: "Correcta",
  },
  {
    id: 282,
    pipeline: "deploy / staging",
    probability: 43,
    result: "Correcta",
  },
];
const riskFor = (probability: number) =>
  probability >= 70 ? "alto" : probability >= 30 ? "medio" : "bajo";

export default function Predictions() {
  const [repository, setRepository] = useState("frontend / plataforma-web");
  const [workflow, setWorkflow] = useState("build-and-test.yml");
  const [branch, setBranch] = useState("main");
  const [process, setProcess] = useState("Compilación y pruebas");
  const [changes, setChanges] = useState(14);
  const [files, setFiles] = useState(6);
  const [timeout, setTimeoutMinutes] = useState(12);
  const [predictions, setPredictions] = useState(initialPredictions);
  const [result, setResult] = useState(initialPredictions[0]);
  const risk = riskFor(result.probability);

  function generatePrediction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Deterministic demo heuristic. Replace with the prediction API when available.
    const probability = Math.min(
      98,
      Math.max(
        2,
        Math.round(
          changes * 2 +
            files * 3 +
            32 -
            timeout +
            (process === "Despliegue" ? 10 : process === "Pruebas" ? -12 : 12),
        ),
      ),
    );
    const prediction = {
      id: predictions[0].id + 1,
      pipeline: `${process === "Despliegue" ? "deploy" : process === "Pruebas" ? "tests" : "build"} / ${repository.trim().split("/").pop()?.trim()}`,
      probability,
      result: "Pendiente",
    };
    setResult(prediction);
    setPredictions([prediction, ...predictions]);
  }

  return (
    <div className="predictions-view">
      <div className="prediction-grid">
        <section className="card prediction-form-card">
          <h2>Nueva predicción</h2>
          <p>Datos disponibles antes de iniciar el proceso</p>
          <form onSubmit={generatePrediction}>
            <div className="prediction-fields">
              <label>
                Repositorio
                <input
                  required
                  maxLength={120}
                  value={repository}
                  onChange={(event) => setRepository(event.target.value)}
                  pattern=".*\S.*"
                />
              </label>
              <label>
                Flujo CI/CD
                <input
                  required
                  maxLength={120}
                  value={workflow}
                  onChange={(event) => setWorkflow(event.target.value)}
                  pattern=".*\S.*"
                />
              </label>
              <label>
                Rama
                <input
                  required
                  maxLength={80}
                  value={branch}
                  onChange={(event) => setBranch(event.target.value)}
                  pattern=".*\S.*"
                />
              </label>
              <label>
                Tipo de proceso
                <select
                  value={process}
                  onChange={(event) => setProcess(event.target.value)}
                >
                  <option>Compilación y pruebas</option>
                  <option>Pruebas</option>
                  <option>Despliegue</option>
                </select>
              </label>
            </div>
            <fieldset className="technical-fields">
              <legend>Características técnicas</legend>
              <div>
                <label>
                  Cambios
                  <input
                    type="number"
                    min="0"
                    max="10000"
                    required
                    value={changes}
                    onChange={(event) => setChanges(event.target.valueAsNumber)}
                  />
                </label>
                <label>
                  Archivos
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    required
                    value={files}
                    onChange={(event) => setFiles(event.target.valueAsNumber)}
                  />
                </label>
                <label>
                  Tiempo límite (min)
                  <input
                    type="number"
                    min="1"
                    max="1440"
                    required
                    value={timeout}
                    onChange={(event) =>
                      setTimeoutMinutes(event.target.valueAsNumber)
                    }
                  />
                </label>
              </div>
            </fieldset>
            <p className="prediction-help">
              Solo se emplean variables conocidas antes de la ejecución.
            </p>
            <div className="prediction-actions">
              <button className="primary-button" type="submit">
                Generar predicción
              </button>
            </div>
          </form>
        </section>
        <section
          className="card prediction-result"
          aria-live="polite"
          aria-atomic="true"
        >
          <h2>Resultado estimado</h2>
          <span className={`risk-badge ${risk}`}>
            RIESGO {risk.toUpperCase()}
          </span>
          <strong className="prediction-probability">
            {result.probability}%
          </strong>
          <p>Probabilidad estimada de fallo</p>
          <div
            className={`prediction-meter ${risk}`}
            role="progressbar"
            aria-label="Probabilidad estimada de fallo"
            aria-valuenow={result.probability}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${result.probability}%` }} />
          </div>
          <h3>
            {risk === "alto"
              ? "Advertencia predictiva"
              : risk === "medio"
                ? "Revisión recomendada"
                : "Riesgo reducido"}
          </h3>
          <p>
            {risk === "alto"
              ? "El pipeline podría fallar. Revisa los cambios recientes y las dependencias antes de ejecutarlo."
              : risk === "medio"
                ? "Revisa los archivos modificados y la configuración antes de iniciar el proceso."
                : "La simulación indica un riesgo reducido. Mantén las validaciones habituales antes de ejecutar."}
          </p>
          <div className="simulation-notice">
            Predicción simulada · Sin conexión a un modelo real
          </div>
        </section>
      </div>
      <section className="card prediction-history">
        <h2>Predicciones anteriores</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Pipeline</th>
                <th>Riesgo</th>
                <th>Probabilidad</th>
                <th>Resultado real</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((prediction) => (
                <tr key={prediction.id}>
                  <td>
                    <strong>#P-{prediction.id}</strong>
                  </td>
                  <td>{prediction.pipeline}</td>
                  <td className="prediction-risk">
                    {riskFor(prediction.probability)}
                  </td>
                  <td>{prediction.probability}%</td>
                  <td>{prediction.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="prediction-session-note">
          Historial de demostración. Las nuevas predicciones se conservan
          durante esta sesión de la vista.
        </p>
      </section>
    </div>
  );
}
