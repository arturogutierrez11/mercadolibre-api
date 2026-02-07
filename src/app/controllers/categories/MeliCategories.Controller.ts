import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { GetCategoriesTreeService } from 'src/app/services/categories/GetCategoriesTreeService';

@ApiTags('MercadoLibre - Categories')
@Controller('meli/categories')
export class MeliCategoriesController {
  constructor(private readonly service: GetCategoriesTreeService) {}

  @Get('tree')
  @ApiOperation({
    summary: 'Obtiene el árbol completo de categorías',
    description: `
Devuelve el árbol completo de categorías de MercadoLibre para el site **MLA**.

📌 **Notas**
- Incluye todas las categorías raíz
- Cada categoría incluye sus subcategorías anidadas
- La información proviene de **/sites/MLA/categories**
    `,
  })
  @ApiOkResponse({
    description: 'Árbol de categorías',
    schema: {
      example: [
        {
          id: 'MLA5725',
          name: 'Accesorios para Vehículos',
          children: [
            {
              id: 'MLA1743',
              name: 'Repuestos Autos',
              children: [],
            },
          ],
        },
      ],
    },
  })
  getTree() {
    return this.service.getTree();
  }
}
