import jsonp from "./jsonp";
import download from "./download";
import upload from "./upload";
import axiosIns, { axios, HiRequestConfig } from "./axios";
import type { CancelStatic, CancelTokenStatic, AxiosError } from "axios";

export type HiRequestMethod =
  | "get"
  | "post"
  | "delete"
  | "put"
  | "patch"
  | "head"
  | "options";

export type HiRequestCancel = "CancelToken" | "Cancel" | "isCancel";

export type HiRequestType = "basics" | "jsonp" | "download" | "upload";
export type HiRequestOptions = HiRequestConfig & {
  type: HiRequestType;
};

const defaultOptions = {
  type: "basics",
  responseType: "json",
};

/**
 * 请求方法
 * @param options
 * @param baseUrl
 */
const InternalRequest = (options: HiRequestOptions, host?: string) => {
  const { url: urlOption, type = "basics", responseType = "json" } = options;
  const url = host ? host + urlOption : urlOption;

  const isJsonp = type === "jsonp";
  const isDownload = type === "download";
  const isUpload = type === "upload";

  if (isJsonp || isDownload) {
    return isJsonp ? jsonp(options, host) : download(options, host);
  }

  return axiosIns(
    isUpload
      ? {
          url,
          method: "post",
          responseType,
          ...upload(options).options,
        }
      : {
          url,
          type: "basics",
          responseType,
          ...options,
        }
  );
};

export type Options = {
  timeout?: number;
  jsonpCallback?: () => void;
};

const HiRequest: HiRequestStatic = InternalRequest;

// 请求语法糖： reguest.get HiRequest.post ……
const METHODS: HiRequestMethod[] = [
  "get",
  "post",
  "delete",
  "put",
  "patch",
  "head",
  "options",
];

METHODS.forEach((method) => {
  HiRequest[method] = (url: string, options?: HiRequestOptions) =>
    HiRequest({ ...options, method, url });
});

// 取消请求
const CANCEL: HiRequestCancel[] = ["CancelToken", "Cancel", "isCancel"];

CANCEL.forEach((type) => {
  HiRequest[type] = axios[type];
});

// add jsonp
HiRequest.jsonp = jsonp;

// download
HiRequest.download = download;

// upload
HiRequest.upload = (options, host) => {
  options.type = "upload";
  return HiRequest(options, host);
};

// Expose all/spread
HiRequest.all = (promises) => {
  return Promise.all(promises);
};

HiRequest.spread = (callback) => {
  return (arr) => {
    return callback.apply(null, arr);
  };
};

export interface HiRequestStatic extends AxiosInstance {
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  isCancel(value: any): boolean;
  all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
  spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
  isAxiosError(payload: any): payload is AxiosError;
}

export default HiRequest;
