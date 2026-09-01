import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './login.component.html',

  styleUrl:
    './login.component.css'
})
export class LoginComponent {

  email = '';

  password = '';

  showPassword = false;

  isLoading = false;

  errorMessage = '';


  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  login(): void {

    this.errorMessage = '';


    if (
      !this.email.trim() ||
      !this.password
    ) {

      this.errorMessage =
        'Por favor, completa todos los campos.';

      return;

    }


    if (
      !this.isValidEmail(
        this.email.trim()
      )
    ) {

      this.errorMessage =
        'Ingresa un correo electrónico válido.';

      return;

    }


    const authenticated =
      this.authService.login(
        this.email,
        this.password
      );


    if (!authenticated) {

      this.errorMessage =
        'El correo o la contraseña son incorrectos.';

      return;

    }


    this.isLoading = true;


    setTimeout(() => {

      this.isLoading = false;

      this.router.navigate([
        '/catalog'
      ]);

    }, 500);

  }


  togglePassword(): void {

    this.showPassword =
      !this.showPassword;

  }


  private isValidEmail(
    email: string
  ): boolean {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);

  }

}