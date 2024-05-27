import { Article, AssignmentInd, GridOn, Paid, People, PieChart } from "@mui/icons-material";
import React from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout, {
  DashboardMenuListItem,
} from "../../components/common/dashboardLayout/DashboardLayout";
import MainOutlet from "../../components/reactRouterDom/MainOutlet";
import { admin_routes } from "../../constants/path";

const menuItems: DashboardMenuListItem[] = [
  {
    key: admin_routes.home,
    icon: <PieChart />,
    label: "Asosiy",
    to: admin_routes.home,
  },
  {
    key: admin_routes.user,
    icon: <People />,
    label: "Foydalanuvchilar",
    to: admin_routes.user,
  },
  {
    key: admin_routes.givingMoneyToAgent,
    icon: <AssignmentInd />,
    label: "Agentga pul berish",
    to: admin_routes.givingMoneyToAgent,
  },
  {
    key: admin_routes.agentBalance,
    icon: <AssignmentInd />,
    label: "Agent balansi",
    to: admin_routes.agentBalance,
  },
  {
    key: admin_routes.balance,
    icon: <Paid />,
    label: "Balans",
    to: admin_routes.balance,
  },
  {
    key: admin_routes.reportsCustomer,
    icon: <Article />,
    label: "Mijozlarning hisoboti",
    to: admin_routes.reportsCustomer,
  },
  {
    key: admin_routes.reportsCustomerDebt,
    icon: <Article />,
    label: "Mijozlarning qarzlari",
    to: admin_routes.reportsCustomerDebt,
  },
  {
    key: admin_routes.products,
    icon: <GridOn />,
    label: "Mahsulotlar",
    to: admin_routes.products,
  },
];

const AdminLayout: React.FC = () => {
  // Location
  const { pathname } = useLocation();

  return (
    <DashboardLayout
      menuList={menuItems}
      selectedMenuItem={pathname}
      appBarTitle="Admin"
    >
      {/* Content */}
      <MainOutlet />
    </DashboardLayout>
  );
};

export default AdminLayout;
