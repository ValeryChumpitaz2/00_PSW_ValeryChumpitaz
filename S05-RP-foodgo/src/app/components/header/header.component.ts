import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';

import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],

  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent
  implements OnInit, OnDestroy {

  cartCount = 0;

  userName = 'Admin';

  mobileMenuOpen = false;

  private cartSubscription?: Subscription;


  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.loadUser();

    this.cartSubscription =
      this.cartService.cart$
        .subscribe(items => {

          this.cartCount =
            items.reduce(
              (total, item) =>
                total + item.quantity,
              0
            );

        });

  }


  ngOnDestroy(): void {

    this.cartSubscription?.unsubscribe();

  }


  private loadUser(): void {

    const user =
      this.authService.getUser();

    if (user) {

      this.userName =
        user.name || 'Admin';

    }

  }


  toggleMobileMenu(): void {

    this.mobileMenuOpen =
      !this.mobileMenuOpen;

  }


  closeMobileMenu(): void {

    this.mobileMenuOpen = false;

  }


  logout(): void {

    this.authService.logout();

    this.closeMobileMenu();

    this.router.navigate([
      '/login'
    ]);

  }

}