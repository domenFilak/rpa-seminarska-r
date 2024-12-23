import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  filteredFoods: Food[] = [];
  selectedLanguageShortName: string = "sl";
  selectedFilter: string = 'name'; // Default filter

  constructor(private foodService: FoodService, activatedRoute: ActivatedRoute) {
    this.selectedLanguageShortName = localStorage.getItem('lang') || 'sl';

    let foodsObservable: Observable<Food[]>;

    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) {
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm, this.selectedLanguageShortName);
      } else if (params.tag) {
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag, this.selectedLanguageShortName);
      } else {
        foodsObservable = this.foodService.getAll(this.selectedLanguageShortName);
      }

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
        this.applyFilter(); // Apply initial filter
      });
    });
  }

  ngOnInit(): void {}

  applyFilter(): void {
    if (this.selectedFilter === 'name') {
      this.filteredFoods = [...this.foods].sort((a, b) => a.name.localeCompare(b.name)); // Sort by name alphabetically
    } else if (this.selectedFilter === 'price-asc') {
      this.filteredFoods = [...this.foods].sort((a, b) => a.price - b.price); // Sort by price in ascending order
    } else if (this.selectedFilter === 'price-desc') {
      this.filteredFoods = [...this.foods].sort((a, b) => b.price - a.price); // Sort by price in descending order
    } else {
      this.filteredFoods = [...this.foods]; // No filter applied
    }
  }
}
