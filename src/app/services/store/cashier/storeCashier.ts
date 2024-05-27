import { store_api } from "../../../../constants/api";
import { IApiRes, IDate } from "../../../../types/api";
import { api } from "../../api";

const STORE_CASHIER_TAG = "STORE_CASHIER_TAG";

// Balance get
interface ICashierBalanceRes extends IApiRes {
  data: {
    qoldiq_balans: {
      naqdsum: number;
      naqdusd: number;
      bank: number;
      karta: number;
    };
    jami_hisobot: {
      jami_debet: number;
      jami_kredit: number;
      ostatka: number;
      balans: number;
    };
    kb_naqdsum: number; // jami
  };
}

// Exchange get
interface ICashierExchangeRes extends IApiRes {
  data: {
    qoldiq_balans: {
      naqdsum: number;
      naqdusd: number;
      bank: number;
      karta: number;
    };
    kb_naqdsum: number; // jami
  };
}

// Exchange add
interface ICashierExchangeAdd extends IApiRes {
  data: {
    chiquvchi_hisob: string;
    kiruvchi_hisob: string;
    summa: number;
    valyuta: number;
    izoh: string;
  };
}

export const storeCashierApi = api
  .enhanceEndpoints({ addTagTypes: [STORE_CASHIER_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // Index
      getStoreCashierBalance: build.query<ICashierBalanceRes, IDate>({
        query: (date) => store_api.cashier_balance_get(date),
        providesTags: [STORE_CASHIER_TAG],
      }),
      // Index exchange
      getStoreCashierExchange: build.query<ICashierExchangeRes, void>({
        query: () => store_api.cashier_exchange_get,
        providesTags: [STORE_CASHIER_TAG],
      }),
      // Add exchange
      addStoreCashierExchange: build.mutation<IApiRes, ICashierExchangeAdd>({
        query: () => store_api.cashier_exchange_add,
        invalidatesTags: [STORE_CASHIER_TAG],
      }),
    }),
  });

export const {
  useGetStoreCashierBalanceQuery,
  useGetStoreCashierExchangeQuery,
  useAddStoreCashierExchangeMutation,
} = storeCashierApi;
