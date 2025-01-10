import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Cart } from '../../../shared/models/Cart';
import { CartItem } from '../../../shared/models/CartItem';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!: Cart;

  selectedLanguageShortName: string = "sl";

  constructor(private cartService: CartService, private foodService: FoodService) {}

  ngOnInit(): void {

    //PREBERI KATERI JEZIK JE V LOCAL STORAGE
    this.selectedLanguageShortName = localStorage.getItem('lang') || 'sl';

    this.cartService.initialize(); //nastavi iz localstorage kosarico

    this.cartService.changeCartLanguage(this.selectedLanguageShortName);

    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });



  }

  // Remove item from the cart
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  // Change quantity based on input or button click
  changeQuantity(cartItem: CartItem, quantityInString: number) {

    const quantity = Math.min(Math.max(quantityInString, 1), 10);
    
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }
  

  
}
