import { MatchRow } from './MatchRow';
import { MatchResult } from './MatchResult';
import { CsvReader } from '../csv/CsvReader';

type Row = string[];

interface RowsReader {
  read(): Row[];
}

export class MatchRowsReader {
  static fromCsv(path: string): MatchRowsReader {
    const reader: CsvReader = new CsvReader(path);
    return new MatchRowsReader(reader);
  }

  constructor(private reader: RowsReader) {}

  read(): MatchRow[] {
    return this.reader.read().map(this.fromRawRowToMatchRow);
  }

  private fromRawRowToMatchRow = (row: Row): MatchRow => {
    return [
      this.parseDate(row[0]),
      row[1],
      row[2],
      parseInt(row[3]),
      parseInt(row[4]),
      row[5] as MatchResult,
      row[6]
    ];
  };

  private parseDate = (rawDate: string): Date => {
    const [day, month, year] = rawDate.split('/').map(parseInt);

    return new Date(year, month - 1, day);
  };
}
