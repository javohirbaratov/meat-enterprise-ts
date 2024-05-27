import { store_api } from "../../../../constants/api";
import { IApiRes, IDate } from "../../../../types/api";
import { api } from "../../api";

const STORE_DEBT_TAG = "STORE_DEBT_TAG";

// index
interface IStoreDebtGetParams {
  date: IDate;
}

export interface IStoreDebtResListItem {
  id: string;
  summa: number;
  naqdsum: string;
  naqdusd: string;
  valyuta: string;
  bank: string;
  karta: string;
  client: string;
  telefon: string;
  vaqt: string;
}

interface IStoreDebtRes extends IApiRes {
  data: {
    itog: number;
    list: IStoreDebtResListItem[];
  };
}

export interface IStoreDebtAdd {
  naqdsum: number | "";
  naqdusd: number | "";
  valyuta: number | "";
  bank: number | "";
  karta: number | "";
  client_id: number | "";
}

export const storeDebtApi = api
  .enhanceEndpoints({ addTagTypes: [STORE_DEBT_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // Index
      getStoreDebt: build.query<IStoreDebtRes, IStoreDebtGetParams>({
        query: ({ date }) => store_api.debt_get(date),
        providesTags: [STORE_DEBT_TAG],
      }),
      // add
      addStoreDebt: build.mutation<IApiRes, IStoreDebtAdd>({
        query: (body) => ({
          url: store_api.debt_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [STORE_DEBT_TAG],
      }),
      //delete
      deleteStoreDebt: build.mutation<IApiRes, {debtId: string}>({
        query: ({debtId: debtId}) => ({
          url: store_api.debt_delete(debtId),
          method: "DELETE",
          
        }),
        invalidatesTags: [STORE_DEBT_TAG],
      }),
    }),
  });

export const { useGetStoreDebtQuery, useAddStoreDebtMutation, useDeleteStoreDebtMutation } =
  storeDebtApi;
