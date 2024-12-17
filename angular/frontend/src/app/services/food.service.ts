import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(lang: string): Food[] { //iz data.ts dobi array vseh foods-ov notri ==> kasneje bo to iz database, SO DEJANSKO IZDELKI
    return sample_foods.filter(food => food.lang === lang);
  }

  getAllFoodsBySearchTerm(searchTerm: string, lang: string){ //uporabimo toLowerCase() da se izognemo case sensitivity-ju!
    return this.getAll(lang).filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getAllTags(lang: string):Tag[]{ //iz data.ts dobi array vseh tagov notri ==> kasneje bo to iz database, SO DEJANSKO KATEGORIJE
    return sample_tags.filter(tag => tag.lang === lang);;
  }

  getAllFoodsByTag(tag: string, lang: string): Food[] { //prikazi vse food-e glede na to, ali vsebujejo podani tag
    //ce tag === "All", prikazi vse izdelke
    return tag === "All" || tag === "Alle" || tag === "Vse"  ? this.getAll(lang) : this.getAll(lang).filter(food => food.tags?.includes(tag));
  }

  getFoodById(foodId:string, lang: string):Food{ //poiščemo hrano za prikaz po id-ju hrane, določene na katero kliknemo
    return this.getAll(lang).find(food => food.id == foodId) ?? new Food();
  }

}
