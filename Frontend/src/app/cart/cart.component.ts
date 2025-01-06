import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { ImageProcessingService } from '../image-processing-service.service';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Discounted Price', 'Action'];
  cartInfo: { cartId: number; product: Product }[] = [];

  constructor(private productService: ProductService,private imageProcessingService:ImageProcessingService, private router:Router){}

  ngOnInit(){
    this.cartDetails();
  }

  cartDetails(){
    this.productService.cartDetails().subscribe(
      // (res: any[]) => {
      //   this.cartInfo = res;
      
      //   this.cartInfo.forEach((element: any) => {
      //     if (element.product && typeof element.product.subscribe === 'function') {
      //       // Check if element.product is an observable
      //       element.product.subscribe((products: Product[]) => {
      //         element.product = products.map((product: Product) =>
      //           this.imageProcessingService.createImages(product)
      //         );
      //       });
      //     } else if (Array.isArray(element.product)) {
      //       // If element.product is already an array
      //       element.product = element.product.map((product: Product) =>
      //         this.imageProcessingService.createImages(product)
      //       );
      //     }
      //   });
      // },
      (res: any[]) => {
        // Map the response to process images and maintain cartId
        this.cartInfo = res.map((element: any) => {
          return {
            cartId: element.cartId,
            product: this.imageProcessingService.createImages(element.product),
          };
        });

        console.log('Processed Cart Info:', this.cartInfo); // Debugging output
      },
      
      (err)=>{
        console.log(err);
      }
    );
  }

  checkout(){
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: false, id: 0
    }]);
    // this.productService.getProductDetails(false,0).subscribe(
    //   (res)=>{
    //     console.log("res : ",res);
    //   },
    //   (err)=>{
    //     console.log(err);
    //   }
    // )
  }

  removeCartItem(cartId:number){
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      (resp) => {
        console.log(resp);
        this.cartDetails();
      }, (err) => {
        console.log(err);
      }
    );
  }
}
