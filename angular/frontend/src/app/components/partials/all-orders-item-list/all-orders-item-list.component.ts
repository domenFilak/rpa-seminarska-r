import { Component, Input, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'app-all-orders-item-list',
  templateUrl: './all-orders-item-list.component.html',
  styleUrl: './all-orders-item-list.component.css'
})
export class AllOrdersItemListComponent implements OnInit {
  @Input()
  order!:Order;
  constructor() { }
  ngOnInit(): void {
  }
}
