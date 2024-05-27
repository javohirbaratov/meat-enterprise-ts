import { IDate } from "../types/api";

export const main_url = "https://ashraf-mysystem.uz/api/";

// AUTH
const auth_api = {
  login: "/user/login.php",
  show: "/user/get-user.php",
};

// ADMIN
const admin_api = {
  // users
  users_get: "/admin/get-user.php",
  users_add: "/admin/add-user.php",
  users_update: "/admin/get-user.php",

  // giving money to agent
  giving_money_to_agent_get: "/admin/get-zakup-money-history.php",
  agent_balance_get: "/admin/get-zakup-balans.php",
  giving_money_to_agent_add: "/admin/give-money-zakup.php",
  get_money_from_agent_add: "/admin/take-money-zakup.php",

  // balance
  balance_get: "/admin/get-balans.php",
  balance_history_get: "/admin/get-added-balans.php",
  balance_add: "/admin/add-balans.php",
  balance_substract_add: "/admin/take-balans.php",
  reports_all_benifit__get: (date: IDate) =>
    `/admin/get-foyda-rentable.php?sana1=${date.start}&sana2=${date.end}`,

  // reports
  reports_customer_get: (date: IDate, customer_id: string) =>
    `/sotuv/get-mijoz-report.php?client_id=${customer_id}&sana1=${date.start}&sana2=${date.end}`,
  reports_customer_debt_get: (date: IDate, customer_id: string) =>
    `/sotuv/get-mijozlar-hisobot-qarzdorlik.php?sana1=${date.start}&sana2=${date.end}&dostvka_id=null`,
  // products
};

// AGENT
const agent_api = {
  // balance
  balance_get: "/zakup/get-balans.php",
  balance_products_get: "/zakup/get-zakup-products.php",

  // provider
  provider_get: "/zakup/get-taminotchi.php",
  provider_get_by_id: (providerId: string) =>
    `/zakup/get-taminotchi.php?id=${providerId}`,
  provider_add: "/zakup/add-taminotchi.php",
  provider_put: (providerId: string) =>
    `/zakup/edit-taminotchi.php?id=${providerId}`,

  // give money to provider
  give_money_to_provider_get: "/zakup/get-taminotchi-pay-history.php",
  give_money_to_provider_add: "/zakup/pay-taminotchi.php",
  give_money_to_provider_check_sms_add: "/kassir/check-sms-code.php",

  // region
  region_get: "/zakup/get-viloyat.php",
  district_get_by_region: (regionId: string) =>
    `/zakup/get-tuman.php?viloyat_id=${regionId}`,

  // purchase
  purchase_get: "/zakup/get-krim.php",
  purchase_add: "/zakup/add-krim.php",
};

// STORE
const store_api = {
  // spare
  spare_get: "/saqlash/get-index-data.php",

  // reception
  reception_cargo_get: ({ start, end }: any) =>
    `/sklad/get-krim.php?sana1=${start}&sana2=${end}`,
  reception_cargo_add: "/sklad/add-krim.php",
  reception_delete: (id: string ) => `/sklad/delete-kirim-reception.php?id=${id}`,


  // other
  agent_get: "/sklad/get-zakup-list.php",
  butcher_get: "/sklad/get-qassob.php",

  // cashier
  cashier_balance_get: ({ start, end }: any) =>
    `/kassir/get-balans.php?sana1=${start}&sana2=${end}`,
  cashier_exchange_get: "/kassir/get-exchange-historys.php",
  cashier_exchange_add: "/kassir/change-hisob.php",

  // provider
  provider_get: "/sklad/get-taminotchi.php",
  provider_add: "/sklad/add-taminotchi.php",
  provider_update: (providerId: string) =>
    `/sklad/edit-taminotchi.php?id=${providerId}`,

  // customer
  customer_get: "/sotuv/get-clients.php",
  customer_get_by_id: (custumer_id: string) => `/sotuv/get-clients.php?id=${custumer_id}`,
  customer_add: "/sotuv/add-client.php",
  customer_update: (customerId: string) =>
    `/sotuv/edit-client.php?id=${customerId}`,

  // transfer to freezer
  transfer_to_freezer_get: "/saqlash/get-moved-history.php",
  transfer_to_freezer_add: "/saqlash/move-to-xolodelnik.php",

  // expense
  expense_category_get: "/kassir/get-hcategory.php",
  expense_get: (date: IDate, expenseCategory: string) =>
    `/kassir/get-harajatlar.php?sana1=${date.start}&sana2=${date.end}&harajat_category_id=${expenseCategory}`,
  expense_add: "/kassir/add-harajat.php",

  // debt
  debt_get: (date: IDate) =>
    `/dostavka/get-qarz-yechish-history.php?sana1=${date.start}&sana2=${date.end}`,
  debt_add: "/dostavka/qarz-olish.php",
  debt_delete: (id: string ) => `/dostavka/delete-debt-history.php?id=${id}`,
  // reports
  report_cashier_get: (date: IDate, supplierId: string) =>
    `/sotuv/get-mijozlar-hisobot-qarzdorlik.php?sana1=${date.start}&sana2=${date.end}&dostvka_id=${supplierId}`,
  report_all_customer_get: (date: IDate, supplierId: string) =>
    `/sotuv/get-mijozlar-hisobot.php?sana1=${date.start}&sana2=${date.end}&dostvka_id=${supplierId}`,
  report_customer_get: (date: IDate, customerId: string) =>
    `/sotuv/get-mijoz-report.php?client_id=${customerId}&sana1=${date.start}&sana2=${date.end}`,
  report_customer_get_by_status: (status: string, reportId: number) => 
    `sotuv/get-data.php?id=${reportId}&status=${status}`,

  // report provider
  report_provider_get: "/kassir/get-taminotchi-pay-history.php",
  report_provider_add: "/kassir/pay-taminotchi.php",
  report_provider_confirm_sms_add: "/kassir/check-sms-code.php",
    
  // Report is Mass 
  report_massa_get: (date: IDate) =>
    `/admin/get-massa-report.php?sana1=${date.start}&sana2=${date.end}`,

  // Report Provider  New
  report_provider_all_new: (date: IDate) => `saqlash/get-mijozlar-hisobot.php?sana1=${date.start}&sana2=${date.end}`,
  report_provider_new: (date: IDate, customerId: string) =>
    `/saqlash/get-mijoz-report.php?taminotchi_id=${customerId}&sana1=${date.start}&sana2=${date.end}`,
  // order
  order_from_sales_get: "/sklad/get-sotuv-orders-list.php",
  order_from_sales_get_by_id: (orderId: string) =>
    `/sklad/get-doing-orders.php?id=${orderId}`,
  order_from_sales_confirm_put: (orderId: string) =>
    `/sklad/confirm-sotuv-order.php?id=${orderId}`,
  order_from_sales_confirmed_get: "/sklad/get-doing-orders.php",
  // order process
  order_process_add: "/sklad/give-polka-product.php",
  order_process_end: "/sklad/end-order.php",
  order_completed_get: "/sklad/get-sale-done-orders.php",

  // salary 
  salary_report_get: (date: IDate, worker_id: string) => `kassir/get-oylik-pay-history.php?worker_id=${worker_id}&sana1=${date.start}6&sana2=${date.end}`,
  salary_add: "/kassir/pay-worker.php",
  worker_get: "kassir/get-workers.php"

};

// SALES
const sales_api = {
  // chart
  chart_get: "/sklad/get-products-chart.php",

  // order
  order_get: "/sotuv/get-sale-orders.php",
  order_add: "/sotuv/add-sale-order.php",
  order_delete: (id: string ) => `/sotuv/delete-sale-order.php?id=${id}`,
  order_end_add: "/sotuv/end-order.php",

  // customer
  customer_category_get: "/sotuv/get-client-category.php",
  customer_get: "/sotuv/get-clients.php",
  customer_add: "/sotuv/add-client.php",
  customer_put: (customerId: string) =>
    `/sotuv/edit-client.php?id=${customerId}`,

  // spare
  spare_get: "/sotuv/get-products.php",

  // expense
  expense_get: "/sotuv/get-qarz-yechish-history.php",
  expense_add: "/sotuv/qarz-olish.php",
};

export { admin_api, agent_api, auth_api, store_api, sales_api };
