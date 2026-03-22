/**
 * CSV Generator Script
 * Usage: npm run generate-csv [output-path]
 * Default output: data/test-data.csv
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

const STATUSES = ['Pass', 'Fail', 'Blocked', 'Skipped'] as const;
type Status = (typeof STATUSES)[number];

const ACTIONS = [
  'Open browser',
  'Navigate to URL',
  'Enter username',
  'Enter password',
  'Click login button',
  'Verify page title',
  'Click submit',
  'Fill form field',
  'Select dropdown option',
  'Upload file',
  'Check checkbox',
  'Scroll to element',
  'Hover over element',
  'Wait for loader',
  'Close modal',
  'Refresh page',
  'Go back',
  'Click link',
  'Expand accordion',
  'Accept alert',
];

const EXPECTED = [
  'Page is displayed',
  'Form is submitted',
  'Error message shown',
  'Success message shown',
  'User is redirected',
  'Element is visible',
  'Element is hidden',
  'Data is saved',
  'File is uploaded',
  'Validation passes',
  'Dropdown is open',
  'Modal is closed',
  'Loader disappears',
  'Alert is dismissed',
  'Checkbox is checked',
];

const ACTUAL = [
  'Page loaded successfully',
  'Form submitted',
  'Error displayed',
  'Success toast appeared',
  'Redirected to dashboard',
  'Element appeared',
  'Element not found',
  'Record saved to DB',
  'Upload completed',
  'Validation passed',
  'Dropdown opened',
  'Modal closed',
  'Loader gone',
  'Alert accepted',
  'Checkbox checked',
];

const TEST_CASE_TITLES = [
  'Login test',
  'Registration flow',
  'Password reset',
  'Profile update',
  'Logout test',
  'Search functionality',
  'Filter by category',
  'Sort results',
  'Pagination check',
  'File upload',
  'Email notification',
  'User permissions',
  'Admin panel access',
  'Data export',
  'Dashboard widgets',
  'API integration',
  'Form validation',
  'Session timeout',
  'Multi-browser check',
  'Mobile responsiveness',
];

function rand<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pad(n: number, len = 3): string {
  return String(n).padStart(len, '0');
}

function randomDate(): string {
  const start = new Date('2025-01-01T00:00:00');
  const end = new Date('2026-03-22T23:59:59');
  const ms = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(ms).toISOString();
}

function escapeCsv(val: string): string {
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

function main() {
  const NUM_TEST_CASES = 50;
  const NUM_STEPS_PER_CASE = 5;
  const NUM_RUNS_PER_CASE = 5;

  const outputPath = process.argv[2] || join(process.cwd(), 'data', 'test-data.csv');
  mkdirSync(dirname(outputPath), { recursive: true });

  const header = [
    'testCaseId',
    'testCaseTitle',
    'stepNo',
    'action',
    'expected',
    'testRunId',
    'executedAt',
    'runStatus',
    'actualResult',
    'stepStatus',
  ].join(',');

  const lines: string[] = [header];

  for (let tc = 1; tc <= NUM_TEST_CASES; tc++) {
    const testCaseId = `TC${pad(tc)}`;
    const testCaseTitle = TEST_CASE_TITLES[(tc - 1) % TEST_CASE_TITLES.length];

    for (let run = 1; run <= NUM_RUNS_PER_CASE; run++) {
      const testRunId = `TR${pad(tc)}_${pad(run)}`;
      const executedAt = randomDate();
      const runStatus: Status = rand(STATUSES);

      for (let step = 1; step <= NUM_STEPS_PER_CASE; step++) {
        const action = rand(ACTIONS);
        const expected = rand(EXPECTED);
        const actualResult = rand(ACTUAL);
        const stepStatus: Status = rand(STATUSES);

        const row = [
          testCaseId,
          escapeCsv(testCaseTitle),
          String(step),
          escapeCsv(action),
          escapeCsv(expected),
          testRunId,
          executedAt,
          runStatus,
          escapeCsv(actualResult),
          stepStatus,
        ].join(',');

        lines.push(row);
      }
    }
  }

  const totalRows = lines.length - 1; // minus header
  writeFileSync(outputPath, lines.join('\n'), 'utf-8');
  console.log(`Generated ${totalRows} rows -> ${outputPath}`);

  if (totalRows < 1000) {
    console.warn(`WARNING: only ${totalRows} rows generated (required >= 1000)`);
  }
}

main();
