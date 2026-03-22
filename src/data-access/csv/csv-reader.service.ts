import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { CsvReaderPort, CsvRow } from '../ports/csv-reader.port';
import { RunStatus } from '../../domain/enums/run-status.enum';

@Injectable()
export class CsvReaderService extends CsvReaderPort {
  async read(filePath: string): Promise<CsvRow[]> {
    const content = readFileSync(filePath, 'utf-8');
    const records: string[][] = parse(content, {
      skip_empty_lines: true,
      trim: true,
    });

    // first row is header
    const [, ...rows] = records;

    return rows.map((cols) => ({
      testCaseId: cols[0],
      testCaseTitle: cols[1],
      stepNo: parseInt(cols[2], 10),
      action: cols[3],
      expected: cols[4],
      testRunId: cols[5],
      executedAt: new Date(cols[6]),
      runStatus: cols[7] as RunStatus,
      actualResult: cols[8],
      stepStatus: cols[9] as RunStatus,
    }));
  }
}
