import { Injectable } from '@angular/core';
import { ProductService } from './product.service';
import { ImageProcessingService } from '../image-processing-service.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService {

  // let isSingleProductCheckout = false;

  constructor(private productServcice: ProductService,
    private imageProcessingService: ImageProcessingService) { 

    }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    
    const idParam = route.paramMap.get("id");
    const id = idParam ? parseInt(idParam, 10) : 0;
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout") === 'true';
    return this.productServcice.getProductDetails(isSingleProductCheckout, id)
      .pipe(
        map(
          (x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))
        )
      );
  }
}
