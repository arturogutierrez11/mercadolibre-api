import { Global, Module } from '@nestjs/common';
import { MadreHttpClient } from 'src/core/drivers/repositories/madre/http/MadreHttpClient';

@Global()
@Module({
  providers: [
    {
      provide: 'IMadreHttpClient',
      useClass: MadreHttpClient,
    },
  ],
  exports: ['IMadreHttpClient'],
})
export class MadreHttpModule {}
