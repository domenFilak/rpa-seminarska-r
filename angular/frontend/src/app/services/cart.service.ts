import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/CartItem';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root'
})
export class CartService { 
  // Interna lastnost za shranjevanje trenutne košarice
  private cart: Cart = new Cart();

  // BehaviorSubject omogoča reaktivno spremljanje sprememb v košarici
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor(private foodService: FoodService) {
    this.initialize();
  }

  // Explicitly initialize the service (can be called in app.component.ts or elsewhere)
  initialize(): void {
    this.cart = this.getCartFromLocalStorage();
    this.cartSubject.next(this.cart);
  }

  //UPORABI V KOMPONENTAH, KJER NA BRSKALNIKU PRIKAZES VSEBINO KOSARICE => MORAS PREVESTI V USTREZEN JEZIK
  changeCartLanguage(lang: string): void {
    // Iteriraj skozi vsako postavko v košarici
    this.cart.items.forEach(cartItem => {
      this.foodService.getFoodById(cartItem.food.id, lang).subscribe(serverFood => {
        cartItem.food = serverFood; // Posodobi hrano z novo pridobljeno vrednostjo
      });
    });
  
    // Posodobi lokalno shrambo, da se odraža sprememba jezika
    this.setCartToLocalStorage();
  }

  // Dodajanje hrane v košarico
  addToCart(food: Food): void {
    // Poišči, če je izdelek že v košarici
    let cartItem = this.cart.items
      .find(item => item.food.id === food.id);
    
    // Če izdelek že obstaja, ga ne dodaj ponovno

    //TUKAJ BI TREBA NAREDITI UPDATE KOŠARICE => ČE ŽE OBSTAJA, POVEČAJ ŠTEVILO ZA 1    SICER PA DODAJ V KOŠARICO
    if (cartItem)
      //changeQuantity();
      this.changeQuantity(cartItem.food.id, cartItem.quantity + 1);
    else {
      // Če izdelek še ni v košarici, ga dodaj kot nov element
      this.cart.items.push(new CartItem(food));
    }

    // Posodobi lokalno shrambo in BehaviorSubject
    this.setCartToLocalStorage();
  }

  // Odstranjevanje izdelka iz košarice na podlagi ID-ja
  removeFromCart(foodId: string): void {
    // Filtriraj elemente in odstrani tistega z ustreznim ID-jem
    this.cart.items = this.cart.items
      .filter(item => item.food.id != foodId);
    
    // Posodobi lokalno shrambo in BehaviorSubject
    this.setCartToLocalStorage();
  }

  // Spreminjanje količine določenega izdelka
  changeQuantity(foodId: String, quantity: number) {
    // Poišči element v košarici
    let cartItem = this.cart.items
      .find(item => item.food.id === foodId);

    // Če element ne obstaja, končaj
    if (!cartItem) return;

    // Posodobi količino in izračunaj novo ceno za ta izdelek
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;

    // Posodobi lokalno shrambo in BehaviorSubject
    this.setCartToLocalStorage();
  }

  // Počisti celotno košarico
  clearCart() {
    // Ustvari novo, prazno košarico
    this.cart = new Cart();

    // Posodobi lokalno shrambo in BehaviorSubject
    this.setCartToLocalStorage();
  }

  // Vrni Observable za spremljanje sprememb košarice
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  // Posodobi košarico v lokalni shrambi in BehaviorSubject
  private setCartToLocalStorage(): void {
    // Izračunaj skupno ceno in število izdelkov
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    // Pretvori košarico v JSON in shrani v lokalno shrambo
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    // Obvesti vse naročnike o spremembi košarice
    this.cartSubject.next(this.cart);
  }

  // Pridobi košarico iz lokalne shrambe
  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');

    // Če je v lokalni shrambi shranjena košarica, jo pretvori iz JSON
    // Sicer vrni novo prazno košarico
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}

