export enum RequestType {
  Post = 'POST',
  Get = 'GET',
  Put = 'PUT',
  Delete = 'DELETE',
}

export const DEFAULT_INIT_HEADERS = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const REQUEST_URLS = {
  employees: '/employees',
  employee: {
    login: '/employee/login',
    contacts: '/employee/contacts'
  },

  storeProducts: {
    default: '/store-products',
    sortedByAmount: '/store-products/sorted-by-amount',
  },

  customerCards: '/customer-cards',
  products: '/products',
  invoices: '/invoices',
  categories: '/categories',
};
