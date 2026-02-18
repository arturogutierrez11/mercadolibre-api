import { Controller, Get, Param } from '@nestjs/common';
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

📌 Incluye todas las categorías raíz y sus subcategorías anidadas.
    `,
  })
  @ApiOkResponse({
    description: 'Árbol de categorías',
  })
  getTree() {
    return this.service.getTree();
  }

  @Get(':id/branch')
  @ApiOperation({
    summary: 'Obtiene la rama completa desde una categoría',
    description: `
Devuelve la categoría solicitada junto con todas sus subcategorías anidadas.
    `,
  })
  @ApiOkResponse({
    description: 'Rama completa de la categoría',
    schema: {
      example: {
        id: 'MLA9304',
        name: 'Souvenirs, Cotillón y Fiestas',
        children: [
          {
            id: 'MLA24673',
            name: 'Cotillón',
            children: [],
          },
        ],
      },
    },
  })
  getBranch(@Param('id') id: string) {
    return this.service.getBranchById(id);
  }
}
