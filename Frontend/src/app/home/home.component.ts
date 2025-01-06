import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  searchKeyCopy="";
  pageNumber:number=0;
  loadMoreBtn=true;
  productDetails: Product[] = [];
  categories: string[] = ['All', 'Mens Clothing', 'Womens Clothing', 'Cosmetics', 'Home Decor', 'Kitchen'];

  filters = {
    searchKey: '',
    category: 'All',
    priceRange: '0 - 0'
  };

  constructor(private productService:ProductService, 
    private imageProcessingService:ImageProcessingService,
    private router:Router ){}

  ngOnInit(){
    this.getAllProducts();
  }

  viewProduct(productId:number){
    this.router.navigate(['/productDetails', {productId: productId}]);
  }

  loadMoreProducts(){
    this.pageNumber += 1;
    this.getAllProducts();
  }

  // loadMoreProducts(){
  //   this.pageNumber += 1;
  //   if(this.searchKeyCopy==="") this.getAllProducts();
  //   else this.getAllProducts(this.searchKeyCopy);
  // }
  
  // searchProducts(searchKey:string){
  //   this.searchKeyCopy=searchKey;
  //   this.pageNumber=0;
  //   this.productDetails=[];
  //   this.getAllProducts(searchKey);
  // }

  addToCart(productId:number){
    this.productService.addToCart(productId).subscribe(
      (response) => {
        console.log(response);
      }, (error)=> {
        console.log(error);
      }
    );
  }

  applyFilters() {
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts();
  }

  public getAllProducts(){
    const { searchKey, category, priceRange } = this.filters;
    console.log("before if : ",this.filters);

    if(this.filters.searchKey!==""){
      this.filters.category="All";
      this.filters.priceRange="0 - 0";
    }

    console.log("after if : ",this.filters);

    let minPrice = 0, maxPrice = 0;
    if (priceRange) {
      [minPrice, maxPrice] = priceRange.split('-').map(price => +price);
    }

    this.productService.getAllProducts(this.pageNumber, searchKey, category, minPrice, maxPrice)
    .pipe(
      map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
    ).subscribe(
      (resp: Product[]) => {
        console.log(resp);
        if(resp.length == 4) {
          this.loadMoreBtn = true;
        } else {
          this.loadMoreBtn = false;
        }
        resp.forEach(p => this.productDetails.push(p));
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  // public getAllProducts(searchKey:string=""){
  //   this.productService.getAllProducts(this.pageNumber,searchKey).
  //   pipe(
  //     map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
  //   ).subscribe(
  //     (resp: Product[]) => {
  //       console.log(resp);
  //       if(resp.length == 4) {
  //         this.loadMoreBtn = true;
  //       } else {
  //         this.loadMoreBtn = false;
  //       }
  //       resp.forEach(p => this.productDetails.push(p));
  //     }, (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  // }
}
