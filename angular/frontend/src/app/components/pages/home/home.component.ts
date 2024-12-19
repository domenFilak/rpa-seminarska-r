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
  selectedLanguageShortName: string = "sl";

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
      });
    });
  }

  ngOnInit(): void {
  }
}


    //KAJ SE TUKAJ DOGAJA V OZADJU

    //pogledamo v app-routing.module.ts in lahko vidimo, da imamo na HomeComponent vezana 2 url-ja
    //VSAKIČ, ko se HomeComponent generira (prikaže) se ta konstruktor izvede!!

    //PRVI url je prazen, path="", kar pomeni, ko bo v brskalniku localhost:4200 bo pokazalo HomeComponent ==> activatedRoute pa ne bo imelo nobenih parametrov!

    //DRUGI url ni prazen, path="search/:searchTerm", kar pomeni, ko bo v brskalniku recimo localhost:4200/search/pizza => activatedRoute bo takrat imel parameter searchTerm in bo izvedel ustrezno logiko odzgoraj!!
    

