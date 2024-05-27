import { store_api } from "../../../../constants/api";
import { IApiRes, IDate } from "../../../../types/api";
import { api } from "../../api";

const STORE_REPORTS_TAG = "STORE_REPORTS";

// cashier
interface IStoreReportCashierQueryParams {
  date: IDate;
  supplierId: string;
}
export interface IStoreReportCashierAktItem {
  fio: string;
  eski_qarz: number;
  debit: number;
  jamikredit: number;
  massavozvrat: number;
  saldo: number;
}
interface IStoreReportCashierRes extends IApiRes {
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
    akt: IStoreReportCashierAktItem[];
  };
}

// all customer
export interface IStoreReportAllCustomerAktItem {
  id: number;
  debit: number;
  izoh: string;
  kredit: string;
  status: string;
  summa: string;
  vaqt: IDate
}

interface IStoreReportCustumerByStatusQueryParams {
  status: string,
  reportId: number
}

export interface IStoreGetCustomer {
  id: string,
  fio: string
}

interface IStoreReportAllCustomerRes extends IApiRes {
  data: {
    jamikredit: number;
    jamidebit: number;
    akt: IStoreReportAllCustomerAktItem[];
  };
}

 interface IStoreReportCustomerByStatusItem extends IApiRes {
   price: string,
   soni: string,
   item_name: string,
   summa: string
}

// Customer status
export type IStoreReportCustomerStatusData = {
  client: string,
  client_telefon: string,
  dostavka: string,
  id: string,
  summa: string,
  vaqt: string,
  naqdsum: string, 
  naqdusd: string, 
  valyuta: string, 
  bank: string, 
  karta: string, 
  items: IStoreReportCustomerByStatusItem[];
}

interface IStoreReporrCustomerByStatusRes extends IApiRes {
  data: IStoreReportCustomerStatusData;
}

export const storeReportsApi = api
  .enhanceEndpoints({ addTagTypes: [STORE_REPORTS_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // cashier
      getStoreReportCashier: build.query<
        IStoreReportCashierRes,
        IStoreReportCashierQueryParams
      >({
        query: ({ date, supplierId }) =>
          store_api.report_cashier_get(date, supplierId),
        providesTags: [STORE_REPORTS_TAG],
      }),
      // customer
      getStoreReportAllCustomer: build.query<
        IStoreReportAllCustomerRes,
        IStoreReportCashierQueryParams
      >({
        query: ({ date, supplierId }) =>
          store_api.report_customer_get(date, supplierId),
        providesTags: [STORE_REPORTS_TAG],
      }),

      //custumer by status 
      getStoreReportByStatusCustomer: build.query<
        IStoreReporrCustomerByStatusRes,
        IStoreReportCustumerByStatusQueryParams
      >({
        query: ({ status, reportId }) =>
          store_api.report_customer_get_by_status(status, reportId),
        providesTags: [STORE_REPORTS_TAG],
      }),

      // customer_get
      getStoreCustomer: build.query<IStoreGetCustomer, void>({
        query: () => store_api.customer_get,
        providesTags: [STORE_REPORTS_TAG],
      }),

    }),
  });

export const {
  useGetStoreReportCashierQuery,
  useGetStoreReportAllCustomerQuery,
  useGetStoreReportByStatusCustomerQuery,
  useGetStoreCustomerQuery
} = storeReportsApi;
