export interface CustomerCard {
  id: string,
  customer_last_name: string,
  customer_first_name: string,
  customer_patronymic: string,
  phone_number: string,
  city: string,
  street: string,
  zip_code: string,
  percent: number,
}

export type CreateCustomerCardFields = CustomerCard;

export type UpdateCustomerCardFields = Omit<CustomerCard, 'id'>;

