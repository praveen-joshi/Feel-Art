import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { ProductService } from './services/product.service';
import { OrdersService } from './services/orders.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {TokenIntercepterService} from './token-intercepter.service';
import {AuthGuard} from './auth.guard';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyOrderComponent } from './my-order/my-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponentComponent,
    ProductsComponent,
    LoginComponent,
    RegisterComponent,
    EditProductComponent,
    ViewProductComponent,
    AddProductComponent,
    ViewCartComponent,
    MyOrderComponent,
    AllOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [UserService,ProductService,OrdersService,AuthGuard,
    {provide:HTTP_INTERCEPTORS,
      useClass:TokenIntercepterService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
