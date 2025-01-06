package com.app.ecommerce.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.ecommerce.entity.ImageModel;
import com.app.ecommerce.entity.Product;
import com.app.ecommerce.service.ProductService;

@RestController
public class ProductController {
	
	@Autowired 
	ProductService productService;

//	@PreAuthorize("hasRole('Admin')")
	@PostMapping(value = {"/addNewProduct"}, consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public Product addNewProduct(@RequestPart("product") Product product,
                                 @RequestPart("imageFile") MultipartFile[] file) {
        try {
        	System.out.println("add new product inside try");
            Set<ImageModel> images = uploadImage(file);
            product.setProductImages(images);
            System.out.println("new product data"+product);
            return productService.addNewProduct(product);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }

    }

    public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
        Set<ImageModel> imageModels = new HashSet<>();

        for (MultipartFile file: multipartFiles) {
            ImageModel imageModel = new ImageModel(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            imageModels.add(imageModel);
        }

        return imageModels;
    }
    
    @GetMapping({"/getAllProducts"})
    public List<Product> getAllProducts(@RequestParam(defaultValue="0") int pageNumber,
    		@RequestParam(defaultValue="") String productName,
            @RequestParam(defaultValue="All") String category,
            @RequestParam(defaultValue="0") Double minPrice,
            @RequestParam(defaultValue="0") Double maxPrice){
    	System.out.println(pageNumber);
    	System.out.println(productName);
    	System.out.println(category);
    	System.out.println(minPrice);
    	System.out.println(maxPrice);
    	return productService.getAllProducts(pageNumber,productName, category, minPrice, maxPrice);
    }
    
    @GetMapping({"/getProductById/{productId}"})
    public Product getProductById(@PathVariable("productId") Integer id){
    	return productService.getProductById(id);
    }
    
    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping({"/deleteProductById/{productId}"})
    public void deleteProductById(@PathVariable("productId") Integer productId){
    	 productService.deleteProductById(productId);
    }
    
    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/unavailable/{id}")
    public void setProductUnavailable(@PathVariable Integer id) {
        productService.setProductUnavailable(id);
    }
    
    @PreAuthorize("hasRole('Admin')")
    @PutMapping("/available/{id}")
    public void setProductAvailable(@PathVariable Integer id) {
        productService.setProductAvailable(id);
    }
    
//    @PreAuthorize("hasRole('User')")
    @GetMapping({"/getProductDetails/{isSingleProductCheckout}/{productId}"})
    public List<Product> getProductDetails(@PathVariable(name = "isSingleProductCheckout" ) boolean isSingleProductCheckout,
                                           @PathVariable(name = "productId")  Integer productId) {
        return productService.getProductDetails(isSingleProductCheckout, productId);
    }
    
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String query) {
        return productService.getAllProducts(0,query,"All",0.0,0.0);
    }

}
