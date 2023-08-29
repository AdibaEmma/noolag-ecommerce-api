import {METHODS} from '@app/enums';
import {HttpService} from '@nestjs/axios';
import {Injectable, Logger} from '@nestjs/common';

@Injectable()
export class RequestService {
  constructor(
    private readonly httpRequest: HttpService,
    private readonly logger: Logger,
  ) {}

  public async request({
    method,
    url,
    params,
    data,
    headers,
  }: {
    method: keyof typeof METHODS;
    url: string;
    params?: Record<string, any>;
    data?: Record<string, any>;
    headers?: Record<string, any>;
  }) {
    try {
      const {data: result} = await this.httpRequest.request({method, url, params, data, headers}).toPromise();

      return result;
    } catch (error) {
      return error?.response?.data || error;
    }
  }
}
