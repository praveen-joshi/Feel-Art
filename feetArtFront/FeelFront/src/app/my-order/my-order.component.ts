import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {

  myOrders
  constructor(private _orders:OrdersService) { }

  ngOnInit(): void {
    this._orders.getUserOrders().subscribe((res)=>{
      this.myOrders=res;
      console.log(res);
    },err=>console.log("Cant Get Orders"));
  }



}
