'use strict';

const { JiraIssueReporterService } = require('./services/JiraIssueReporterService');

/**
 * Lab 4 — GoF Strategy Pattern
 *
 * Entry point. Creates the reporter service and runs the pipeline.
 * The output destination is controlled entirely by OUTPUT_TYPE in .env —
 * this file never needs to change when switching strategies.
 */
async function main() {
  const service = new JiraIssueReporterService();
  await service.run();
}

main().catch((err) => {
  console.error('\n[Fatal Error]', err.message);
  process.exit(1);
});
