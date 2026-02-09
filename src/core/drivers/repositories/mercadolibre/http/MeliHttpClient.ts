import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Injectable } from '@nestjs/common';
import { GetValidMeliAccessTokenInteractor } from 'src/core/interactors/GetValidMeliAccessTokenInteractor';
import { MeliHttpErrorHandler } from './error/meliHttpError';

@Injectable()
export class MeliHttpClient {
  private readonly client: AxiosInstance;

  constructor(private readonly getToken: GetValidMeliAccessTokenInteractor) {
    this.client = axios.create({
      baseURL: 'https://api.mercadolibre.com',
      timeout: 5000,
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T | null> {
    try {
      const token = await this.getToken.execute();

      const response = await this.client.get<T>(url, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(config?.headers ?? {}),
        },
      });

      return response.data;
    } catch (error) {
      return MeliHttpErrorHandler.handle(error);
    }
  }

  async post<T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T | null> {
    try {
      const token = await this.getToken.execute();

      const response = await this.client.post<T>(url, body, {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
          ...(config?.headers ?? {}),
        },
      });

      return response.data;
    } catch (error) {
      return MeliHttpErrorHandler.handle(error);
    }
  }
}
