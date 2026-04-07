'use strict';

const { ConsoleOutputStrategy } = require('../strategies/ConsoleOutputStrategy');
const { KafkaOutputStrategy }   = require('../strategies/KafkaOutputStrategy');

/**
 * Maps configuration keys to their corresponding strategy constructors.
 * Adding a new output target means adding one entry here — nothing else changes.
 *
 * @type {Record<string, new() => import('../strategies/OutputStrategy').OutputStrategy>}
 */
const STRATEGY_REGISTRY = {
  console: ConsoleOutputStrategy,
  kafka:   KafkaOutputStrategy,
};

/**
 * Factory responsible for instantiating the correct OutputStrategy based on
 * the application configuration.
 *
 * This is the single place in the codebase that knows which strategy classes
 * exist. Business logic (JiraIssueReporterService) depends only on the
 * OutputStrategy interface and never on concrete implementations.
 */
class OutputStrategyFactory {
  /**
   * Returns a concrete OutputStrategy instance for the given output type.
   *
   * @param {string} outputType - Value from config.outputType (e.g. 'console' | 'kafka')
   * @returns {import('../strategies/OutputStrategy').OutputStrategy}
   * @throws {Error} If the outputType is not registered.
   */
  static create(outputType) {
    const StrategyClass = STRATEGY_REGISTRY[outputType];

    if (!StrategyClass) {
      const available = Object.keys(STRATEGY_REGISTRY).join(' | ');
      throw new Error(
        `Unknown OUTPUT_TYPE: "${outputType}". ` +
        `Set OUTPUT_TYPE to one of: ${available}`
      );
    }

    return new StrategyClass();
  }
}

module.exports = { OutputStrategyFactory };
