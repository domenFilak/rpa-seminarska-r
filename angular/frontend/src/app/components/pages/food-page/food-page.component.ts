import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/food';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  showModal = false; 

  constructor(
    activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.food = foodService.getFoodById(params.id);
      }
    });
  }

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart(this.food); // Add food to the cart
    this.showModal = true;  // Show the modal
  }

  // Close the modal and continue shopping
  closeModal(isShopping: boolean) {
    this.showModal = false;
    if (isShopping) {
      // Continue shopping - No action needed here, just close the modal
    }
  }

  // Navigate to cart page when user chooses to go to the cart
  goToCart() {
    this.router.navigateByUrl('/cart-page');
  }
}
