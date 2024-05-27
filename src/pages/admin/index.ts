import { lazy } from "react";

// Pages
export const AdminHome = lazy(() => import("./home/AdminHome"));
export const AdminUsers = lazy(() => import("./users/AdminUsers"));
export const AdminGivingMoneyToAgent = lazy(() => import("./givingMoneyToAgent/AdminGivingMoneyToAgent"));
export const AdminGivingMoneyToAgentAdd = lazy(() => import("./givingMoneyToAgentForm/AdminGivingMoneyToAgentForm"));
export const AdminGetMoneyFromAgentFrom = lazy(() => import("./getMoneyFromAgentForm/AdminGetMoneyFromAgentFrom"));
export const AdminAgentBalance = lazy(() => import("./agentBalance/AdminAgentBalance"));
export const AdminBalance = lazy(() => import("./balance/AdminBalance"));
export const AdminReportsCustomer = lazy(() => import("./reportsCustomer/AdminReportsCustomer"));
export const AdminReportsCustomerDebt = lazy(() => import("./reportsCustomerDebt/AdminReportsCustomerDebt"));
export const AdminProducts = lazy(() => import("./products/AdminProducts"));

