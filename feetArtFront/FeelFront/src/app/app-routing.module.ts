import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ProductsComponent } from './products/products.component';
import { RegisterComponent } from './register/register.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {ViewProductComponent} from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import {AdminGuard} from './admin.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'products',component:ProductsComponent,canActivate:[AuthGuard]},
  {path:'editProduct/:id',component:EditProductComponent},
  {path:'viewProduct/:id',component:ViewProductComponent},
  {path:'cart',component:ViewCartComponent,canActivate:[AuthGuard]},
  {path:'orders',component:MyOrderComponent,canActivate:[AuthGuard]},
  
  {path:'addProduct',component:AddProductComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'allOrders',component:AllOrdersComponent,canActivate:[AuthGuard,AdminGuard]},
  
  { path: '**', component: PageNotFoundComponentComponent}  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
