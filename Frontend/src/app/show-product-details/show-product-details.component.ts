import { Component,OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../image-processing-service.service';
import { map } from 'rxjs/operators';
import { FileHandle } from '../_model/file-handle.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})

export class ShowProductDetailsComponent implements OnInit{
  pageNumber:number=0;
  searchKeyCopy="";
  loadMoreBtn=true;
  productDetails: Product[] = [];
  imagesModal=false;
  currentProductImgs:FileHandle[]=[];
  currentProductName:String='';

  constructor(private productService:ProductService, 
    private imageProcessingService: ImageProcessingService,
    private router: Router){}

  ngOnInit():void{
    this.getAllProducts();
  }

  openModal(i:number){
    this.currentProductImgs = this.productDetails[i].productImages;
    this.currentProductName = this.productDetails[i].productName;
    this.toggleModal();
  }

  toggleModal(){
    this.imagesModal = !this.imagesModal;
  }

  loadMoreProducts(){
    this.pageNumber += 1;
    if(this.searchKeyCopy==="") this.getAllProducts();
    else this.getAllProducts(this.searchKeyCopy);
  }

  searchProducts(searchKey:string){
    this.searchKeyCopy=searchKey;
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchKey);
  }

  public getAllProducts(searchKey:string=""){
    this.productService.getAllProducts(this.pageNumber,searchKey,'All',0,0).
    pipe(
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

  // public getAllProducts(){
  //   this.productService.getAllProducts(this.pageNumber).
  //   pipe(
  //     map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
  //   ).subscribe(
  //     (response:Product[])=>{
  //       console.log(response);
  //       response.forEach(product=>this.productDetails.push(product));
  //     },
  //     (err:HttpErrorResponse)=>{
  //       console.log(err);
  //     }
  //   );
  // }

  editProduct(productId:any) {
    this.router.navigate(['/addNewProduct', {productId: productId}]);
  }

  public outOfStock(id:any){ 
    this.productService.outOfStock(id).subscribe(
      {
        next: () => {
          // this.ngOnInit();
          this.getAllProducts();
          // alert(`Product with ID has been marked as out of stock.`);
        },
        error: (err) => {
          console.error('Error marking product as out of stock:', err);
          // alert('Failed to update product status. Please try again.');
        }
      }
    )
  }

  public inStock(id:any){ 
    this.productService.inStock(id).subscribe(
      {
        next: () => {
          this.ngOnInit();
          // alert(`Product with ID has been marked as out of stock.`);
        },
        error: (err) => {
          console.error('Error marking product as out of stock:', err);
          // alert('Failed to update product status. Please try again.');
        }
      }
    )
  }

  public deleteProduct(id:any){ 
    console.log(id);
    this.productService.deleteProductById(id).subscribe(
      (reponse)=>{
        this.getAllProducts();
      },
      (err:HttpErrorResponse)=>{
        console.log(err);
      }
    )
  }
}
