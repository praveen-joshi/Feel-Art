import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  allOrders$;
  constructor(private _orders:OrdersService) { }

  completeOrder(id){
    this._orders.completeOrder(id).subscribe((res)=>{
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.allOrders$=this._orders.getallOrders();
  }


}
