import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public foods: Food[] = [];

  constructor(private foodService: FoodService){
    this.foods = foodService.getAll();
  }

  ngOnInit(): void {
    
  }



}
