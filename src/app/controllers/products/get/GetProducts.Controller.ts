import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import { GetProductsService } from 'src/app/services/products/get/GetProductsService';
import type { MeliProductStatus } from 'src/core/drivers/repositories/mercadolibre/products/get/GetProductsRepository';

@ApiTags('MercadoLibre - Products')
@Controller('mercadolibre/products')
export class GetProductsController {
  constructor(private readonly service: GetProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtiene productos del seller autenticado en Mercado Libre',
    description: `
Devuelve las publicaciones del seller autenticado, normalizadas y paginadas.

📌 **Notas**
- Por defecto se devuelven solo publicaciones **activas**
- El paginado sigue el esquema nativo de MercadoLibre (offset / limit)
- La respuesta está normalizada y es estable (no devuelve el RAW de ML)
    `,
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['active', 'paused', 'closed'],
    description: 'Estado de las publicaciones',
    example: 'active',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    description: 'Offset de paginación (desde qué registro empezar)',
    example: 0,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Cantidad de resultados por página',
    example: 50,
  })
  @ApiOkResponse({
    description: 'Listado paginado de productos del seller',
    schema: {
      example: {
        seller_id: '1757836744',
        items: ['MLA1757293732', 'MLA1757267604', 'MLA1424202023'],
        pagination: {
          limit: 50,
          offset: 0,
          total: 346296,
          has_next: true,
        },
      },
    },
  })
  async getProducts(
    @Query('status') status: MeliProductStatus = 'active',
    @Query('offset') offset = 0,
    @Query('limit') limit = 50,
  ) {
    return this.service.getProducts(status, Number(offset), Number(limit));
  }
}
