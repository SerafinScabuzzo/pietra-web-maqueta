import { formatMoney } from '../utils/pricing';

export interface OrderReceiptLine {
  sku: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderReceipt {
  number: string;
  productCount: number;
  unitCount: number;
  total: number;
  lines: OrderReceiptLine[];
  clientName: string;
  clientCode: string;
  dateLabel: string;
}

interface OrderReceiptViewProps {
  receipt: OrderReceipt;
}

const OrderReceiptView = ({ receipt }: OrderReceiptViewProps) => {
  return (
    <div className="print-receipt text-left">
      <div className="text-center mb-6 pb-4 border-b border-slate-200">
        <p className="text-2xl font-bold text-blue-900">PietraItaly</p>
        <p className="text-sm text-gray-600 mt-1">Comprobante de pedido</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700 mb-6">
        <p>
          <span className="font-semibold text-gray-900">Pedido:</span> {receipt.number}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Fecha:</span> {receipt.dateLabel}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Cliente:</span> {receipt.clientName}
        </p>
        <p>
          <span className="font-semibold text-gray-900">Código:</span> {receipt.clientCode}
        </p>
      </div>

      <table className="w-full text-sm mb-6 border-collapse">
        <thead>
          <tr className="border-b-2 border-blue-200 text-blue-900">
            <th className="py-2 text-left font-semibold">Código</th>
            <th className="py-2 text-left font-semibold">Descripción</th>
            <th className="py-2 text-right font-semibold">Cant.</th>
            <th className="py-2 text-right font-semibold">Unit.</th>
            <th className="py-2 text-right font-semibold">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {receipt.lines.map((line) => (
            <tr key={`${line.sku}-${line.name}`} className="border-b border-slate-100">
              <td className="py-2 pr-2 font-medium">{line.sku}</td>
              <td className="py-2 pr-2">{line.name}</td>
              <td className="py-2 text-right">{line.quantity}</td>
              <td className="py-2 text-right">${formatMoney(line.unitPrice)}</td>
              <td className="py-2 text-right font-medium">${formatMoney(line.subtotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-slate-200 pt-4 space-y-1 text-sm">
        <div className="flex justify-between text-gray-700">
          <span>Productos</span>
          <span>{receipt.productCount}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Unidades</span>
          <span>{receipt.unitCount}</span>
        </div>
        <div className="flex justify-between text-xl font-bold text-blue-900 pt-2">
          <span>Total</span>
          <span>${formatMoney(receipt.total)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderReceiptView;
