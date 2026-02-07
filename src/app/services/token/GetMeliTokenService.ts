import { Inject, Injectable } from '@nestjs/common';
import type { IMadreMeliTokenRepository } from 'src/core/adapters/repositories/madre/mercadolibre/token/IMadreMeliTokenRepository';
import { MeliToken } from 'src/core/entitis/madre/mercadolibre/token/MeliToken';

@Injectable()
export class GetMeliTokenService {
  constructor(
    @Inject('IMadreMeliTokenRepository')
    private readonly tokenRepo: IMadreMeliTokenRepository,
  ) {}

  async getToken(): Promise<MeliToken | null> {
    return this.tokenRepo.getToken();
  }
}
