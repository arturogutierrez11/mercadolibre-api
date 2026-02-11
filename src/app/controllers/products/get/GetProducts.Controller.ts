import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { GetProductsService } from 'src/app/services/products/get/GetProductsService';
import type { MeliProductStatus } from 'src/core/drivers/repositories/mercadolibre/products/get/GetProductsRepository';

@ApiTags('MercadoLibre - Products')
@Controller('mercadolibre/products')
export class GetProductsController {
  constructor(private readonly service: GetProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtiene los Item IDs del seller autenticado',
    description: `
Devuelve las publicaciones del seller autenticado en MercadoLibre, normalizadas y paginadas.

---

### 🔎 Características

- 📌 Por defecto devuelve publicaciones **active**
- 📦 Paginación con \`offset\` y \`limit\`
- 🔥 MercadoLibre no permite \`offset > 1000\`
- 🧠 Internamente el sistema puede cambiar automáticamente a modo **SCAN** si el offset supera el límite permitido

---

### ⚠️ Nota importante

MercadoLibre limita la paginación clásica (offset) a los primeros 1000 registros.
Para sincronizaciones masivas se utiliza internamente \`search_type=scan\`.

Este endpoint mantiene una interfaz estable para el cliente.
`,
  })

  // 🔵 STATUS
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['active', 'paused', 'closed'],
    description: 'Estado de las publicaciones del seller',
    example: 'active',
  })

  // 🔵 OFFSET
  @ApiQuery({
    name: 'offset',
    required: false,
    description:
      'Offset de paginación (desde qué registro comenzar). MercadoLibre permite hasta 1000 en modo clásico.',
    example: 0,
  })

  // 🔵 LIMIT
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Cantidad de resultados por página',
    example: 50,
  })

  // ✅ RESPUESTA OK
  @ApiOkResponse({
    description: 'Listado paginado de publicaciones',
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

  // ❌ ERRORES POSIBLES
  @ApiResponse({
    status: 400,
    description: 'Parámetros inválidos (limit u offset incorrectos)',
  })
  @ApiResponse({
    status: 401,
    description: 'Token de MercadoLibre inválido o expirado',
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno al consultar MercadoLibre',
  })
  async getProducts(
    @Query('status') status: MeliProductStatus = 'active',
    @Query('offset') offset = 0,
    @Query('limit') limit = 50,
  ) {
    return this.service.getProducts(status, Number(offset), Number(limit));
  }
}
