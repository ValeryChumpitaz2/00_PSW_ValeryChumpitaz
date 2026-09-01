import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  RouterLink
} from '@angular/router';

import {
  CartService,
  CartItem
} from '../../services/cart.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cart',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl:
    './cart.component.html',

  styleUrl:
    './cart.component.css'
})
export class CartComponent
  implements OnInit, OnDestroy {


  items: CartItem[] = [];

  totalItems = 0;

  subtotal = 0;

  delivery = 0;

  total = 0;


  private subscription?: Subscription;


  constructor(
    private cartService: CartService
  ) {}


  ngOnInit(): void {

    this.subscription =
      this.cartService.cart$
        .subscribe(items => {

          this.items = items;

          this.totalItems =
            this.cartService.getCount();

          this.updateTotals();

        });

  }


  ngOnDestroy(): void {

    this.subscription?.unsubscribe();

  }


  updateTotals(): void {

    this.subtotal =
      this.cartService.getSubtotal();

    this.delivery =
      this.cartService.getDeliveryCost();

    this.total =
      this.cartService.getTotal();

  }


  increase(
    id: number
  ): void {

    this.cartService
      .increaseQuantity(id);

  }


  decrease(
    id: number
  ): void {

    this.cartService
      .decreaseQuantity(id);

  }


  remove(
    id: number
  ): void {

    this.cartService
      .removeItem(id);

  }


  clear(): void {

    this.cartService.clearCart();

  }

}