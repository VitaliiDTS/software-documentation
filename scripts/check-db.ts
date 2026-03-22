import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database(join(process.cwd(), 'lab2.db'), { readonly: true });

const tables = ['test_cases', 'test_steps', 'test_runs', 'step_results'];

console.log('\n=== Row counts ===');
for (const table of tables) {
  const row = db.prepare(`SELECT COUNT(*) as count FROM ${table}`).get() as { count: number };
  console.log(`${table.padEnd(15)} ${row.count}`);
}

console.log('\n=== Sample test cases ===');
const cases = db.prepare('SELECT id, title FROM test_cases LIMIT 5').all();
cases.forEach((r: any) => console.log(`  ${r.id}  ${r.title}`));

console.log('\n=== Steps for TC001 ===');
const steps = db.prepare('SELECT stepNo, action, expected FROM test_steps WHERE testCaseId = ? ORDER BY stepNo').all('TC001');
steps.forEach((r: any) => console.log(`  step ${r.stepNo}: ${r.action} → ${r.expected}`));

console.log('\n=== Runs for TC001 ===');
const runs = db.prepare('SELECT id, executedAt, status FROM test_runs WHERE testCaseId = ? LIMIT 3').all('TC001');
runs.forEach((r: any) => console.log(`  ${r.id}  ${r.status}  ${r.executedAt}`));

console.log('\n=== Step results for first run ===');
const runId = (runs[0] as any)?.id;
if (runId) {
  const results = db.prepare('SELECT stepNo, actualResult, status FROM step_results WHERE testRunId = ?').all(runId);
  results.forEach((r: any) => console.log(`  step ${r.stepNo}: ${r.actualResult}  [${r.status}]`));
}

db.close();
