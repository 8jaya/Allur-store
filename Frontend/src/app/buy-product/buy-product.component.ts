import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit{
  productDetails:Product[] = []
  orderDetails:OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }
  isSingleProductCheckout!: string | null;

  constructor(private activatedRoute:ActivatedRoute, private productService:ProductService){}

  ngOnInit():void{
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.productDetails.forEach(
      x => this.orderDetails.orderProductQuantityList.push(
        {productId:x.productId,quantity:1}
      )
    );
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
  }

  placeOrder(orderForm: NgForm):any{
    console.log("order details : ",this.orderDetails)
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      (res:any) => {
        console.log(res);
        orderForm.reset();
      },
      (err:any)=>{
        console.log(err);
      }
    );
  }

  getQuantityForProduct(productId: number) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity || 1;
  }

  getCalculatedTotal(productId: number, productDiscountedPrice: number) {
    const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.productId === productId
    );

    return filteredProduct[0].quantity * productDiscountedPrice;
  }

  onQuantityChanged(q: any, productId: number) {
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.productId === productId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;

    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity) => {
        const price = this.productDetails.filter(product => product.productId === productQuantity.productId)[0].productDiscountedPrice;
        grandTotal = grandTotal + price * productQuantity.quantity;
      }
    );

    return grandTotal;
  }
}
