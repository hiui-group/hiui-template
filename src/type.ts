import type {
  AxiosRequestConfig,
  AxiosResponse,
  CancelStatic,
  CancelTokenStatic,
  AxiosPromise,
} from "axios";

export interface HiRequestCallbackHooks {
  beforeResponse?: (config: AxiosRequestConfig) => any;
  errorResponse?: <T = any>(response: AxiosResponse<T>) => void;
  beforeRequest?: (config: AxiosRequestConfig) => any;
  errorRequest?: (error: any) => any;
  errorCallback?: (error: any) => void;
}

export type HiRequestConfig = HiRequestCallbackHooks & AxiosRequestConfig;

export type HiRequestMethod =
  | "get"
  | "post"
  | "delete"
  | "put"
  | "patch"
  | "head"
  | "options";

export type { AxiosResponse };

export type HiRequestStaticAxios =
  | "CancelToken"
  | "Cancel"
  | "isCancel"
  | "all"
  | "spread";
export type HiRequestType = "basics" | "jsonp" | "download" | "upload";

export type HiBaseOptions = HiRequestConfig & {
  type?: HiRequestType;
};

type HiDownloadOptions = {
  filename?: string;
  downloadSuccess?: <T>(response: AxiosResponse<T>) => void;
  downloadFail?: <T>(response: AxiosResponse<T>) => void;
};

type HiJsonpOptions = {
  timeout?: number;
  charset?: string;
  jsonpCallback?: string;
  jsonpCallbackFunction?: string;
};

type HiUploadOptions = {
  name?: string;
  file?: string | Blob;
};

export type HiRequestOptions = HiBaseOptions &
  HiDownloadOptions &
  HiJsonpOptions &
  HiUploadOptions;

export interface HiRequestInstance {
  (options: HiRequestOptions): AxiosPromise;
  (url: string, options?: HiRequestOptions): AxiosPromise;
  get<T = any, R = AxiosResponse<T>>(
    url: string,
    options?: HiRequestOptions
  ): Promise<R>;
  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    options?: HiRequestOptions
  ): Promise<R>;
  head<T = any, R = AxiosResponse<T>>(
    url: string,
    options?: HiRequestOptions
  ): Promise<R>;
  options<T = any, R = AxiosResponse<T>>(
    url: string,
    options?: HiRequestOptions
  ): Promise<R>;
  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    options?: HiRequestOptions
  ): Promise<R>;
  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    options?: HiRequestOptions
  ): Promise<R>;
  patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    options?: HiRequestOptions
  ): Promise<R>;
}

export interface HiRequestBaseStatic extends HiRequestInstance {
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  isCancel(value: any): boolean;
  all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
}
