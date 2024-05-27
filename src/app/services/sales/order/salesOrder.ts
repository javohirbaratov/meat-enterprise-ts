import { sales_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

const SALES_ORDER_TAG = "SALES_ORDER";

interface ISalesOrderItemCustomer {
  id: string;
  fio: string;
  telefon: string;
  telefon2: string;
  telefon3: string;
  korxona: string;
  balans: string;
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

export interface ISalesOrderItemProduct {
  id: string;
  product_name: string;
  article: string;
  massa: string;
  price: string;
  summa: string;
  status: string;
  tayyorlandi: string;
}

export interface ISalesOrderItem {
  id: string;
  client: ISalesOrderItemCustomer;
  sana: string;
  izoh: string;
  all_summa: string;
  sotuvchi: string;
  agent: string;
  yuklovchi: string;
  dostavchik: string;
  dostavka_id: string;
  dostavchik_telefon: string;
  status: string;
  vaqt: string;
  old_client_balans: string;
  product_list: ISalesOrderItemProduct[];
  printed_status: string;
  after_balans: string;
  jami: number;
}

interface ISalesOrderRes extends IApiRes {
  data: ISalesOrderItem[];
}

export interface ISalesAddOrderProduct {
  product_id: string;
  aritcle: string;
  massa: number | null;
  price: number | null;
}

export interface ISalesAddOrder {
  client_id: string | null;
  product_list: ISalesAddOrderProduct[];
  summa: number;
  naqd: number | "";
  naqdusd: number | "";
  valyuta: number | "";
  plastik: number | "";
  karta: number | "";
  izoh: string;
  // xolodelnik: boolean;
}

// End
interface ISalesAddOrderEnd {
  order_id: string;
}

export const salesOrderApi = api
  .enhanceEndpoints({ addTagTypes: [SALES_ORDER_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getSalesOrder: build.query<ISalesOrderRes, void>({
        query: () => sales_api.order_get,
        providesTags: [SALES_ORDER_TAG],
      }),

      addSalesOrder: build.mutation<IApiRes, ISalesAddOrder>({
        query: (body) => ({
          url: sales_api.order_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [SALES_ORDER_TAG],
      }),

      addSalesOrderEnd: build.mutation<IApiRes, ISalesAddOrderEnd>({
        query: (body) => ({
          url: sales_api.order_end_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [SALES_ORDER_TAG],
      }),

      //delete
      deleteSelesOrder: build.mutation<IApiRes, {orderId: string}>({
        query: ({orderId: id}) => ({
          url: sales_api.order_delete(id),
          method: "DELETE",
          
        }),
        invalidatesTags: [SALES_ORDER_TAG],
      }),
    }),
  });

export const {
  useGetSalesOrderQuery,
  useDeleteSelesOrderMutation,
  useAddSalesOrderMutation,
  useAddSalesOrderEndMutation,
} = salesOrderApi;
