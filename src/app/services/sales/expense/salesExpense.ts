import { sales_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

interface ISalesExpenseListItem {
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

interface ISalesExpenseRes extends IApiRes {
  data: {
    itog: number;
    list: ISalesExpenseListItem[];
  };
}

// Add
export interface ISalesExpenseAdd {
  naqdsum: number|'';
  naqdusd: 0 /*doim 0*/;
  valyuta: 0 /*doim 0*/;
  bank: 0 /*doim 0*/;
  karta: 0 /*doim 0*/;
  client_id: string;
}

const SALES_EXPENSE_TAG = "SALES_EXPENSE";

export const salesExpenseApi = api
  .enhanceEndpoints({
    addTagTypes: [SALES_EXPENSE_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getSalesExpense: build.query<ISalesExpenseRes, void>({
        query: () => sales_api.expense_get,
        providesTags: [SALES_EXPENSE_TAG],
      }),
      // add
      addSalesExpense: build.mutation<IApiRes, ISalesExpenseAdd>({
        query: (body) => ({
          url: sales_api.expense_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [SALES_EXPENSE_TAG],
      }),
    }),
  });

export const { useGetSalesExpenseQuery, useAddSalesExpenseMutation } =
  salesExpenseApi;
