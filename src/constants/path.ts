// Auth
export const auth_routes = {
  login: "/login",
};

// Admin
export const admin_routes = {
  home: "/admin",
  user: "/admin/user",
  givingMoneyToAgent: "/admin/givingMoneyToAgent",
  givingMoneyToAgentAdd: "/admin/givingMoneyToAgentAdd",
  givingMoneyToAgentGet: "/admin/givingMoneyToAgentGet",
  agentBalance: "/admin/agentBalance",
  balance: "/admin/balance",
  reportsCustomer: "/admin/reportsCustomer",
  reportsCustomerDebt: "/admin/reportsCustomerDebt",
  products: "/admin/products",
};

// Store
export const store_routes = {
  home: "/store",
  sales: "/store/sales",
  salesAdd: "/store/sales/add",
  orderHistory: "/store/order/history",
  reception: "/store/reception",
  receptionAdd: "/store/receptionAdd",
  cashier: "/store/cashier",
  preparationAdd: "/store/preparation/:orderId/add",
  provider: "/store/provider",
  providerAdd: "/store/providerAdd",
  customer: "/store/customer",
  customerAdd: "/store/customerAdd",
  customerEdit: "/store/customer/:customerId/edit",
  transferToFreezer: "/store/transferToFreezer",
  transferToFreezerAdd: "/store/transferToFreezer/add",
  expense: "/store/expense",
  expenseAdd: "/store/expense/add",
  debt: "/store/debt",
  debtAdd: "/store/debt/add",
  reportProvider: "/store/reportProvider",
  reportProviderAdd: "/store/reportProvider/add",
  reportCashier: "/store/reportCashier",
  reportAllCustomer: "store/reportAllCustomer",
  reportMassa: "store/reportMassa",
  reportProviderAllNew: "store/reportProviderAllNew",
  reportProviderNew: "store/reportProviderNew",
  salary: "/store/salary",
  salaryAdd: "/store/salary/add"
};
