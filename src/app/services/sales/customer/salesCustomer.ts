import { sales_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

const SALES_CUSTOMER_TAG = "SALES_CUSTOMER";

interface ISalesCustomer {
  id: string;
  fio: string;
  korxona: string;
  balans: string;
  telefon: string;
  manzil: string;
  lokatsiya: string;
  latitude: string;
  registertime: string;
  viloyat: string;
  tuman: string;
  category_id: string;
  dostavka_id: string;
  viloyat_id: string;
  tuman_id: string;
}

interface ISalesCustomerRes extends IApiRes {
  data: ISalesCustomer[];
}
// Get Category
interface ISalesCustomerCategoryItem {
  id: string;
  name: string;
}

interface ISalesCustomerCategoryRes extends IApiRes {
  data: ISalesCustomerCategoryItem[];
}

// Add
export interface ISalesCustomerAdd {
  fio: string;
  telefon: string;
  telefon2: string;
  telefon3: string;
  korxona: string;
  manzil: string;
  lokatsiya: string;
  latitude: string;
  longitude: string;
  viloyat_id: string;
  tuman_id: string;
  category_id: string;
}

export const salesCustomerApi = api
  .enhanceEndpoints({
    addTagTypes: [SALES_CUSTOMER_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getSalesCustomer: build.query<ISalesCustomerRes, void>({
        query: () => sales_api.customer_get,
        providesTags: [SALES_CUSTOMER_TAG],
      }),
      // category index
      getSalesCustomerCategory: build.query<ISalesCustomerCategoryRes, void>({
        query: () => sales_api.customer_category_get,
      }),
      // edit
      // add
      addSalesCustomer: build.mutation<IApiRes, ISalesCustomerAdd>({
        query: (body) => ({
          url: sales_api.customer_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [SALES_CUSTOMER_TAG],
      }),
    }),
  });

export const { useGetSalesCustomerQuery, useGetSalesCustomerCategoryQuery, useAddSalesCustomerMutation } =
  salesCustomerApi;
