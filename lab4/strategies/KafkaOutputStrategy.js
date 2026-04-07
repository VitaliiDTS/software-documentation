'use strict';

const { OutputStrategy } = require('./OutputStrategy');
const config = require('../config/output.config');

// ─────────────────────────────────────────────────────────────────────────────
// NOTE: Real Kafka integration
// ─────────────────────────────────────────────────────────────────────────────
// To connect to a real Kafka broker, install kafkajs:
//   npm install kafkajs
//
// Then replace MockKafkaProducer below with:
//
//   const { Kafka } = require('kafkajs');
//   const kafka = new Kafka({
//     clientId: config.kafka.clientId,
//     brokers:  [config.kafka.broker],
//   });
//   const producer = kafka.producer();
//
// The KafkaOutputStrategy class itself does NOT need to change.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Simulates a Kafka producer for environments where a real broker is not available.
 * Mirrors the kafkajs producer API so the strategy code is identical in both cases.
 *
 * @private
 */
class MockKafkaProducer {
  constructor({ clientId, broker, topic }) {
    this.clientId = clientId;
    this.broker   = broker;
    this.topic    = topic;
  }

  async connect() {
    console.log(
      `[Kafka] Producer "${this.clientId}" connected to broker ${this.broker} (mock)`
    );
  }

  /**
   * @param {{ topic: string, messages: Array<{ key: string, value: string }> }} payload
   */
  async send({ topic, messages }) {
    console.log(`\n[Kafka] Sending ${messages.length} message(s) to topic "${topic}":\n`);
    for (const msg of messages) {
      const preview = msg.value.length > 100
        ? msg.value.substring(0, 100) + '…'
        : msg.value;
      console.log(`  → key: ${msg.key}`);
      console.log(`    value: ${preview}`);
      console.log('');
    }
  }

  async disconnect() {
    console.log(`[Kafka] Producer "${this.clientId}" disconnected (mock)\n`);
  }
}

/**
 * Concrete Strategy: publishes Jira issues as JSON messages to a Kafka topic.
 *
 * Each issue becomes one Kafka message:
 *   key   = issue ID  (enables Kafka partitioning by issue)
 *   value = issue serialised as JSON string
 *
 * @extends OutputStrategy
 */
class KafkaOutputStrategy extends OutputStrategy {
  constructor() {
    super();

    // Swap MockKafkaProducer for the real kafkajs producer to go live
    this.producer = new MockKafkaProducer({
      clientId: config.kafka.clientId,
      broker:   config.kafka.broker,
      topic:    config.kafka.topic,
    });

    this.topic = config.kafka.topic;
  }

  /**
   * Serialises each issue to JSON and publishes it to the configured Kafka topic.
   *
   * @param {Array<Object>} issues
   * @returns {Promise<void>}
   */
  async output(issues) {
    await this.producer.connect();

    const messages = issues.map((issue) => ({
      key:   issue.id,
      value: JSON.stringify(issue),
    }));

    await this.producer.send({ topic: this.topic, messages });

    console.log(
      `[Kafka] ✓ Successfully published ${issues.length} issue(s) to topic "${this.topic}"`
    );

    await this.producer.disconnect();
  }
}

module.exports = { KafkaOutputStrategy };
