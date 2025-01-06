import { FileHandle } from "./file-handle.model";

export interface Product{
    productId:number,
    productName: String,
    productDescription: String,
    productCategory: String,
    productDiscountedPrice: number,
    productActualPrice: number,
    availability: String,
    productImages: FileHandle[]
}