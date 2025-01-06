import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductResolveService } from './_services/product-resolve.service';
import { ViewSpecificProductComponent } from './view-specific-product/view-specific-product.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './_services/buy-product-resolver.service';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'admin',component:AdminComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  {path:'user',component:UserComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'login',component:LoginComponent},
  {path:'addNewProduct',component:AddNewProductComponent, canActivate:[AuthGuard], data:{roles:['Admin']},
  resolve:{product: ProductResolveService}},
  {path:'showAllProducts', component:ShowProductDetailsComponent, canActivate:[AuthGuard], data:{roles:['Admin']}},
  {path:'productDetails', component:ViewSpecificProductComponent, resolve:{product: ProductResolveService}},
  {path:'buyProduct', component:BuyProductComponent, canActivate:[AuthGuard], data:{roles:['User']}, resolve:{productDetails: BuyProductResolverService}},
  {path:'cart', component:CartComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  {path:'register', component:RegisterComponent},
  {path:'orders',component:MyOrdersComponent, canActivate:[AuthGuard], data:{roles:['User']}},
  {path:'allOrders',component:AllOrdersComponent, canActivate:[AuthGuard], data:{roles:['Admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
