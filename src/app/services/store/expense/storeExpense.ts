import { store_api } from "../../../../constants/api";
import { IApiRes, IDate } from "../../../../types/api";
import { api } from "../../api";

const STORE_EXPENSE_TAG = "AGENT_PURCHASE_TAG";

interface IStoreExopenseGetListItem {
  id: string;
  naqdsum: string;
  naqdusd: string;
  bank: string;
  karta: string;
  izoh: string;
  vaqt: string;
  turi: string;
  javobgar: string;
}
// get
interface IStoreExpenseGetParams {
  date: IDate;
  expenseCategory: string;
}
interface IStoreExpenseGetRes extends IApiRes {
  data: {
    list: null | IStoreExopenseGetListItem[];
    jaminaqd: number;
    jamiusd: number;
    jamibank: number;
    jamikarta: number;
    jami: number;
  };
}
// get category
interface IStoreExpenseCategoryItem {
  id: string;
  name: string;
}
interface IStoreExpenseCategoryGetRes extends IApiRes {
  data: IStoreExpenseCategoryItem[];
}
// Add
export interface IStoreExpenseAdd {
  naqdsum: number | "";
  naqdusd: number | "";
  valyuta: number | "";
  bank: number | "";
  karta: number | "";
  izoh: string;
  category_id: number | "";
}

export const storeExpenseApi = api
  .enhanceEndpoints({ addTagTypes: [STORE_EXPENSE_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // Index
      getStoreExpense: build.query<IStoreExpenseGetRes, IStoreExpenseGetParams>(
        {
          query: ({date, expenseCategory}) => store_api.expense_get(date, expenseCategory),
          providesTags: [STORE_EXPENSE_TAG],
        }
      ),
      // Index category
      getStoreExpenseCategory: build.query<IStoreExpenseCategoryGetRes, void>({
        query: () => store_api.expense_category_get,
      }),
      // add
      addStoreExpense: build.mutation<IApiRes, IStoreExpenseAdd>({
        query: (body) => ({
          url: store_api.expense_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [STORE_EXPENSE_TAG],
      }),
    }),
  });

export const {
  useGetStoreExpenseQuery,
  useGetStoreExpenseCategoryQuery,
  useAddStoreExpenseMutation,
} = storeExpenseApi;
