import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthRequired from "./components/common/authRequired/AuthRequired";
import MainOutlet from "./components/reactRouterDom/MainOutlet";
import { role_list } from "./constants/const";
import { admin_routes, auth_routes, store_routes } from "./constants/path";
import { AdminLayout, AuthLayout, StoreLayout } from "./layout";
import {
  AdminAgentBalance,
  AdminBalance,
  AdminGetMoneyFromAgentFrom,
  AdminGivingMoneyToAgent,
  AdminGivingMoneyToAgentAdd,
  AdminHome,
  AdminProducts,
  AdminReportsCustomer,
  AdminReportsCustomerDebt,
  AdminUsers,
  AuthLogin,
  Page404,
  StoreCashier,
  StoreCustomer,
  StoreCustomerAdd,
  StoreCustomerEdit,
  StoreDebt,
  StoreDebtAdd,
  StoreExpense,
  StoreExpenseAdd,
  StoreHome,
  StorePreparationAdd,
  StoreProvider,
  StoreProviderAdd,
  StoreReception,
  StoreReceptionAdd,
  StoreReportAllCustomer,
  StoreReportCashier,
  StoreReportMassa,
  StoreReportProvider,
  StoreReportProviderAdd,
  StoreReportProviderAllNew,
  StoreReportProviderNew,
  StoreSalary,
  StoreSalaryAdd,
  StoreSales,
  StoreSalesAdd,
  StoreTransferToFreezer,
  StoreTransferToFreezerAdd,
} from "./pages";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<MainOutlet />}>
        {/* Home */}
        <Route
          path="/"
          element={<Navigate to={auth_routes.login} replace={true} />}
        />

        {/* Auth */}
        <Route path={auth_routes.login} element={<AuthLayout />}>
          <Route index element={<AuthLogin />} />
        </Route>

        {/* Admin */}
        <Route element={<AuthRequired allowRoles={[role_list.admin]} />}>
          <Route path={admin_routes.home} element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path={admin_routes.user} element={<AdminUsers />} />
            <Route
              path={admin_routes.givingMoneyToAgent}
              element={<AdminGivingMoneyToAgent />}
            />
            <Route
              path={admin_routes.givingMoneyToAgentAdd}
              element={<AdminGivingMoneyToAgentAdd />}
            />
            <Route
              path={admin_routes.givingMoneyToAgentGet}
              element={<AdminGetMoneyFromAgentFrom />}
            />
            <Route
              path={admin_routes.agentBalance}
              element={<AdminAgentBalance />}
            />
            <Route path={admin_routes.balance} element={<AdminBalance />} />
            <Route
              path={admin_routes.reportsCustomer}
              element={<AdminReportsCustomer />}
            />
            <Route
              path={admin_routes.reportsCustomerDebt}
              element={<AdminReportsCustomerDebt />}
            />
            <Route path={admin_routes.products} element={<AdminProducts />} />
          </Route>
        </Route>

        {/* Store */}
        <Route element={<AuthRequired allowRoles={[role_list.store]} />}>
          <Route path={store_routes.home} element={<StoreLayout />}>
            <Route index element={<StoreHome />} />
            <Route path={store_routes.sales} element={<StoreSales />} />
            <Route path={store_routes.salesAdd} element={<StoreSalesAdd />} />
            {/* <Route path={store_routes.orderHistory} element={<StoreOrder />} /> */}
            <Route path={store_routes.reception} element={<StoreReception />} />
            <Route path={store_routes.receptionAdd} element={<StoreReceptionAdd />} />
            <Route path={store_routes.cashier} element={<StoreCashier />}  />
            <Route path={store_routes.preparationAdd} element={<StorePreparationAdd />} />
            <Route path={store_routes.provider} element={<StoreProvider />} />
            <Route path={store_routes.providerAdd} element={<StoreProviderAdd />} />
            <Route path={store_routes.customer} element={<StoreCustomer />} />
            <Route path={store_routes.customerAdd} element={<StoreCustomerAdd />} />
            <Route path={store_routes.customerEdit} element={<StoreCustomerEdit />} />
            <Route path={store_routes.transferToFreezer} element={<StoreTransferToFreezer />} />
            <Route path={store_routes.transferToFreezerAdd} element={<StoreTransferToFreezerAdd />} />
            <Route path={store_routes.expense} element={<StoreExpense />} />
            <Route path={store_routes.expenseAdd} element={<StoreExpenseAdd />} />
            <Route path={store_routes.debt} element={<StoreDebt />} />
            <Route path={store_routes.debtAdd} element={<StoreDebtAdd />} />
            <Route path={store_routes.reportProvider} element={<StoreReportProvider />} />
            <Route path={store_routes.reportProviderAdd} element={<StoreReportProviderAdd />} />
            <Route path={store_routes.reportCashier} element={<StoreReportCashier />} />
            <Route path={store_routes.reportAllCustomer} element={<StoreReportAllCustomer />} />
            <Route path={store_routes.reportMassa} element={<StoreReportMassa />} />
            <Route path={store_routes.reportProviderAllNew} element={<StoreReportProviderAllNew />} />
            <Route path={store_routes.reportProviderNew} element={<StoreReportProviderNew />} />
            <Route path={store_routes.salary} element={<StoreSalary />} />
            <Route path={store_routes.salaryAdd} element={<StoreSalaryAdd />} />
        
          </Route>
        </Route>

        {/* Page not found */}
        <Route path={"*"} element={<Page404 />} />
      </Route>
    </Routes>
  );
};

export default Router;
