import { Module } from '@nestjs/common';
import { GetMeliTokenService } from 'src/app/services/token/GetMeliTokenService';
import { InternalApiKeyGuard } from 'src/app/guards/InternalApiKeyGuard';
import { GetMeliTokenController } from 'src/app/controllers/token/GetMeliToken.Controller';

@Module({
  controllers: [GetMeliTokenController],
  providers: [GetMeliTokenService, InternalApiKeyGuard],
})
export class GetMeliTokenModule {}
