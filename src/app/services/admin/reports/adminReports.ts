import { admin_api } from "../../../../constants/api";
import { IApiRes, IDate } from "../../../../types/api";
import { api } from "../../api";

const ADMIN_REPORTS_TAG = "ADMIN_BALANCE";

// Customer
export interface IAdminReportsCustomerItem {
  fio: string;
  debit: number;
  jamikredit: number;
  saldo: number;
}

interface IAdminReportsCustomerRes extends IApiRes {
  data: {
    jamikredit: number;
    jamidebit: number;
    akt: IAdminReportsCustomerItem[];
  };
}

// Customer debt
export interface IAdminReportsCustomerDebtAktItem {
  fio: string;
  eski_qarz: number;
  debit: number;
  jamikredit: number;
  massavozvrat: number;
  saldo: number;
}

interface IAdminReportsCustomerDebtRes extends IApiRes {
  data: {
    jami_eski_qarz: number;
    jamitolov: number;
    jamivozvrat: number;
    jamikredit_naqd: number;
    jamiberilganyuk: number;
    jami_saldo: number;
    massa: {
      chiqqan: number;
      vozvrat: number;
      paterya: number;
    };
    summa: {
      chiqqan: number;
      vozvrat: number;
      paterya: number;
    };
    jamimassavozvrat: number;
    akt: IAdminReportsCustomerDebtAktItem[];
  };
}

export const adminReportsApi = api
  .enhanceEndpoints({
    addTagTypes: [ADMIN_REPORTS_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getAdminReportsCustomer: build.query<
        IAdminReportsCustomerRes,
        { date: IDate; customer_id: string }
      >({
        query: ({ date, customer_id }) =>
          admin_api.reports_customer_get(date, customer_id),
        providesTags: [ADMIN_REPORTS_TAG],
      }),
      // index
      getAdminReportsCustomerDebt: build.query<
        IAdminReportsCustomerDebtRes,
        { date: IDate; customer_id: string }
      >({
        query: ({ date, customer_id }) =>
          admin_api.reports_customer_debt_get(date, customer_id),
        providesTags: [ADMIN_REPORTS_TAG],
      }),
    }),
  });

export const {
  useGetAdminReportsCustomerQuery,
  useGetAdminReportsCustomerDebtQuery,
} = adminReportsApi;
