import { Inject, Injectable } from '@nestjs/common';
import type {
  GetOrdersParams,
  IGetOrdersRepository,
  OrdersPage,
} from 'src/core/adapters/repositories/mercadolibre/orders/IGetOrdersRepository';

@Injectable()
export class GetOrdersService {
  constructor(
    @Inject('IGetOrdersRepository')
    private readonly ordersRepo: IGetOrdersRepository,
  ) {}

  getOrders(params: GetOrdersParams): Promise<OrdersPage> {
    return this.ordersRepo.getOrders(params);
  }
}
