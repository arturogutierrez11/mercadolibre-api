import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Injectable } from '@nestjs/common';
import { IMadreHttpClient } from 'src/core/adapters/repositories/madre/http/IMadreHttpClient';
import { MadreConfig } from '../config/MadreConfig';

@Injectable()
export class MadreHttpClient implements IMadreHttpClient {
  private readonly client: AxiosInstance;

  constructor() {
    if (!MadreConfig.api.baseUrl) {
      throw new Error('MADRE_API_BASE_URL is not defined');
    }

    if (!MadreConfig.api.internalApiKey) {
      throw new Error('MADRE_INTERNAL_API_KEY is not defined');
    }

    this.client = axios.create({
      baseURL: MadreConfig.api.baseUrl,
      timeout: MadreConfig.api.timeout,
      headers: {
        'Content-Type': 'application/json',
        'x-internal-api-key': MadreConfig.api.internalApiKey,
      },
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post<T>(url, body, config);
    return response.data;
  }

  async put<T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.put<T>(url, body, config);
    return response.data;
  }
}
