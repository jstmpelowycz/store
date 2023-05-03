import html2canvas from "html2canvas";
import Pdf from "jspdf";

export const saveAsPdf = async (name: string): Promise<void> => {
  const elements = document.querySelectorAll('[data-printable]');
  const element = elements[0];

  const canvas = await html2canvas(<HTMLElement>element);

  const data = canvas.toDataURL('image/png');

  const pdf = new Pdf();
  const imgProperties = pdf.getImageProperties(data);

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;


  pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${name}.pdf`);
};
