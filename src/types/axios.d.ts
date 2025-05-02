import "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

declare module "axiosClient" {
  interface AxiosError<T = any, D = any> extends Error {
    config: AxiosRequestConfig<D>;
    code?: string;
    request?: any;
    response?: AxiosResponse<T & { message?: string }, D>;
    isAxiosError: boolean;
    message: string;
    customCode?: number;
  }
}

declare module "axiosServer" {
  interface AxiosError<T = any, D = any> extends Error {
    config: AxiosRequestConfig<D>;
    code?: string;
    request?: any;
    response?: AxiosResponse<T & { message?: string }, D>;
    isAxiosError: boolean;
    message: string;
    customCode?: number;
  }
}
