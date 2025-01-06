import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { DragDirective } from './drag.directive';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ViewSpecificProductComponent } from './view-specific-product/view-specific-product.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForbiddenComponent,
    UserComponent,
    AdminComponent,
    HeaderComponent,
    AddNewProductComponent,
    DragDirective,
    ShowProductDetailsComponent,
    ViewSpecificProductComponent,
    BuyProductComponent,
    RegisterComponent,
    CartComponent,
    MyOrdersComponent,
    AllOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
