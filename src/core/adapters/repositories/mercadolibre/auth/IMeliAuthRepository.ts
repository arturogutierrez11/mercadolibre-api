import { MeliToken } from 'src/core/entitis/madre/mercadolibre/token/MeliToken';

export interface IMeliAuthRepository {
  refreshToken(refreshToken: string): Promise<MeliToken>;
}
