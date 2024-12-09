import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public foods: Food[] = [];

  constructor(private foodService: FoodService, private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe((params) => { //glede na komponento v kateri smo (trenutno home component) gleda kateri url ima trenutno. Se lahko spreminja, to "polovimo" v subscribe metodi
      if (params.searchTerm){
        this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      }
      else if (params.tag) { //ce url v brskalniku ne vsebuje parametra searchTerm, pogledamo, če slučajno vsebuje parameter tag in prikažemo ustrezno vrednost
        this.foods = this.foodService.getAllFoodsByTag(params.tag);
      }
      else {
        this.foods = foodService.getAll(); //ZA KASNEJE ==> tukaj PRVI fetch iz podatkovne baze, glede na to kateri jezik je izbran
      }
    });




    //KAJ SE TUKAJ DOGAJA V OZADJU

    //pogledamo v app-routing.module.ts in lahko vidimo, da imamo na HomeComponent vezana 2 url-ja
    //VSAKIČ, ko se HomeComponent generira (prikaže) se ta konstruktor izvede!!

    //PRVI url je prazen, path="", kar pomeni, ko bo v brskalniku localhost:4200 bo pokazalo HomeComponent ==> activatedRoute pa ne bo imelo nobenih parametrov!

    //DRUGI url ni prazen, path="search/:searchTerm", kar pomeni, ko bo v brskalniku recimo localhost:4200/search/pizza => activatedRoute bo takrat imel parameter searchTerm in bo izvedel ustrezno logiko odzgoraj!!
    
  }

  ngOnInit(): void {
    
  }



}
