import { ExcelOrderRow } from '../utils/excelOrderImport';
import { formatMoney } from '../utils/pricing';

interface OrderImportGridProps {
  rows: ExcelOrderRow[];
  total: number;
  validCount: number;
  errorCount: number;
}

const OrderImportGrid = ({ rows, total, validCount, errorCount }: OrderImportGridProps) => {
  if (rows.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="rounded-full bg-blue-50 text-blue-900 px-3 py-1 font-medium">
          {validCount} producto{validCount !== 1 ? 's' : ''} OK
        </span>
        {errorCount > 0 && (
          <span className="rounded-full bg-red-50 text-red-700 px-3 py-1 font-medium">
            {errorCount} con error
          </span>
        )}
        <span className="rounded-full bg-orange-50 text-brandOrange px-3 py-1 font-semibold">
          Total: ${formatMoney(total)}
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-blue-200 bg-white/80">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-blue-50 text-blue-900">
              <th className="px-3 py-2 text-left font-semibold">Código</th>
              <th className="px-3 py-2 text-left font-semibold">Descripción</th>
              <th className="px-3 py-2 text-right font-semibold">Precio unit.</th>
              <th className="px-3 py-2 text-right font-semibold">Unidades</th>
              <th className="px-3 py-2 text-right font-semibold">Subtotal</th>
              <th className="px-3 py-2 text-left font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const hasError = Boolean(row.error);
              return (
                <tr
                  key={`${row.code}-${row.rowNumber}`}
                  className={`border-t border-slate-100 ${hasError ? 'bg-red-50/60' : 'bg-white/60'}`}
                >
                  <td className="px-3 py-2 font-medium text-blue-900">{row.code}</td>
                  <td className="px-3 py-2 text-gray-700">
                    {row.product?.name ?? '—'}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-700">
                    {row.unitPrice != null ? `$ ${formatMoney(row.unitPrice)}` : '—'}
                  </td>
                  <td className="px-3 py-2 text-right text-gray-700">{row.quantity}</td>
                  <td className="px-3 py-2 text-right font-medium text-blue-900">
                    {row.subtotal != null ? `$ ${formatMoney(row.subtotal)}` : '—'}
                  </td>
                  <td className="px-3 py-2">
                    {hasError ? (
                      <span className="text-red-700 font-medium">{row.error}</span>
                    ) : (
                      <span className="text-green-700 font-medium">OK</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderImportGrid;
