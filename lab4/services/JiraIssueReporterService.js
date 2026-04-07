'use strict';

const { JiraIssuesFileReader } = require('../readers/JiraIssuesFileReader');
const { OutputStrategyFactory } = require('../factories/OutputStrategyFactory');
const config = require('../config/output.config');

/**
 * Orchestrates the Jira issues reporting workflow:
 *   1. Read issues from the data file          (JiraIssuesFileReader)
 *   2. Route them to the configured output     (OutputStrategy)
 *
 * This service has no knowledge of WHERE the output goes — that decision
 * belongs entirely to the factory and the strategy. Changing OUTPUT_TYPE in
 * .env switches the output destination without modifying this class at all.
 */
class JiraIssueReporterService {
  constructor() {
    this.reader         = new JiraIssuesFileReader(config.dataFilePath);
    this.outputStrategy = OutputStrategyFactory.create(config.outputType);

    console.log(`[JiraIssueReporterService] Output strategy: ${config.outputType}`);
  }

  /**
   * Runs the full reporting pipeline: read → output.
   *
   * @returns {Promise<void>}
   */
  async run() {
    const issues = this.reader.read();
    console.log(`[JiraIssueReporterService] Read ${issues.length} issues from file.\n`);

    await this.outputStrategy.output(issues);
  }
}

module.exports = { JiraIssueReporterService };
