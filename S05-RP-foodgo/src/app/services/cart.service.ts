import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly storageKey = 'cart';

  private cartSubject =
    new BehaviorSubject<CartItem[]>(
      this.loadCart()
    );

  cart$ =
    this.cartSubject.asObservable();


  private loadCart(): CartItem[] {

    const stored =
      localStorage.getItem(this.storageKey);

    if (!stored) {
      return [];
    }

    try {

      const cart =
        JSON.parse(stored);

      return Array.isArray(cart)
        ? cart
        : [];

    } catch {

      return [];

    }
  }


  private saveCart(cart: CartItem[]): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(cart)
    );

    this.cartSubject.next(cart);

  }


  getItems(): CartItem[] {
    return [...this.cartSubject.value];
  }


  addItem(product: Omit<CartItem, 'quantity'>): void {

    const cart =
      this.getItems();

    const existing =
      cart.find(item =>
        item.id === product.id
      );

    if (existing) {

      existing.quantity++;

    } else {

      cart.push({
        ...product,
        quantity: 1
      });

    }

    this.saveCart(cart);

  }


  increaseQuantity(id: number): void {

    const cart =
      this.getItems();

    const item =
      cart.find(product =>
        product.id === id
      );

    if (!item) {
      return;
    }

    item.quantity++;

    this.saveCart(cart);

  }


  decreaseQuantity(id: number): void {

    const cart =
      this.getItems();

    const item =
      cart.find(product =>
        product.id === id
      );

    if (!item) {
      return;
    }

    if (item.quantity > 1) {

      item.quantity--;

    } else {

      const index =
        cart.findIndex(product =>
          product.id === id
        );

      cart.splice(index, 1);

    }

    this.saveCart(cart);

  }


  removeItem(id: number): void {

    const cart =
      this.getItems()
        .filter(item =>
          item.id !== id
        );

    this.saveCart(cart);

  }


  clearCart(): void {

    this.saveCart([]);

  }


  getSubtotal(): number {

    return this.getItems()
      .reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      );

  }


  getDeliveryCost(): number {

    return this.getItems().length > 0
      ? 5
      : 0;

  }


  getTotal(): number {

    return (
      this.getSubtotal() +
      this.getDeliveryCost()
    );

  }


  getCount(): number {

    return this.getItems()
      .reduce(
        (total, item) =>
          total + item.quantity,
        0
      );

  }

}
