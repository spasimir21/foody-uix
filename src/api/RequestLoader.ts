import { APIData, APIRequest, GetRequestParams, GetRequestResponse, GetRequestResult } from './request';
import { Loader } from '../helpers/Loader';
import { State } from '@uixjs/reactivity';

class RequestLoader<TRequest extends APIRequest<any, any>> extends Loader<
  GetRequestParams<TRequest>,
  GetRequestResponse<TRequest>
> {
  @State
  success: boolean = false;
  @State
  error: string | null = null;

  public readonly request: TRequest = null as any;

  constructor(public readonly api: APIData) {
    super();
  }

  protected override async load(input: GetRequestParams<TRequest>, isAborted: () => boolean) {
    if (isAborted()) return null;
    return (await this.request(this.api, input)) as any;
  }

  protected override onResult(result: GetRequestResponse<TRequest>): void {
    this.success = result.success;

    if (!result.success) {
      this.error = result.error;
      return;
    }

    this.error = null;
    this.onSuccessfulLoad(result.result);
  }

  protected onSuccessfulLoad(result: GetRequestResult<TRequest>): void {}
}

export { RequestLoader };
