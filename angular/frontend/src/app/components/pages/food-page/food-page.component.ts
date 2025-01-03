import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CartService } from '../../../services/cart.service';
import { Food } from '../../../shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  showModal = false;
  selectedLanguageShortName: string = "sl";
  isBranchStockVisible: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedLanguageShortName = localStorage.getItem('lang') || 'sl';

    this.cartService.initialize(); // Initialize the cart from local storage

    // Fetch food data by ID
    this.activatedRoute.params.subscribe((params) => {
      if (params.id) {
        this.foodService.getFoodById(params.id, this.selectedLanguageShortName).subscribe(serverFood => {
          this.food = serverFood;
        });
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.food); // Add food to the cart
    this.showModal = true;  // Show the modal
  }

  closeModal(isShopping: boolean) {
    this.showModal = false;
    if (isShopping) {
      this.router.navigateByUrl('');
    }
  }

  goToCart() {
    this.router.navigateByUrl('/cart-page');
  }

  toggleBranchStock() {
    this.isBranchStockVisible = !this.isBranchStockVisible;
  }

}
