import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { FOOD_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll(lang: string): Observable<Food[]> {
    const filteredFoods = sample_foods.filter((food) => food.lang === lang);
    return new Observable((observer) => {
      observer.next(filteredFoods);
      observer.complete();
    });
  }
  

  getAllFoodsBySearchTerm(searchTerm: string, lang: string): Observable<Food[]> {
    const filteredFoods = sample_foods.filter(
      (food) =>
        food.lang === lang &&
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return new Observable((observer) => {
      observer.next(filteredFoods);
      observer.complete();
    });
  }

  
  

  getAllTags(lang: string): Observable<Tag[]> {
    const filteredTags = sample_tags.filter((tag) => tag.lang === lang);
    return new Observable((observer) => {
      observer.next(filteredTags);
      observer.complete();
    });
  }
  

  getAllFoodsByTag(tag: string, lang: string): Observable<Food[]> {
    // Če je tag 'All' (ali 'Alle' ali 'Vse'), vrnemo vse hrane brez filtriranja po tagu
    if (tag === "All" || tag === "Alle" || tag === "Vse") {
      return this.getAll(lang);  // Uporabi metodo getAll za pridobitev vseh živil v jeziku
    } else {
      // Če ni "All", filtriramo hrane, ki imajo ustrezni tag
      return new Observable((observer) => {
        const filteredFoods = sample_foods
          .filter((food) => food.lang === lang && food.tags && food.tags.includes(tag));
        observer.next(filteredFoods);
        observer.complete();
      });
    }
  }
  

  getFoodById(foodId: string, lang: string): Observable<Food> {
    const filteredFood = sample_foods.find((food) => food.id === foodId && food.lang === lang);
    return new Observable((observer) => {
      if (filteredFood) {
        observer.next(filteredFood);
      } else {
        observer.error(new Error('Food not found'));
      }
      observer.complete();
    });
  }
  

}
