import { PriceList } from '../types';

export const downloadPriceListFile = (list: PriceList): void => {
  if (list.fileUrl && (list.fileUrl.startsWith('http://') || list.fileUrl.startsWith('https://'))) {
    const a = document.createElement('a');
    a.href = list.fileUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.download = list.fileName || `lista.${list.fileFormat}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    return;
  }

  const body = [
    `Lista: ${list.listType}`,
    `Vigencia: ${list.validity}`,
    `Orden: ${list.order}`,
    '',
    '(Archivo mock de la maqueta PietraItaly — sin backend)',
  ].join('\n');

  const mime =
    list.fileFormat === 'pdf'
      ? 'application/pdf'
      : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  const blob = new Blob([body], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download =
    list.fileName ||
    `${list.listType.replace(/\s+/g, '_')}.${list.fileFormat === 'pdf' ? 'pdf' : 'xlsx'}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};
