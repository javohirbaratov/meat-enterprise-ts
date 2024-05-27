import {
  AccountBalanceWallet,
  AccountBalanceWalletOutlined,
  AddCircle,
  AddCircleOutline,
  DescriptionOutlined,
  AttachMoneyOutlined,
  GroupAddOutlined,
  MenuOutlined,
  MoveDownOutlined,
  PieChart,
  PieChartOutlineOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
  MonetizationOnOutlined,
} from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import BottomBar, {
  TBottomBarItem,
} from "../../components/common/bottomBar/BottomBar";
import MobileDrawer, {
  TMobileDrawerListItem,
} from "../../components/common/mobileDrawer/MobileDrawer";
import MainOutlet from "../../components/reactRouterDom/MainOutlet";
import { store_routes } from "../../constants/path";

const drawerMenuList: TMobileDrawerListItem[] = [
  {
    icon: <GroupAddOutlined />,
    label: "Taminotchi qo'shish",
    to: store_routes.provider,
  },
  {
    icon: <GroupAddOutlined />,
    label: "Mijoz qo'shish",
    to: store_routes.customer,
  },
  {
    icon: <MoveDownOutlined />,
    label: "Xolodilnikka o'tkazish",
    to: store_routes.transferToFreezer,
  },
  {
    icon: <AttachMoneyOutlined />,
    label: "Olingan qarzlar",
    to: store_routes.debt,
  },
  {
    icon: <MonetizationOnOutlined />,
    label: "Taminotchiga berilgan pullar",
    to: store_routes.reportProvider,
  },
  {
    icon: <MonetizationOnOutlined />,
    label: "Barcha taminotchilar hisoboti",
    to: store_routes.reportProviderAllNew,
  },
  {
    icon: <MonetizationOnOutlined />,
    label: "Taminotchi hisoboti",
    to: store_routes.reportProviderNew,
  },
  {
    icon: <DescriptionOutlined />,
    label: "Hisobot massa",
    to: store_routes.reportMassa,
  },
  {
    icon: <DescriptionOutlined />,
    label: "Hisobot mijoz",
    to: store_routes.reportCashier,
  },
  {
    icon: <DescriptionOutlined />,
    label: "Mijozlardan kirim chiqim",
    to: store_routes.reportAllCustomer,
  },
  {
    icon: <DescriptionOutlined />,
    label: "Xarajatlar",
    to: store_routes.expense,
  },
  {
    icon: <DescriptionOutlined />,
    label: "Oylik",
    to: store_routes.salary,
  },
];

const StoreLayout: React.FC = () => {
  // State
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  // Location
  const { pathname } = useLocation();

  const showBottomBar = useMemo(() => {
    switch (pathname) {
      case store_routes.receptionAdd:
        return false;
      case store_routes.salesAdd:
        return false;
      default:
        return true;
    }
  }, [pathname]);

  const handleOpenMenu = () => setOpenDrawer(true);
  const handleCloseMenu = () => setOpenDrawer(false);

  const bottomBarItems: TBottomBarItem[] = [
    {
      icon: PieChartOutlineOutlined,
      activeIcon: PieChart,
      label: "Asosiy",
      key: store_routes.home,
    },
    {
      icon: ShoppingCartOutlined,
      activeIcon: ShoppingCart,
      label: "Sotuv",
      key: store_routes.sales,
      customRoute: store_routes.orderHistory,
    },
    {
      icon: AddCircleOutline,
      activeIcon: AddCircle,
      label: "Qabul qilish",
      key: store_routes.reception,
    },
    {
      icon: AccountBalanceWalletOutlined,
      activeIcon: AccountBalanceWallet,
      label: "Kassa",
      key: store_routes.cashier,
    },
    {
      icon: MenuOutlined,
      activeIcon: MenuOutlined,
      label: "Menu",
      key: "",
      onClick: handleOpenMenu,
    },
  ];

  return (
    <Box sx={{ p: "10px", pb: showBottomBar ? "100px" : 0 }}>
      <MobileDrawer
        open={openDrawer}
        onClose={handleCloseMenu}
        onOpen={() => console.log("render")}
        list={drawerMenuList}
      />

      <MainOutlet />
      {showBottomBar ? <BottomBar list={[...bottomBarItems]} /> : null}
    </Box>
  );
};

export default StoreLayout;
