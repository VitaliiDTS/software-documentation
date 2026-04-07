'use strict';

/**
 * Abstract base class for all output strategies.
 *
 * ─── GoF Strategy Pattern ────────────────────────────────────────────────────
 * This class defines the common interface (contract) that every concrete
 * strategy must implement. The rest of the system depends only on this
 * abstraction, never on a specific strategy implementation.
 *
 * Concrete strategies:
 *   - ConsoleOutputStrategy  — prints formatted issues to stdout
 *   - KafkaOutputStrategy    — publishes issues as messages to a Kafka topic
 *
 * Adding a new output target (e.g., Elasticsearch, email) requires only:
 *   1. Creating a new class that extends OutputStrategy
 *   2. Registering it in OutputStrategyFactory
 *   No existing code needs to change.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * @abstract
 */
class OutputStrategy {
  /**
   * Outputs the given list of Jira issues to the chosen destination.
   *
   * @param {Array<Object>} issues - Array of Jira issue objects to output.
   * @returns {Promise<void>}
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  async output(issues) {
    throw new Error(
      `${this.constructor.name} must implement the output(issues) method.`
    );
  }
}

module.exports = { OutputStrategy };
