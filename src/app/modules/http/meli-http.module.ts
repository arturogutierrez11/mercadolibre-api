import { Global, Module } from '@nestjs/common';
import { MeliAuthModule } from '../token/meli-auth.module';
import { MeliHttpClient } from 'src/core/drivers/repositories/mercadolibre/http/MeliHttpClient';

@Global()
@Module({
  imports: [MeliAuthModule],
  providers: [
    MeliHttpClient,
    {
      provide: 'IMeliHttpClient',
      useExisting: MeliHttpClient,
    },
  ],
  exports: ['IMeliHttpClient'],
})
export class MeliHttpModule {}
