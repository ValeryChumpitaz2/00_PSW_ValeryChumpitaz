import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  CartItem,
  CartService
} from '../../services/cart.service';

import {
  AuthService
} from '../../services/auth.service';

import {
  OrderService
} from '../../services/order.service';

interface CheckoutForm {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  reference: string;
  paymentMethod: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent
  implements OnInit, OnDestroy {

  items: CartItem[] = [];

  subtotal = 0;

  delivery = 0;

  total = 0;

  isLoading = false;

  errorMessage = '';

  successMessage = '';

  orderId = '';

  private cartSubscription?: Subscription;


  form: CheckoutForm = {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    reference: '',
    paymentMethod: ''
  };


  districts = [
    'Miraflores',
    'San Isidro',
    'Surco',
    'Barranco',
    'San Borja',
    'La Molina',
    'Lince',
    'Jesús María',
    'Magdalena',
    'Pueblo Libre'
  ];


  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.loadUser();

    this.cartSubscription =
      this.cartService.cart$
        .subscribe(items => {

          this.items = items;

          this.updateTotals();

        });

  }


  ngOnDestroy(): void {

    this.cartSubscription?.unsubscribe();

  }


  private loadUser(): void {

    const user =
      this.authService.getUser();

    if (!user) {
      return;
    }

    this.form.name =
      user.name || '';

    this.form.email =
      user.email || '';

  }


  private updateTotals(): void {

    this.subtotal =
      this.cartService.getSubtotal();

    this.delivery =
      this.cartService.getDeliveryCost();

    this.total =
      this.cartService.getTotal();

  }


  submitOrder(): void {

    this.errorMessage = '';

    this.successMessage = '';


    if (this.items.length === 0) {

      this.errorMessage =
        'Tu carrito está vacío. Agrega productos antes de continuar.';

      return;

    }


    if (!this.validateForm()) {
      return;
    }


    this.isLoading = true;


    setTimeout(() => {

      const order =
        this.orderService.createOrder({

          customer: {

            name:
              `${this.form.name.trim()} ${this.form.lastName.trim()}`,

            email:
              this.form.email.trim(),

            phone:
              this.form.phone.trim(),

            address:
              this.form.address.trim(),

            district:
              this.form.district

          },

          items:
            this.items,

          subtotal:
            this.subtotal,

          delivery:
            this.delivery,

          total:
            this.total,

          paymentMethod:
            this.form.paymentMethod

        });


      this.orderId =
        order.id;


      this.cartService.clearCart();


      this.isLoading = false;

      this.successMessage =
        '¡Pedido realizado correctamente!';

    }, 700);

  }


  private validateForm(): boolean {

    if (!this.form.name.trim()) {

      this.errorMessage =
        'Ingresa tu nombre.';

      return false;

    }


    if (!this.form.lastName.trim()) {

      this.errorMessage =
        'Ingresa tu apellido.';

      return false;

    }


    if (!this.form.email.trim()) {

      this.errorMessage =
        'Ingresa tu correo electrónico.';

      return false;

    }


    if (!this.isValidEmail(
      this.form.email.trim()
    )) {

      this.errorMessage =
        'Ingresa un correo electrónico válido.';

      return false;

    }


    if (!this.form.phone.trim()) {

      this.errorMessage =
        'Ingresa tu número de teléfono.';

      return false;

    }


    if (!/^\d{9}$/.test(
      this.form.phone.trim()
    )) {

      this.errorMessage =
        'El teléfono debe tener 9 dígitos.';

      return false;

    }


    if (!this.form.address.trim()) {

      this.errorMessage =
        'Ingresa tu dirección.';

      return false;

    }


    if (!this.form.district) {

      this.errorMessage =
        'Selecciona un distrito.';

      return false;

    }


    if (!this.form.paymentMethod) {

      this.errorMessage =
        'Selecciona un método de pago.';

      return false;

    }


    return true;

  }


  private isValidEmail(
    email: string
  ): boolean {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  }


  goToOrders(): void {

    this.router.navigate([
      '/orders'
    ]);

  }


  goToCatalog(): void {

    this.router.navigate([
      '/catalog'
    ]);

  }

}