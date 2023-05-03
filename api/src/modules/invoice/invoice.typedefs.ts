export interface Invoice {
  id: string;
  employee_id: number;
  card_id: string | null;
  print_date: string;
  total: number;
}

export type CreateInvoiceFields = Invoice;
