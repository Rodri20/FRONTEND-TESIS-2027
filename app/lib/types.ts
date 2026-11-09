export type Risk = "alto" | "medio" | "bajo";
export type ExecutionResult = "Correcta" | "Falló" | "Pendiente";
export interface Execution {
  id: number;
  pipeline: string;
  risk: Risk;
  result: ExecutionResult;
  time: string;
  score: number;
  duration?: string;
  date?: string;
}
export interface ExecutionRecord extends Execution {
  duration: string;
  date: string;
}
export interface Alert {
  id: number;
  title: string;
  pipeline: string;
  execution: number;
  risk: Risk;
  score: number;
  time: string;
  prediction: string;
  status: string;
  result: ExecutionResult;
}
