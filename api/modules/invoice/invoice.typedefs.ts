export interface Invoice {
  id: string;
  employee_id: number;
  card_id: string;
  print_date: string;
  total: number;
  vat: number;
}

export type CreateInvoiceFields = Invoice;
