package com.app.ecommerce.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.ecommerce.configuration.JwtRequestFilter;
import com.app.ecommerce.dao.CartDao;
import com.app.ecommerce.dao.ProductDao;
import com.app.ecommerce.dao.UserDao;
import com.app.ecommerce.entity.Cart;
import com.app.ecommerce.entity.Product;
import com.app.ecommerce.entity.User;

@Service
public class ProductService {
	
	@Autowired
	ProductDao productDao;
	
	@Autowired
	CartDao cartDao;
	
	@Autowired
	UserDao userDao;
	
	public Product addNewProduct(Product product) {
		return productDao.save(product);
	}
	
	public List<Product> getAllProducts(int pageNumber,String productName, String category, Double minPrice, Double maxPrice) {
        Pageable pageable = PageRequest.of(pageNumber,4);
        if(!productName.equals("") && category.equals("All") && minPrice==0.0 && maxPrice==0.0) {
        	return (List<Product>) productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(productName,productName,pageable);
        }
        else if(productName.equals("") && !category.equals("All") && minPrice==0.0 && maxPrice==0.0) {
        	return (List<Product>) productDao.findByProductCategoryIgnoreCase(category, pageable);
        }
        else if(productName.equals("") && category.equals("All") && minPrice!=0.0 && maxPrice!=0.0) {
        	return (List<Product>) productDao.searchByRange(minPrice, maxPrice, pageable);
        }
        else if(productName.equals("") && !category.equals("All") && minPrice!=0.0 && maxPrice!=0.0){
        	System.out.println("inside service inside if");
        	return (List<Product>) productDao.searchByCategoryRange(category, minPrice, maxPrice, pageable);	
        }
        else if(productName.equals("all") && category.equals("All") && minPrice==0.0 && maxPrice==0.0){
        	return (List<Product>) productDao.findAll(pageable);
        } 
        else {
        	return (List<Product>) productDao.findAll(pageable);
        }
//        	return (List<Product>) productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(searchkey,searchkey,pageable);
        
        
//        else if(!searchkey.equals("")&&category.equals("")&&range.equals("")){
//        	System.out.println("inside service inside else"+searchkey);
//        	return (List<Product>) productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(searchkey,searchkey,pageable);
//        }
//        else if(searchkey.equals("")&&!category.equals("")&&range.equals("")){
//        	return (List<Product>) productDao.findByProductCategoryContainingIgnoreCase(category, pageable);
//        }
//        else if(searchkey.equals("")&&category.equals("")&&!range.equals("")){
//        	
//        }
//        else if(searchkey.equals("")&&!category.equals("")&&!range.equals("")){}
//        else if(!searchkey.equals("")&&!category.equals("")&&range.equals("")){}
	}

	public Product getProductById(Integer productId) {
		return productDao.findById(productId).get();
	}
	
	public void productOutOfStock(Integer productId) {
		
	}
	
	public void deleteProductById(Integer productId) {
		productDao.deleteById(productId);
	}
	
	@Transactional
    public void setProductUnavailable(Integer productId) {
        productDao.updateProductAvailability(productId, "Unavailable");
        cartDao.deleteByProductProductId(productId);
    }
	
	@Transactional
    public void setProductAvailable(Integer productId) {
        productDao.updateProductAvailability(productId, "Available");
    }
	
	public List<Product> getProductDetails(boolean isSingleProductCheckout, Integer productId) {
        if(isSingleProductCheckout && productId != 0) {
            // we are going to buy a single product

            List<Product> list = new ArrayList<>();
            Product product = productDao.findById(productId).get();
            list.add(product);
            return list;
        } else {
            // we are going to checkout entire cart
            String username = JwtRequestFilter.CURRENT_USER;
            User user = userDao.findById(username).get();
            List<Cart> carts = cartDao.findByUser(user);

            return carts.stream().map(x -> x.getProduct()).collect(Collectors.toList());
        }
    }
	 
}
