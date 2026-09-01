import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  CartService,
  CartItem
} from '../../services/cart.service';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

@Component({
  selector: 'app-catalog',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    FormsModule
  ],

  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {

  selectedCategory = 'Todos';

  searchTerm = '';

  categories = [
    'Todos',
    'Hamburguesas',
    'Pizzas',
    'Bebidas',
    'Postres'
  ];

  products: Product[] = [

    {
      id: 1,
      name: 'Classic Burger',
      description: 'Hamburguesa clásica con carne, lechuga y tomate.',
      price: 18.90,
      image: '🍔',
      category: 'Hamburguesas'
    },

    {
      id: 2,
      name: 'Cheese Burger',
      description: 'Carne, queso cheddar, lechuga y salsa especial.',
      price: 22.90,
      image: '🍔',
      category: 'Hamburguesas'
    },

    {
      id: 3,
      name: 'Bacon Burger',
      description: 'Hamburguesa con tocino crocante y queso cheddar.',
      price: 25.90,
      image: '🍔',
      category: 'Hamburguesas'
    },

    {
      id: 4,
      name: 'Pizza Margarita',
      description: 'Pizza artesanal con tomate, mozzarella y albahaca.',
      price: 24.90,
      image: '🍕',
      category: 'Pizzas'
    },

    {
      id: 5,
      name: 'Pizza Pepperoni',
      description: 'Pizza con mozzarella y abundante pepperoni.',
      price: 29.90,
      image: '🍕',
      category: 'Pizzas'
    },

    {
      id: 6,
      name: 'Pizza Familiar',
      description: 'Pizza familiar para compartir.',
      price: 39.90,
      image: '🍕',
      category: 'Pizzas'
    },

    {
      id: 7,
      name: 'Coca-Cola',
      description: 'Bebida gaseosa fría.',
      price: 6.00,
      image: '🥤',
      category: 'Bebidas'
    },

    {
      id: 8,
      name: 'Inca Kola',
      description: 'Bebida gaseosa peruana.',
      price: 6.00,
      image: '🥤',
      category: 'Bebidas'
    },

    {
      id: 9,
      name: 'Chicha Morada',
      description: 'Bebida tradicional peruana.',
      price: 7.00,
      image: '🥤',
      category: 'Bebidas'
    },

    {
      id: 10,
      name: 'Cheesecake',
      description: 'Cheesecake cremoso con topping de frutos rojos.',
      price: 12.90,
      image: '🍰',
      category: 'Postres'
    },

    {
      id: 11,
      name: 'Helado',
      description: 'Helado cremoso de vainilla.',
      price: 8.90,
      image: '🍨',
      category: 'Postres'
    }

  ];


  constructor(
    private cartService: CartService
  ) {}


  get filteredProducts(): Product[] {

    const search =
      this.searchTerm
        .trim()
        .toLowerCase();


    return this.products.filter(product => {

      const matchesCategory =
        this.selectedCategory === 'Todos' ||
        product.category === this.selectedCategory;


      const matchesSearch =
        !search ||
        product.name
          .toLowerCase()
          .includes(search) ||

        product.description
          .toLowerCase()
          .includes(search) ||

        product.category
          .toLowerCase()
          .includes(search);


      return matchesCategory && matchesSearch;

    });

  }


  selectCategory(
    category: string
  ): void {

    this.selectedCategory =
      category;

  }


  clearSearch(): void {

    this.searchTerm = '';

  }


  addToCart(
    product: Product
  ): void {

    const cartProduct:
      Omit<CartItem, 'quantity'> = {

      id: product.id,

      name: product.name,

      price: product.price,

      image: product.image,

      category: product.category

    };

    this.cartService.addItem(
      cartProduct
    );

  }

}