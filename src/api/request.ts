import { APIData } from './api';

interface RequestOptions<TParams, TResult> {
  path: string;
  method: string;
}

interface SuccessfulRequestResponse<TResult> {
  success: true;
  result: TResult;
}

interface FailedRequestResponse {
  success: false;
  error: string;
}

type RequestResponse<TResult> = SuccessfulRequestResponse<TResult> | FailedRequestResponse;

type APIRequest<TParams, TResult> = (api: APIData, params: TParams) => Promise<RequestResponse<TResult>>;

type GetRequestResult<T> = T extends APIRequest<any, infer Result> ? Result : never;
type GetRequestParams<T> = T extends APIRequest<infer Params, any> ? Params : never;
type GetRequestResponse<T> = T extends APIRequest<any, infer Result>
  ? SuccessfulRequestResponse<Result> | FailedRequestResponse
  : never;

function createRequest<TParams, TResult>(options: RequestOptions<TParams, TResult>): APIRequest<TParams, TResult> {
  return async (api: APIData, params: TParams) => {
    try {
      const requestInit: any = {
        method: options.method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      if (api.token != null && api.token != 'undefined' && api.token != 'null')
        requestInit.headers['Token'] = api.token;
      if (options.method != 'GET' && options.method != 'HEAD') requestInit.body = JSON.stringify(params);

      const req = await fetch(`${api.url}${options.path}`, requestInit);

      return await req.json();
    } catch (error) {
      return { success: false, error: 'Network Error' };
    }
  };
}

export { APIData, createRequest, APIRequest, RequestResponse, GetRequestResult, GetRequestParams, GetRequestResponse };
