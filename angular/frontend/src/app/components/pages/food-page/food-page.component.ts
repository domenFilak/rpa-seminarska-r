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
  // Lastnost za hranjenje podatkov o hrani; `!` označuje, da bo vrednost inicializirana pozneje
  food!: Food;

  // Konstruktor injicira odvisnosti za dostop do poti, servisov in routerja
  constructor(activatedRoute:ActivatedRoute, foodService:FoodService,
    private cartService:CartService, private router: Router) {
    // Naročanje na spremembe parametrov poti  
    activatedRoute.params.subscribe((params) => {
      // Če parameter 'id' obstaja, pridobi podatke o hrani prek `FoodService`
      if(params.id)
        this.food = foodService.getFoodById(params.id)
    })
  }

  ngOnInit(): void {
      
  }

  // Metoda za dodajanje hrane v košarico in navigacijo na stran košarice
  addToCart(){
    this.cartService.addToCart(this.food); // Dodaj hrano v košarico
    this.router.navigateByUrl('/cart-page'); // Preusmeri uporabnika na stran košarice
  }

}
