import { store_api } from "../../../../constants/api";
import { IApiRes, IDate } from "../../../../types/api";
import { api } from "../../api";
// import { STORE_ORDER_PROCESS_TAG } from "../orderProcess/storeOrderProcess";

const STORE_SALARY_TAG = "STORE_SALARY_TAG";

// params
interface IStoreSalaryResParams {
    date: IDate;
    worker_id: string
}

export interface IStoreSalaryResWorkerItem {
    bank: string,
    id: string,
    izoh: string,
    karta: string,
    naqdsum: string,
    naqdusd: string,
    summa: string,
    valyuta: string,
    vaqt: string,
    worker: string,
    worker_id: string
}

export interface IStoreSalaryAdd {
    worker_id: string,
    bank: string,
    karta: string,
    naqdsum: string,
    naqdusd: string,
    izoh: string,
    valyuta: string,
}

interface IStoreWorkerRes extends IApiRes {
    data: [{
        id: string,
        fio: string,
        telefon: string
    }]
}

interface IStoreSalaryRes extends IApiRes {
    data: {
        jamibank: number,
        jamikarta: number,
        jaminaqd: number,
        jamiusd: number,
        list: IStoreSalaryResWorkerItem[]
    }

}


export const storeDebtApi = api
    .enhanceEndpoints({ addTagTypes: [STORE_SALARY_TAG] })
    .injectEndpoints({
        endpoints: (build) => ({
            // Index
            getReportSalary: build.query<IStoreSalaryRes, IStoreSalaryResParams>({
                query: ({ date, worker_id }) => store_api.salary_report_get(date, worker_id),
                providesTags: [STORE_SALARY_TAG],
            }),
            // worker get 
            getStoreWorker: build.query<IStoreWorkerRes, void>({
                query: () => store_api.worker_get,
                providesTags: [STORE_SALARY_TAG],
            }),
            // post
            addStoreSalary: build.mutation<IApiRes, IStoreSalaryAdd>({
                query: (body) => ({
                    url: store_api.salary_add,
                    method: "POST",
                    body,
                }),
                invalidatesTags: [STORE_SALARY_TAG],
            }),
        }),
    });

export const { useGetReportSalaryQuery, useAddStoreSalaryMutation, useGetStoreWorkerQuery } = storeDebtApi;