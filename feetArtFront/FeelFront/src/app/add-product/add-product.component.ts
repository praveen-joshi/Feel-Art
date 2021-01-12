import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private _http:HttpClient) { }
  image:File;
  //Since adding a product is only in single place we dont explacitily require service for that
  addProductUrl="http://localhost:3000/product";

  onFileSelect(event){
    this.image=<File>event.target.files[0];
  }
  addProduct(product){
    let fd=new FormData();
    console.log(this.image)
    fd.append('image',this.image,this.image.name);
    fd.append("name",product.name);
    fd.append("price",product.price);
    fd.append("description",product.description);
    fd.append("Quantity",product.Quantity);
    console.log(product);
    console.log(fd);
    this._http.post(this.addProductUrl,fd,{responseType: 'text'}).subscribe(()=>{
      alert("Successfully Added")
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
  }

}
