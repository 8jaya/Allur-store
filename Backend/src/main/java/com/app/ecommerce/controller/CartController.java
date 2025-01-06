package com.app.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.app.ecommerce.entity.Cart;
import com.app.ecommerce.service.CartService;

@RestController
public class CartController {

	@Autowired
	private CartService cartService;
	
	@GetMapping({"/addToCart/{productId}"})
	public Cart addToCart(@PathVariable(name="productId") Integer productId) {
		return cartService.addToCart(productId);
	}
	
	@PreAuthorize("hasRole('User')")
	@DeleteMapping("/removeCartItem/{cartId}")
	public void removeCartItem(@PathVariable(name="cartId") Integer cartId) {
		cartService.removeCartItem(cartId);
	}
	
	@GetMapping({"/getCartDetails"})
	public List<Cart> getCartProducts(){
		return cartService.getProductsInCart();
	}
}
