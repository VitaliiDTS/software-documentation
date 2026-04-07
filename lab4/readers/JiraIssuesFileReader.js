'use strict';

const fs   = require('fs');
const path = require('path');

/**
 * Responsible solely for reading Jira issues from a JSON file.
 *
 * This class has one concern: I/O and deserialization.
 * It knows nothing about how the data will be displayed or processed.
 * Keeping file reading separate from output makes both parts independently
 * testable and replaceable (e.g., swap JSON file for a REST API call).
 */
class JiraIssuesFileReader {
  /**
   * @param {string} filePath - Path to the JSON file containing Jira issues.
   *                            Resolved relative to the lab4 directory.
   */
  constructor(filePath) {
    // Resolve relative to lab4 root so the path works regardless of cwd
    this.filePath = path.resolve(__dirname, '..', filePath);
  }

  /**
   * Reads and parses Jira issues from the configured JSON file.
   *
   * @returns {Array<JiraIssue>} Parsed array of Jira issue objects.
   * @throws {Error} If the file is not found or contains invalid JSON.
   */
  read() {
    if (!fs.existsSync(this.filePath)) {
      throw new Error(`Data file not found: ${this.filePath}`);
    }

    const raw = fs.readFileSync(this.filePath, 'utf-8');

    try {
      return JSON.parse(raw);
    } catch (err) {
      throw new Error(`Failed to parse JSON from ${this.filePath}: ${err.message}`);
    }
  }
}

module.exports = { JiraIssuesFileReader };
