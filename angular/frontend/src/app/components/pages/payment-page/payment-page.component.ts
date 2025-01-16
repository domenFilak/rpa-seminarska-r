import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent implements OnInit {

  order:Order = new Order();

  selectedPaymentMethod = 'money';
  selectedPaymentFlag = 'assets/icons/money-icon.png';
  isMenuOpen = false;

  selectedPaymentMethodString = "";

  constructor(private orderService: OrderService, private router: Router) {

  }
  ngOnInit(): void {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error:() => {
        this.router.navigateByUrl('/checkout')
      }
    });

  }

  selectPaymentMethod(method: string, flag: string) {
    this.selectedPaymentMethod = method;
    this.selectedPaymentFlag = flag;
    this.isMenuOpen = false;
  }

  goToCart() {
    this.router.navigate(['/cart-page']);
  }


}
