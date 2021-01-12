import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  userOrderUrl="http://localhost:3000/order/myOrders";
  allOrderUrl="http://localhost:3000/order/list";
  placeOrderUrl="http://localhost:3000/order";
  compeleteOrderUrl="http://localhost:3000/order/complete/";
  constructor(private _http:HttpClient) { }

  getUserOrders(){
    return this._http.get(this.userOrderUrl);
  }
  getallOrders(){
      return this._http.get(this.allOrderUrl);
  }
  placeOrder(){
    return this._http.get(this.placeOrderUrl,{responseType: 'text'});
  }

  completeOrder(id){
    return this._http.get(this.compeleteOrderUrl+id,{responseType: 'text'});
  }
}
