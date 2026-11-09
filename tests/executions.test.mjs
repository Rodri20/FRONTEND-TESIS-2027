import { test } from "node:test";
import assert from "node:assert/strict";
import { filterExecutions, formatExecutionDate } from "../app/lib/executions.ts";
import { executions, demoDate } from "../app/lib/demo-data.ts";

const filters = { search: "", status: "Todos", period: "30" };
test("normalizes an execution ID copied from the detail dialog", () => {
  assert.deepEqual(filterExecutions(executions, { ...filters, search: " #RUN-1048 " }, demoDate).map(record => record.id), [1048]);
});
test("combines repository, result and period filters", () => {
  assert.deepEqual(filterExecutions(executions, { search: "CORE", status: "Falló", period: "1" }, demoDate).map(record => record.id), [1045]);
});
test("excludes yesterday and future records from the last day", () => {
  const records = [...executions, { ...executions[0], id: 2000, date: "2026-11-09" }];
  const result = filterExecutions(records, { ...filters, period: "1" }, demoDate);
  assert.equal(result.length, 5);
  assert.ok(result.every(record => record.date === demoDate));
});
test("returns no matches for an unknown pipeline", () => {
  assert.equal(filterExecutions(executions, { ...filters, search: "missing-pipeline" }, demoDate).length, 0);
});
test("all-time filtering includes older records", () => {
  const records = [{ ...executions[0], date: "2025-01-01" }];
  assert.equal(filterExecutions(records, filters, demoDate).length, 0);
  assert.equal(filterExecutions(records, { ...filters, period: "all" }, demoDate).length, 1);
});
test("formats dates in UTC without depending on the local timezone", () => {
  assert.match(formatExecutionDate("2026-01-01"), /01.*ene/);
});
