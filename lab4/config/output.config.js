'use strict';

const path = require('path');

// Load .env relative to the lab4 directory, not the current working directory
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/**
 * Central configuration object built from environment variables.
 * Switching the output strategy requires only changing OUTPUT_TYPE in .env —
 * no application code needs to be touched.
 *
 * @type {{
 *   outputType:   string,
 *   dataFilePath: string,
 *   kafka: { broker: string, topic: string, clientId: string }
 * }}
 */
const config = {
  outputType:   (process.env.OUTPUT_TYPE   || 'console').toLowerCase(),
  dataFilePath:  process.env.DATA_FILE_PATH || './data/jira-issues.json',
  kafka: {
    broker:   process.env.KAFKA_BROKER    || 'localhost:9092',
    topic:    process.env.KAFKA_TOPIC     || 'jira-issues',
    clientId: process.env.KAFKA_CLIENT_ID || 'jira-reporter',
  },
};

module.exports = config;
