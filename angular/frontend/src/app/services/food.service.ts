import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[] { //iz data.ts dobi array vseh foods-ov notri ==> kasneje bo to iz database, SO DEJANSKO IZDELKI
    return sample_foods;
  }

  getAllFoodsBySearchTerm(searchTerm: string){ //uporabimo toLowerCase() da se izognemo case sensitivity-ju!
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getAllTags():Tag[]{ //iz data.ts dobi array vseh tagov notri ==> kasneje bo to iz database, SO DEJANSKO KATEGORIJE
    return sample_tags;
  }

  getAllFoodsByTag(tag: string): Food[] { //prikazi vse food-e glede na to, ali vsebujejo podani tag
                                          //ce tag === "All", prikazi vse izdelke
    return tag === "All" ? this.getAll() : this.getAll().filter(food => food.tags?.includes(tag));
  }

  getFoodById(foodId:string):Food{ //poiščemo hrano za prikaz po id-ju hrane, določene na katero kliknemo
    return this.getAll().find(food => food.id == foodId) ?? new Food();
  }

}
