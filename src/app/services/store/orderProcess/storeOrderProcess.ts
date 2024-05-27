import { store_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";
import { IStoreOrderConfirmResProduct } from "../order/storeOrder";

interface IClient {
  id: string;
  fio: string;
  telefon: string;
  telefon2: string;
  telefon3: string;
  korxona: string;
  balans: string;
  rasm: string;
  manzil: string;
  lokatsiya: string;
  latitude: string;
  longitude: string;
  vaqt: string;
  viloyat_id: string;
  tuman_id: string;
  yaqin_muddat: string;
  category_id: string;
  dostavka_id: string;
}

interface IStoreOrderItem {
  id: string;
  client: IClient;
  sana: string;
  izoh: string;
  all_summa: string;
  sotuvchi: string;
  agent: string;
  yuklovchi: string;
  dostavchik: string;
  dostavka_id: string;
  dostavchik_telefon: null;
  status: string;
  vaqt: string;
  old_client_balans: string;
  print: boolean;
  printed_status: boolean;
  after_balans: number;
  product_list: IStoreOrderConfirmResProduct[];
  jami_tayyorlandi: number;
}

interface IStoreOrderRes extends IApiRes {
  data: IStoreOrderItem[];
}

export interface IStoreOrderProcessAdd {
  order_id: number | string;
  order_item_id: number | string;
  massa: number | string;
  bonus: number | string;
  isEnd: number /*doim 0*/;
  isEndOrder: number /*doim 0*/;
}

interface IStoreOrderProcessEnd {
  order_id: string;
}

export const STORE_ORDER_PROCESS_TAG = "STORE_ORDER_PROCESS";

export const storeOrderProcessApi = api
  .enhanceEndpoints({
    addTagTypes: [STORE_ORDER_PROCESS_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getStoreOrderProcess: build.query<IStoreOrderRes, void>({
        query: () => store_api.order_completed_get,
        providesTags: [STORE_ORDER_PROCESS_TAG],
      }),
      // post
      addStoreOrderProcess: build.mutation<IApiRes, IStoreOrderProcessAdd>({
        query: (body) => ({
          url: store_api.order_process_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [STORE_ORDER_PROCESS_TAG],
      }),
      // post
      addStoreOrderProcessEnd: build.mutation<IApiRes, IStoreOrderProcessEnd>({
        query: (body) => ({
          url: store_api.order_process_end,
          method: "POST",
          body,
        }),
        // invalidatesTags: [STORE_ORDER_PROCESS_TAG],
      }),
    }),
  });

export const {
  useGetStoreOrderProcessQuery,
  useAddStoreOrderProcessMutation,
  useAddStoreOrderProcessEndMutation,
} = storeOrderProcessApi;
