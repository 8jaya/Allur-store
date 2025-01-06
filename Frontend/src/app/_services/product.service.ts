import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) {}

  public addProduct(product:FormData){
    return this.httpClient.post<Product>("http://localhost:9090/addNewProduct", product);
  }

  public getAllProducts(pageNumber:number,productName:string="",category:string="All",minPrice: number, maxPrice: number){
    return this.httpClient.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+pageNumber+"&productName="+productName+"&category="+category+"&minPrice="+minPrice+"&maxPrice="+maxPrice);
  }

  public getProductDetailsById(productId:number){
    return this.httpClient.get<Product>("http://localhost:9090/getProductById/"+productId);
  }

  public deleteProductById(productId:number){
    return this.httpClient.delete("http://localhost:9090/deleteProductById/"+productId);
  }

  public outOfStock(productId:number){
    return this.httpClient.put("http://localhost:9090/unavailable/"+productId, null);
  }

  public inStock(productId:number){
    return this.httpClient.put("http://localhost:9090/available/"+productId, null);
  }

  public getProductDetails(isSingleProductCheckout:Boolean, productId:Number) {
    return this.httpClient.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(orderDetails: OrderDetails,isSingleProductCheckout: string | null){
    return this.httpClient.post("http://localhost:9090/placeOrder/"+isSingleProductCheckout,orderDetails);
  }

  public addToCart(productId:number){
    return this.httpClient.get("http://localhost:9090/addToCart/"+productId);
  }

  public deleteCartItem(cartId:number){
    return this.httpClient.delete("http://localhost:9090/removeCartItem/"+cartId);
  }

  public cartDetails(){
    return this.httpClient.get<any[]>("http://localhost:9090/getCartDetails");
  }

  public getMyOrders(){
    return this.httpClient.get<any[]>("http://localhost:9090/orders");
  }

  public getAllOrders(status:string){
    return this.httpClient.get<any[]>("http://localhost:9090/allOrders/"+status);
  }

  public markAsDelivered(orderId: number){
    return this.httpClient.get("http://localhost:9090/markOrderAsDelivered/"+orderId);
  }
}
