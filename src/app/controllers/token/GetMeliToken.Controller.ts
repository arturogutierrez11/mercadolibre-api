import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiSecurity,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GetMeliTokenService } from 'src/app/services/token/GetMeliTokenService';
import { InternalApiKeyGuard } from 'src/app/guards/InternalApiKeyGuard';

@ApiTags('MercadoLibre - Internal')
@ApiSecurity('x-internal-api-key')
@Controller('api/internal/mercadolibre')
@UseGuards(InternalApiKeyGuard)
export class GetMeliTokenController {
  constructor(private readonly service: GetMeliTokenService) {}

  @Get('token')
  @ApiOperation({
    summary: 'Devuelve el token actual de MercadoLibre almacenado en DB',
    description: `
⚠️ **Endpoint interno**
- No refresca el token
- No valida expiración
- Devuelve exactamente lo persistido en base de datos
    `,
  })
  @ApiOkResponse({
    description: 'Token actual de MercadoLibre',
    schema: {
      example: {
        id: 1,
        access_token: 'APP_USR-...',
        refresh_token: 'TG-...',
        token_type: null,
        scope: null,
        expires_in: 21600,
        expires_at: '2026-02-06T20:04:53.000Z',
        created_at: '2026-02-05T16:11:01.000Z',
        updated_at: '2026-02-06T14:04:53.000Z',
      },
    },
  })
  async getToken() {
    return this.service.getToken();
  }
}
