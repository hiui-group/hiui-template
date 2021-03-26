import axiosInstance, { axios } from "./axios";
import jsonp, { jsonpType } from "./jsonp";
import download, { downloadType } from "./download";
import upload, { uploadType } from "./upload";
import type {
  HiRequestOptions,
  HiRequestMethod,
  HiRequestStaticAxios,
  HiRequestBaseStatic,
} from "./type";

// Mixed Request
const InternalRequest = (options: HiRequestOptions, host?: string) => {
  const { url: urlOption, type = "basics", responseType = "json" } = options;
  const url = host ? host + urlOption : urlOption;

  const _options = Object.assign({}, options, { url, responseType });

  switch (type) {
    case "jsonp":
      return jsonp(_options);
    case "download":
      return download(_options);
    case "upload":
      return upload(_options);
    default:
      return axiosInstance(_options);
  }
};

export interface HiRequestStatic extends HiRequestBaseStatic {
  upload?: uploadType;
  download?: downloadType;
  jsonp?: jsonpType;
}

// @ts-ignore
const HiRequest: HiRequestStatic = (options: HiRequestOptions, host?: string) =>
  InternalRequest(options, host);

// 请求语法糖： HiRequest.get HiRequest.post ……
const AXIOS_METHODS: HiRequestMethod[] = [
  "get",
  "post",
  "delete",
  "put",
  "patch",
  "head",
  "options",
];

AXIOS_METHODS.forEach((method) => {
  // @ts-ignore
  HiRequest[method] = (url: string, options?: HiRequestOptions) =>
    HiRequest({ ...options, method, url });
});

// 扩展的 axios 静态方法：cancels、all\spread
const AXIOS_REST_STATIC: HiRequestStaticAxios[] = [
  "CancelToken",
  "Cancel",
  "isCancel",
  "all",
  "spread",
];

AXIOS_REST_STATIC.forEach((type) => {
  // @ts-ignore
  HiRequest[type] = axios[type];
});

// jsonp
HiRequest.jsonp = jsonp;

// download
HiRequest.download = download;

// upload
HiRequest.upload = upload;

export default HiRequest;
