import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { ORDER_ALL_FOR_CURRENT_USER_URL, ORDER_CREATE_URL, ORDER_GET_USER_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_UPDATE_USER_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(private http:HttpClient) { }
  
  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  getAllOrdersForCurrentUser(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDER_ALL_FOR_CURRENT_USER_URL);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(ORDER_GET_USER_URL);
  }

  updateUser(updatedUser: any): Observable<any> {
    return this.http.put<any>(ORDER_UPDATE_USER_URL, updatedUser);
  }


}
