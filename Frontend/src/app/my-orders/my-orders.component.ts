import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing-service.service';
import { Product } from '../_model/product.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{
  orderInfo: { name:string;
    address:string;
    contact:string;
    amt:string;
    orderStatus:string; 
    product: Product }[] = [];
  
  constructor(private productService:ProductService, private imageProcessingService:ImageProcessingService){}

  ngOnInit(){
    this.myOrders();
  }

  myOrders(){
    this.productService.getMyOrders().subscribe(
      (res)=>{
        this.orderInfo = res.map((element: any) => {
          return {
            name: element.orderFullName,
            address: element.orderFullOrder,
            contact: element.orderContactNumber,
            amt: element.orderAmount,
            orderStatus: element.orderStatus,
            product: this.imageProcessingService.createImages(element.product),
          };
        });
      },
      (err)=>{
        console.log(err);
      }
    )
  }

}
