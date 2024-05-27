import { store_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";
import { STORE_ORDER_PROCESS_TAG } from "../orderProcess/storeOrderProcess";

// Order
export interface IStoreOrderResProduct {
  id: string;
  product_name: string;
  article: string;
  massa: string;
  price: string;
  summa: string;
  status: string;
  tayyorlandi: string;
}
interface IStoreOrderResItem {
  id: string;
  client: string;
  sana: string;
  sotuvchi: string;
  sotuvchi_telefon: string;
  jami: number;
  agent: string;
  status: string;
  vaqt: string;
  product_list: IStoreOrderResProduct[];
}

interface IStoreOrderRes extends IApiRes {
  data: IStoreOrderResItem[];
}

// Confirm
export interface IStoreOrderConfirmResProduct {
  item_id: string;
  product_id: string | null;
  product_name: string | null;
  article: string | null;
  massa: string;
  bonus: string;
  price: string;
  summa: string;
  status: string;
  tayyorlandi: string;
}
export interface IStoreOrderConfirmResItem {
  id: string;
  client: string;
  sana: string;
  sotuvchi: string;
  sotuvchi_telefon: string;
  jami: number;
  agent: string;
  yuklovchi: string;
  dostavchik: string;
  dostavka_id: string | null;
  dostavchik_telefon: string | null;
  status: string;
  vaqt: string;
  izoh: string;
  product_list: IStoreOrderConfirmResProduct[];
}

export interface IStoreOrderConfirmOneRes extends IApiRes {
  data: IStoreOrderConfirmResItem;
}

interface IStoreOrderConfirmRes extends IApiRes {
  data: IStoreOrderConfirmResItem[];
}

const STORE_ORDER_TAG = "STORE_ORDER";

export const storeOrderApi = api
  .enhanceEndpoints({
    addTagTypes: [STORE_ORDER_TAG, STORE_ORDER_PROCESS_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getStoreOrder: build.query<IStoreOrderRes, void>({
        query: () => store_api.order_from_sales_get,
        providesTags: [STORE_ORDER_TAG],
      }),

      // index confirmed
      getStoreOrderConfirmed: build.query<IStoreOrderConfirmRes, void>({
        query: () => store_api.order_from_sales_confirmed_get,
        providesTags: [STORE_ORDER_TAG],
      }),
      // show confirmed
      getStoreOrderConfirmedByOne: build.query<
        IStoreOrderConfirmOneRes,
        { orderId: string }
      >({
        query: ({ orderId }) => store_api.order_from_sales_get_by_id(orderId),
        providesTags: [STORE_ORDER_TAG, STORE_ORDER_PROCESS_TAG],
      }),
      // put
      putStoreOrderConfirm: build.mutation<IApiRes, { orderId: string }>({
        query: ({ orderId }) => ({
          url: store_api.order_from_sales_confirm_put(orderId),
          method: "PUT",
        }),
        invalidatesTags: [STORE_ORDER_TAG],
      }),
    }),
  });

export const {
  useGetStoreOrderQuery,
  useGetStoreOrderConfirmedQuery,
  useGetStoreOrderConfirmedByOneQuery,
  usePutStoreOrderConfirmMutation,
} = storeOrderApi;
