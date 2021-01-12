import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _http:HttpClient) { }

  productsListUrl="http://localhost:3000/product";
  ProdcutDetailUrl="http://localhost:3000/product/"
  addToCartUrl="http://localhost:3000/product/add_product/";
  removeFromCartUrl="http://localhost:3000/product/remove_product/";
  viewCartUrl="http://localhost:3000/product/cart";
  getProducts(){
      return this._http.get(this.productsListUrl).pipe(map(res=>{
          //converting to any due to bug in ts
        for (let product in res)
        {
          res[product].image=(res[product] as any).image="http://localhost:3000/static/"+(res[product] as any).image;
        }
        return res;
      }));
  }

  getProduct(id)
  {
    return this._http.get(this.ProdcutDetailUrl+id).pipe(map(res=>{
      (res as any).image=(res as any).image="http://localhost:3000/static/"+(res as any).image;
    return res;
  }));
  }

  addToCart(id){
    return this._http.get(this.addToCartUrl+id,{responseType: 'text'});
  }

  removeFormCart(id){
    console.log("A user is Removing something from cart"+id);
    return this._http.get(this.removeFromCartUrl+id,{responseType: 'text'});  
  }

  viewCart()
  {
    return this._http.get(this.viewCartUrl);
  }
}
