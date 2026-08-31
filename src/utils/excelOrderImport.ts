import * as XLSX from 'xlsx';
import { Product } from '../types';
import { findProductBySku } from './productLookup';
import { getEffectiveUnitPrice, getLineSubtotal } from './pricing';

export interface ExcelRawRow {
  rowNumber: number;
  code: string;
  quantity: number;
}

export interface ExcelOrderRow {
  rowNumber: number;
  code: string;
  quantity: number;
  product?: Product;
  unitPrice?: number;
  subtotal?: number;
  error?: string;
}

export interface ParsedExcelOrder {
  rows: ExcelOrderRow[];
  validCount: number;
  errorCount: number;
  total: number;
}

const HEADER_PATTERN = /^(codigo|código|sku|articulo|artículo|producto)$/i;

export const parseExcelBuffer = (buffer: ArrayBuffer): ExcelRawRow[] => {
  const workbook = XLSX.read(buffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) return [];

  const sheet = workbook.Sheets[sheetName];
  const matrix = XLSX.utils.sheet_to_json<(string | number | null)[]>(sheet, {
    header: 1,
    defval: '',
  });

  const rawRows: ExcelRawRow[] = [];

  matrix.forEach((row, index) => {
    if (!row || row.length === 0) return;

    const code = String(row[0] ?? '').trim();
    if (!code) return;
    if (index === 0 && HEADER_PATTERN.test(code)) return;

    const qtyCell = row[1];
    let quantity = 0;
    if (typeof qtyCell === 'number' && Number.isFinite(qtyCell)) {
      quantity = Math.floor(qtyCell);
    } else {
      const parsed = parseInt(String(qtyCell ?? '').trim(), 10);
      quantity = Number.isFinite(parsed) ? parsed : 0;
    }

    rawRows.push({
      rowNumber: index + 1,
      code,
      quantity,
    });
  });

  const merged = new Map<string, ExcelRawRow>();
  for (const row of rawRows) {
    const key = row.code.toUpperCase();
    const existing = merged.get(key);
    if (existing) {
      existing.quantity += row.quantity;
    } else {
      merged.set(key, { ...row });
    }
  }

  return Array.from(merged.values());
};

export const resolveExcelOrder = (
  rawRows: ExcelRawRow[],
  products: Product[],
  discountRate: number
): ParsedExcelOrder => {
  const rows: ExcelOrderRow[] = rawRows.map((row) => {
    if (row.quantity <= 0) {
      return {
        ...row,
        error: 'Cantidad inválida',
      };
    }

    const product = findProductBySku(products, row.code);
    if (!product) {
      return {
        ...row,
        error: 'Código no encontrado',
      };
    }

    const unitPrice = getEffectiveUnitPrice(product, discountRate);
    return {
      rowNumber: row.rowNumber,
      code: product.sku,
      quantity: row.quantity,
      product,
      unitPrice,
      subtotal: getLineSubtotal(product, row.quantity, discountRate),
    };
  });

  const validRows = rows.filter((row) => !row.error);

  return {
    rows,
    validCount: validRows.length,
    errorCount: rows.length - validRows.length,
    total: validRows.reduce((sum, row) => sum + (row.subtotal ?? 0), 0),
  };
};
