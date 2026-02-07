import { OrderEntity } from 'src/core/entitis/mercadolibre/orders/OrderEntity';

export class MeliOrderMapper {
  static toEntity(raw: any): OrderEntity {
    return {
      id: raw.id,
      status: raw.status,
      dateCreated: raw.date_created,
      dateClosed: raw.date_closed,
      totalAmount: raw.total_amount,
      currencyId: raw.currency_id,
      items: (raw.order_items ?? []).map((oi: any) => ({
        itemId: oi.item?.id,
        title: oi.item?.title,
        quantity: oi.quantity,
        unitPrice: oi.unit_price,
      })),
    };
  }
}
