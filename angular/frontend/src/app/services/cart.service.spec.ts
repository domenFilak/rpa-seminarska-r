import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

// Definicija testne suite za `CartService`
describe('CartService', () => {
  // Spremenljivka za instanco testiranega servisa
  let service: CartService;

  // Pripravljalna faza, ki se izvede pred vsakim testom
  beforeEach(() => {
    // Konfiguracija testnega okolja z uporabo `TestBed`
    TestBed.configureTestingModule({}); 
    // Injektiranje instance `CartService` v spremenljivko `service`
    service = TestBed.inject(CartService);
  });

  // Testni primer: preveri, ali je servis uspešno ustvarjen
  it('should be created', () => {
    // Pričakovanje: `service` mora obstajati (ne sme biti `null` ali `undefined`)
    expect(service).toBeTruthy();
  });
});

