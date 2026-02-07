import { Global, Module } from '@nestjs/common';
import { MadreHttpModule } from '../madre/http/madre-http.module';
import { GetValidMeliAccessTokenInteractor } from 'src/core/interactors/token/GetValidMeliAccessTokenInteractor';
import { MeliAuthRepository } from 'src/core/drivers/repositories/mercadolibre/auth/MeliAuthRepository';
import { MeliTokenRepository } from 'src/core/drivers/repositories/madre/mercadolibre/token/MeliTokenRepository';

@Global()
@Module({
  imports: [MadreHttpModule],
  providers: [
    GetValidMeliAccessTokenInteractor,
    {
      provide: 'IMeliAuthRepository',
      useClass: MeliAuthRepository,
    },
    {
      provide: 'IMadreMeliTokenRepository',
      useClass: MeliTokenRepository,
    },
  ],
  exports: [GetValidMeliAccessTokenInteractor, 'IMadreMeliTokenRepository'],
})
export class MeliAuthModule {}
