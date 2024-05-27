import { store_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

// Provider
export interface IStoreCustomer {
  fio: string;
  telefon: string;
}

// get
interface IStoreCustomerResItem extends IStoreCustomer {
  id: string;
  balans: string;
}

interface IStoreCustomerRes extends IApiRes {
  data: IStoreCustomerResItem[];
}

interface IStoreCustomerItemRes extends IApiRes {
  data: IStoreCustomerResItem;
}

// add
interface IStoreCustomerAdd extends IStoreCustomer {}
interface IStoreCustomerUpdate {
  body: IStoreCustomer;
  customerId: string;
}

const STORE_CUSTOMER_TAG = "STORE_CUSTOMER";

export const storeCustomerApi = api
  .enhanceEndpoints({
    addTagTypes: [STORE_CUSTOMER_TAG],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getStoreCustomer: build.query<IStoreCustomerRes, void>({
        query: () => store_api.customer_get,
        providesTags: [STORE_CUSTOMER_TAG],
      }),
      // show
      getStoreCustomerById: build.query<IStoreCustomerItemRes, string>({
        query: (custumerId) => store_api.customer_get_by_id(custumerId),
        providesTags: [STORE_CUSTOMER_TAG],
      }),
      // add
      addStoreCustomer: build.mutation<IApiRes, IStoreCustomerAdd>({
        query: (body) => ({
          url: store_api.customer_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [STORE_CUSTOMER_TAG],
      }),
      // put
      putStoreCustomer: build.mutation<IApiRes, IStoreCustomerUpdate>({
        query: ({ body, customerId }) => ({
          url: store_api.customer_update(customerId),
          method: "PUT",
          body,
        }),
        invalidatesTags: [STORE_CUSTOMER_TAG],
      }),
    }),
  });

export const {
  useGetStoreCustomerQuery,
  useGetStoreCustomerByIdQuery,
  useAddStoreCustomerMutation,
  usePutStoreCustomerMutation,
} = storeCustomerApi;
