import { store_api } from "../../../../constants/api";
import { IApiRes } from "../../../../types/api";
import { api } from "../../api";

const STORE_REPORTS_PROVIDER_TAG = "STORE_REPORTS_PROVIDER";

// index
export interface IStoreReportProviderResItem {
  id: string;
  summa: string;
  naqdsum: string;
  naqdusd: string;
  valyuta: string;
  bank: string;
  karta: string;
  izoh: string;
  taminotchi: string;
  taminotchi_id: number;
  status: string;
  vaqt: string;
}

export interface IStoreReportProviderAdd {
  taminotchi_id: number,
  naqdsum: number,
  naqdusd: number,
  valyuta: number,
  bank: number,
  karta: number,
  izoh: string
}

export interface IStoreReportProviderConfirmSms {
  taminotchi_id: number,
  code: number|''
}

interface IStoreReportProviderRes extends IApiRes {
  data: IStoreReportProviderResItem[];
}

export const storeReportsProviderApi = api
  .enhanceEndpoints({ addTagTypes: [STORE_REPORTS_PROVIDER_TAG] })
  .injectEndpoints({
    endpoints: (build) => ({
      // index
      getStoreReportProvider: build.query<IStoreReportProviderRes, void>({
        query: () => store_api.report_provider_get,
        providesTags: [STORE_REPORTS_PROVIDER_TAG],
      }),

      // add
      addStoreReportProvider: build.mutation<IApiRes, IStoreReportProviderAdd>({
        query: (body) => ({
          url: store_api.report_provider_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [STORE_REPORTS_PROVIDER_TAG],
      }),

      // check sms 
      addSmsStoreReportProvider: build.mutation<IApiRes, IStoreReportProviderConfirmSms>({
        query: (body) => ({
          url: store_api.report_provider_confirm_sms_add,
          method: "POST",
          body,
        }),
        invalidatesTags: [STORE_REPORTS_PROVIDER_TAG],
      }),
    }),
  });

export const { 
  useGetStoreReportProviderQuery,
  useAddStoreReportProviderMutation,
  useAddSmsStoreReportProviderMutation
} = storeReportsProviderApi;

// report_provider_confirm_sms_add