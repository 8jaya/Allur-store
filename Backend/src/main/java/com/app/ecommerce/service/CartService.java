package com.app.ecommerce.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.app.ecommerce.configuration.JwtRequestFilter;
import com.app.ecommerce.dao.CartDao;
import com.app.ecommerce.dao.ProductDao;
import com.app.ecommerce.dao.UserDao;
import com.app.ecommerce.entity.Cart;
import com.app.ecommerce.entity.Product;
import com.app.ecommerce.entity.User;

@Service
public class CartService {
	
	@Autowired
	private CartDao cartDao;
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private UserDao userDao;
	
	public Cart addToCart(Integer productId){
		
		Product product = productDao.findById(productId).get();
		String username = JwtRequestFilter.CURRENT_USER;
		User user=null;
		if(username!="") {
			user = userDao.findById(username).get();
		}
		List<Cart> cartList = cartDao.findByUser(user);
        List<Cart> filteredList = cartList.stream().filter(x -> x.getProduct().getProductId() == productId).collect(Collectors.toList());

        if(filteredList.size() > 0) {
            return null;
        }
		if(product != null && user != null) {
			Cart cart = new Cart(product,user);
			return cartDao.save(cart);
		}
		return null;
	}
	
	public List<Cart> getProductsInCart(){
		String username = JwtRequestFilter.CURRENT_USER;
		User user = userDao.findById(username).get();
		return cartDao.findByUser(user);
	}
	
	public void removeCartItem(Integer cartId) {
		cartDao.deleteById(cartId);
	}
}
