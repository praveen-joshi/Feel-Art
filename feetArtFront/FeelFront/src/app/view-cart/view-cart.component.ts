import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.css']
})
export class ViewCartComponent implements OnInit {

  constructor(private _product:ProductService,private _order:OrdersService,private _route:Router) { }
  cart$;
  ngOnInit(): void {
    this.cart$=this._product.viewCart();
  }

  placeOrder(){
    this._order.placeOrder().subscribe((res)=>{
      alert("order Placed")
      this.cart$=this._product.viewCart();
    },
    (err)=>{
      alert("Can not Place Order,You can Only order 1 piece.If there are Out of Stock item Remove Them")
      console.log(err)});
  }

  removeFormCart(id){
    this._product.removeFormCart(id).subscribe(()=>{
      this.ngOnInit();
    });
  }
  


}
