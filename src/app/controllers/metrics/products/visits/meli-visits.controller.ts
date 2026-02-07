import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiParam,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MeliVisitsService } from 'src/app/services/metrics/products/visits/meli-visitsService';

@ApiTags('MercadoLibre - Metrics')
@Controller('meli/items')
export class MeliVisitsController {
  constructor(private readonly service: MeliVisitsService) {}

  @Get(':itemId/visits')
  @ApiOperation({
    summary: 'Obtiene visitas totales recientes de un item de MercadoLibre',
    description: `
Devuelve un **snapshot de visitas totales** del producto usando
el endpoint oficial de MercadoLibre:

\`GET /visits/items?ids=:itemId\`

📌 **Notas**
- No devuelve series temporales.
- No acepta rangos de fechas.
- MercadoLibre retorna solo el total acumulado.
- El item debe pertenecer al seller autenticado.
    `,
  })
  @ApiParam({
    name: 'itemId',
    description: 'ID del item de MercadoLibre',
    example: 'MLA1757293732',
  })
  @ApiOkResponse({
    description: 'Visitas totales del producto',
    schema: {
      example: {
        item_id: 'MLA1757293732',
        total: 49,
        visits: [],
      },
    },
  })
  getVisits(@Param('itemId') itemId: string) {
    return this.service.getProductVisits(itemId);
  }
}
