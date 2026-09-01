import { Injectable } from '@angular/core';

import { CartItem } from './cart.service';

export type OrderStatus =
  | 'Pendiente'
  | 'Preparando'
  | 'En camino'
  | 'Entregado'
  | 'Cancelado';

export interface Order {

  id: string;

  date: string;

  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    district: string;
  };

  items: CartItem[];

  subtotal: number;

  delivery: number;

  total: number;

  paymentMethod: string;

  status: OrderStatus;
}


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly storageKey =
    'orders';


  private loadOrders(): Order[] {

    const stored =
      localStorage.getItem(
        this.storageKey
      );

    if (!stored) {
      return [];
    }

    try {

      const orders =
        JSON.parse(stored);

      return Array.isArray(orders)
        ? orders
        : [];

    } catch {

      return [];

    }

  }


  private saveOrders(
    orders: Order[]
  ): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(orders)
    );

  }


  getOrders(): Order[] {

    return this.loadOrders();

  }


  getOrder(
    id: string
  ): Order | undefined {

    return this.getOrders()
      .find(order =>
        order.id === id
      );

  }


  createOrder(data: {

    customer: Order['customer'];

    items: CartItem[];

    subtotal: number;

    delivery: number;

    total: number;

    paymentMethod: string;

  }): Order {

    const orders =
      this.getOrders();

    const order: Order = {

      id: this.generateOrderId(
        orders.length + 1
      ),

      date:
        new Date().toISOString(),

      customer:
        data.customer,

      items:
        data.items.map(item => ({
          ...item
        })),

      subtotal:
        data.subtotal,

      delivery:
        data.delivery,

      total:
        data.total,

      paymentMethod:
        data.paymentMethod,

      status:
        'Pendiente'

    };


    orders.unshift(order);

    this.saveOrders(orders);

    return order;

  }


  updateStatus(
    id: string,
    status: OrderStatus
  ): boolean {

    const orders =
      this.getOrders();

    const order =
      orders.find(item =>
        item.id === id
      );

    if (!order) {
      return false;
    }

    order.status = status;

    this.saveOrders(orders);

    return true;

  }


  private generateOrderId(
    number: number
  ): string {

    return `FG-${String(number).padStart(5, '0')}`;

  }

}
