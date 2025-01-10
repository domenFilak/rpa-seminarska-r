import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../shared/models/Order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit {

  selectedLanguageShortName: string = "sl";
  orders!: Order[];

  constructor(private orderService: OrderService, private router: Router){
    
  }

  ngOnInit(): void {
    this.selectedLanguageShortName = localStorage.getItem('lang') || 'sl';

    this.orderService.getAllOrdersForCurrentUser().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      //TUKAJ ZAGRABI ERROR
      error:(error) => {
        console.log(error);
        this.router.navigateByUrl('/checkout')
      }
    });
  }

}
