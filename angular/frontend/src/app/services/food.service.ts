import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
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
    return this.http.get<Food[]>(FOODS_URL, { params: { lang }});
  }
  

  getAllFoodsBySearchTerm(searchTerm: string, lang: string): Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm, { params: { lang }});
  }


  getAllTags(lang: string): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL, { params: { lang }});
  }
  

  getAllFoodsByTag(tag: string, lang: string): Observable<Food[]> {
    // Če je tag 'All' (ali 'Alle' ali 'Vse'), vrnemo vse hrane brez filtriranja po tagu
    if (tag === "All" || tag === "Alle" || tag === "Vse") {
      return this.getAll(lang);  // Uporabi metodo getAll za pridobitev vseh živil v jeziku
    } else {
      return this.http.get<Food[]>(FOODS_BY_TAG_URL + tag, { params: { lang }});
    }
  }
  

  getFoodById(foodId: string, lang: string): Observable<Food> {
    return this.http.get<Food>(FOOD_BY_ID_URL + foodId, { params: { lang }});
  }
  

}
