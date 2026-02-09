import { Module } from '@nestjs/common';
import { GetProductsController } from 'src/app/controllers/products/get/GetProducts.Controller';
import { GetValidMeliAccessTokenInteractor } from 'src/core/interactors/GetValidMeliAccessTokenInteractor';
import { IMeliAuthRepository } from 'src/core/adapters/repositories/mercadolibre/auth/IMeliAuthRepository';
import { MadreHttpClient } from 'src/core/drivers/repositories/madre/http/MadreHttpClient';
import { MeliTokenRepository } from 'src/core/drivers/repositories/madre/mercadolibre/token/MeliTokenRepository';
import { MeliAuthRepository } from 'src/core/drivers/repositories/mercadolibre/auth/MeliAuthRepository';
import { MeliProductsRepository } from 'src/core/drivers/repositories/mercadolibre/products/get/GetProductsRepository';
import { IMadreMeliTokenRepository } from 'src/core/adapters/repositories/madre/mercadolibre/token/IMadreMeliTokenRepository';
import { MeliHttpClient } from 'src/core/drivers/repositories/mercadolibre/http/MeliHttpClient';
import { GetProductsService } from 'src/app/services/products/get/GetProductsService';

@Module({
  controllers: [GetProductsController],

  providers: [
    /**
     * =========================
     * HTTP CLIENTS
     * =========================
     */
    {
      provide: 'IMadreHttpClient',
      useClass: MadreHttpClient,
    },
    {
      provide: 'IMeliHttpClient',
      useClass: MeliHttpClient,
    },

    /**
     * =========================
     * REPOSITORIES
     * =========================
     */
    {
      provide: 'IMadreMeliTokenRepository',
      useClass: MeliTokenRepository,
    },
    {
      provide: 'IMeliAuthRepository',
      useClass: MeliAuthRepository,
    },
    {
      provide: 'IMeliProductsRepository',
      useClass: MeliProductsRepository,
    },

    /**
     * =========================
     * INTERACTORS
     * =========================
     */
    {
      provide: GetValidMeliAccessTokenInteractor,
      useFactory: (
        tokenRepo: IMadreMeliTokenRepository,
        authRepo: IMeliAuthRepository,
      ) => new GetValidMeliAccessTokenInteractor(tokenRepo, authRepo),
      inject: ['IMadreMeliTokenRepository', 'IMeliAuthRepository'],
    },

    /**
     * =========================
     * SERVICES
     * =========================
     */
    GetProductsService,
  ],
})
export class GetProductsModule {}
