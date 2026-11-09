const indicators = [
  { code: "FDR", label: "Detección", value: "88.4%", note: "Mayor es mejor", color: "green", before: 64, after: 88.4, max: 100, beforeLabel: "64%", afterLabel: "88.4%" },
  { code: "FAR", label: "Falsas alarmas", value: "6.0%", note: "Menor es mejor", color: "rose", before: 14, after: 6, max: 100, beforeLabel: "14%", afterLabel: "6%" },
  { code: "TD", label: "Tiempo de detección", value: "2.4 s", note: "Definición operativa pendiente", color: "blue", before: 7.8, after: 2.4, max: 10, beforeLabel: "7.8 s", afterLabel: "2.4 s" },
];
const matrix = [
  { code: "VP", label: "Verdaderos positivos", value: 88, color: "green" },
  { code: "FP", label: "Falsos positivos", value: 6, color: "rose" },
  { code: "FN", label: "Falsos negativos", value: 12, color: "amber" },
  { code: "VN", label: "Verdaderos negativos", value: 94, color: "blue" },
];

export default function Evaluation() {
  return <div className="evaluation-view">
    <section className="evaluation-metrics" aria-label="Indicadores de evaluación simulados">{indicators.map(indicator => <article className="card evaluation-metric" key={indicator.code}><h2><span className={`evaluation-icon ${indicator.color}`}><span /></span>{indicator.code} · {indicator.label}</h2><strong>{indicator.value}</strong><p>{indicator.note}</p></article>)}</section>
    <div className="evaluation-panels">
      <section className="card performance-panel"><h2>Comparación del desempeño</h2><p>Valores ilustrativos: no son resultados experimentales</p><div className="performance-chart">{indicators.map(indicator => <div className="performance-row" key={indicator.code} role="img" aria-label={`${indicator.code}: referencia ${indicator.beforeLabel}, propuesta ${indicator.afterLabel}. Escala de 0 a ${indicator.max}${indicator.code === "TD" ? " segundos" : " por ciento"}.`}><strong>{indicator.code}</strong><div className="performance-bars"><div><span className="reference-bar" style={{ width: `${indicator.before / indicator.max * 100}%` }} /></div><div><span className="proposal-bar" style={{ width: `${indicator.after / indicator.max * 100}%` }} /></div></div><div className="performance-values"><span>{indicator.beforeLabel}</span><strong>{indicator.afterLabel}</strong></div></div>)}</div><div className="performance-legend"><span><i className="reference-bar" />Referencia</span><span><i className="proposal-bar" />Propuesta simulada</span></div></section>
      <section className="card confusion-panel"><h2>Matriz de confusión</h2><p>Ejemplo de clasificación binaria</p><dl className="confusion-grid">{matrix.map(cell => <div className={cell.color} key={cell.code}><dt><abbr title={cell.label}>{cell.code}</abbr><span className="sr-only">: {cell.label}</span></dt><dd>{cell.value}</dd></div>)}</dl><p className="matrix-note">Ejemplo independiente: esta matriz produce FDR = 88% y FAR = 6%.</p></section>
    </div>
    <section className="card methodology-panel"><h2>Interpretación metodológica</h2><div className="metric-formulas"><p>FDR = VP / (VP + FN) × 100</p><p>FAR = FP / (FP + VN) × 100</p></div><div className="methodology-notes"><p>El indicador TD necesita una definición operacional consistente entre pretest y postest. En esta maqueta se muestra latencia de inferencia como ejemplo. La comparación debe utilizar las mismas condiciones y un conjunto de datos con resultados reales.</p><p>Los indicadores y la comparación son ilustrativos. La matriz es un ejemplo independiente y no corresponde al FDR de 88.4% mostrado en las tarjetas.</p></div></section>
  </div>;
}
