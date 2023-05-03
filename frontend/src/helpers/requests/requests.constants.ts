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
    signup: '/employee/signup',
    contacts: '/employee/contacts'
  },

  storeProducts: {
    default: '/store-products',
    sortedByAmount: '/store-products/sorted-by-amount',
    info: '/store-products/get-info',
    byCategoryName: '/store-products/by-category-name',
  },

  customerCards: '/customer-cards',
  products: '/products',
  invoices: {
    default: '/invoices',
    byPeriod: '/invoices/by-period',
    byCashierAndPeriod: '/invoices/by-cashier-and-period',
  },
  categories: '/categories',
};
