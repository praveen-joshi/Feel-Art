import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  constructor(private _product:ProductService,private route:ActivatedRoute) { }

  product;
  ngOnInit(): void {
    const product_id=this.route.snapshot.paramMap.get('id');
    this._product.getProduct(product_id).subscribe((res)=>{
      this.product=res;
    });
  }

  addToCart(){
    this._product.addToCart(this.product._id).subscribe(()=>{
      console.log("Product Added to Cart");
    },err=>console.log(err)
    );
  }

}
