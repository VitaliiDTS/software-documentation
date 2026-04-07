'use strict';

const { OutputStrategy } = require('./OutputStrategy');

/**
 * Concrete Strategy: outputs Jira issues to the standard console (stdout).
 *
 * Each issue is printed in a structured, human-readable format.
 * Priority labels are colour-coded using ANSI escape codes for clarity.
 *
 * @extends OutputStrategy
 */
class ConsoleOutputStrategy extends OutputStrategy {
  /** @private */
  static PRIORITY_COLORS = {
    High:   '\x1b[31m', // red
    Medium: '\x1b[33m', // yellow
    Low:    '\x1b[32m', // green
  };
  static RESET = '\x1b[0m';
  static BOLD  = '\x1b[1m';
  static DIM   = '\x1b[2m';

  /**
   * Prints all issues to the console in a formatted report.
   *
   * @param {Array<Object>} issues
   * @returns {Promise<void>}
   */
  async output(issues) {
    const ts = new Date().toISOString();

    console.log(
      `\n${ConsoleOutputStrategy.BOLD}════════════════════════════════════════════════════`
    );
    console.log(`  Jira Issues Report — ${ts}`);
    console.log(
      `════════════════════════════════════════════════════${ConsoleOutputStrategy.RESET}\n`
    );

    for (const issue of issues) {
      const color =
        ConsoleOutputStrategy.PRIORITY_COLORS[issue.priority] || ConsoleOutputStrategy.RESET;

      console.log(
        `${ConsoleOutputStrategy.BOLD}[${issue.id}]${ConsoleOutputStrategy.RESET} ` +
        `${issue.title}`
      );
      console.log(
        `  ${ConsoleOutputStrategy.DIM}Project:${ConsoleOutputStrategy.RESET}      ${issue.projectKey}`
      );
      console.log(
        `  ${ConsoleOutputStrategy.DIM}Status:${ConsoleOutputStrategy.RESET}       ${issue.status}`
      );
      console.log(
        `  ${ConsoleOutputStrategy.DIM}Priority:${ConsoleOutputStrategy.RESET}     ` +
        `${color}${issue.priority}${ConsoleOutputStrategy.RESET}`
      );
      console.log(
        `  ${ConsoleOutputStrategy.DIM}Assignee:${ConsoleOutputStrategy.RESET}     ${issue.assignee}`
      );
      console.log(
        `  ${ConsoleOutputStrategy.DIM}Story pts:${ConsoleOutputStrategy.RESET}    ${issue.storyPoints ?? '—'}`
      );
      console.log(
        `  ${ConsoleOutputStrategy.DIM}Description:${ConsoleOutputStrategy.RESET}  ${issue.description}`
      );
      console.log('');
    }

    console.log(
      `${ConsoleOutputStrategy.DIM}────────────────────────────────────────────────────`
    );
    console.log(
      `Total issues reported: ${ConsoleOutputStrategy.BOLD}${issues.length}${ConsoleOutputStrategy.RESET}\n`
    );
  }
}

module.exports = { ConsoleOutputStrategy };
