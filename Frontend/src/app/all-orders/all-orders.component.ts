import { Component } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { ImageProcessingService } from '../image-processing-service.service';
import { Product } from '../_model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent {
  customerOrdersInfo: { 
    id:number;
    name:string;
    address:string;
    contact:string;
    orderStatus:string; 
    product: Product }[] = [];

  status: string = 'All';
  
  constructor(private productService:ProductService, private imageProcessingService:ImageProcessingService, private router:Router){}

  ngOnInit(){
    this.customerOrders();
  }


  setActive(button: string) {
    this.status = button;
    this.customerOrders();
  }

  customerOrders(){
    console.log("statussssssssss",this.status)
    this.productService.getAllOrders(this.status).subscribe(
      (res)=>{
        this.customerOrdersInfo = res.map((element: any) => {
          return {
            id: element.orderId,
            name: element.orderFullName,
            address: element.orderFullOrder,
            contact: element.orderContactNumber,
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

  markAsDelivered(orderId:number){
    this.productService.markAsDelivered(orderId).subscribe(
      (res)=>{
        this.customerOrders();
        console.log(res);
      },
      (err)=>{
        console.log(err);
      }
    )
  }

  viewProduct(productId:number){
    this.router.navigate(['/productDetails', {productId: productId}]);
  }
}
