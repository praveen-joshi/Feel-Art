import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _productService:ProductService) { }
  Arts$;
  ngOnInit(): void {
    this.Arts$=this._productService.getProducts();
  }

}
