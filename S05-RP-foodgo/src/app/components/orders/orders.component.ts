import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  OrderService,
  Order
} from '../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {

  orders: Order[] = [];

  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {

    this.loadOrders();

  }


  loadOrders(): void {

    this.orders =
      this.orderService.getOrders();

  }


  getPaymentLabel(
    method: string
  ): string {

    switch (method) {

      case 'Tarjeta':
        return 'Tarjeta';

      case 'Yape':
        return 'Yape';

      case 'Efectivo':
        return 'Efectivo';

      default:
        return method || 'No especificado';

    }

  }


  formatDate(
    date: string
  ): string {

    return new Date(date).toLocaleDateString(
      'es-PE',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }
    );

  }


  formatPrice(
    price: number
  ): string {

    return Number(price || 0)
      .toFixed(2);

  }

}