export interface OrderItemEntity {
  itemId: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderEntity {
  id: number;
  status: string;
  dateCreated: string;
  dateClosed?: string;
  totalAmount: number;
  currencyId: string;
  items: OrderItemEntity[];
}
