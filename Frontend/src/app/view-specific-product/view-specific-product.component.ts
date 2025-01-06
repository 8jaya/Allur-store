import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-view-specific-product',
  templateUrl: './view-specific-product.component.html',
  styleUrls: ['./view-specific-product.component.css']
})
export class ViewSpecificProductComponent implements OnInit{

  product: Product = {
    productId: 0,
    productName: "",
    productDescription: "",
    productCategory:"",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    availability:"",
    productImages: []
  };
  selectedIndex = 0;

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private productService:ProductService){}

  ngOnInit(){
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  changeImg(i:number){
    this.selectedIndex = i;
  }

  buyProduct(productId:number) {
    this.router.navigate(['/buyProduct', {
      isSingleProductCheckout: true, id: productId
    }]);
  }

  addToCart(productId:number){
    console.log("product Id: ",productId);
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log("res",response);
      }, (error)=> {
        console.log("err",error);
      }
    );
  }

}
