import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from './product.service';
import { ImageProcessingService } from '../image-processing-service.service';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: "root",
})
export class ProductResolveService implements Resolve<Product> {
  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const id = route.paramMap.get("productId");

    if (id) {
      // Convert the string id to a number
      const numericId = Number(id);

      //then we have to fetch details from backend
       return this.productService.getProductDetailsById(numericId)
              .pipe(
                map(p => this.imageProcessingService.createImages(p))
              );
    } else {
      // return empty product observable.
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId: 0,
      productName: "",
      productDescription: "",
      productCategory:"",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      availability: "",
      productImages: [],
    };
  }
}