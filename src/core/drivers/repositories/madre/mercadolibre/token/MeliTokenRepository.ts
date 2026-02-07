import { Inject, Injectable } from '@nestjs/common';
import type { IMadreHttpClient } from 'src/core/adapters/repositories/madre/http/IMadreHttpClient';
import { IMadreMeliTokenRepository } from 'src/core/adapters/repositories/madre/mercadolibre/token/IMadreMeliTokenRepository';
import { MeliToken } from 'src/core/entitis/madre/mercadolibre/token/MeliToken';

@Injectable()
export class MeliTokenRepository implements IMadreMeliTokenRepository {
  private readonly basePath = '/internal/mercadolibre/token';

  constructor(
    @Inject('IMadreHttpClient')
    private readonly httpClient: IMadreHttpClient,
  ) {}

  async getToken(): Promise<MeliToken | null> {
    try {
      return await this.httpClient.get<MeliToken>(this.basePath);
    } catch (error: any) {
      if (error?.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async saveToken(token: MeliToken): Promise<void> {
    await this.httpClient.post(this.basePath, token);
  }

  async updateToken(token: MeliToken): Promise<void> {
    // 🔥 madre-api hace UPSERT con POST
    await this.httpClient.post(this.basePath, token);
  }
}
