package com.app.ecommerce.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ecommerce.configuration.JwtRequestFilter;
import com.app.ecommerce.dao.CartDao;
import com.app.ecommerce.dao.OrderDetailDao;
import com.app.ecommerce.dao.ProductDao;
import com.app.ecommerce.dao.UserDao;
import com.app.ecommerce.entity.Cart;
import com.app.ecommerce.entity.OrderDetail;
import com.app.ecommerce.entity.OrderInput;
import com.app.ecommerce.entity.OrderProductQuantity;
import com.app.ecommerce.entity.Product;
import com.app.ecommerce.entity.User;

@Service
public class OrderDetailService {
	
	private static final String ORDER_PLACE = "Placed";

	@Autowired 
	OrderDetailDao orderDetailDao;
	
	@Autowired
	ProductDao productDao;
	
	@Autowired 
	UserDao userDao;
	
	@Autowired
	CartDao cartDao;
	
	public void placeOrder(OrderInput orderInput,boolean isSingleProductCheckout){
		System.out.println("order input :::"+orderInput);
		List<OrderProductQuantity> productQuantityList = orderInput.getOrderProductQuantityList();
		
		for(OrderProductQuantity o:productQuantityList) {
//			if(o.getProductId()!=null) {
			Product product = productDao.findById(o.getProductId()).get();
//			}
//			else {System.out.println("inside else");}
	        String currentUser = JwtRequestFilter.CURRENT_USER;
	        User user = userDao.findById(currentUser).get();
	        
//			Product product;
			OrderDetail orderDetail = new OrderDetail(
				orderInput.getFullName(),
				orderInput.getFullAddress(),
				orderInput.getContactNumber(),
				orderInput.getAlternateContactNumber(),
				ORDER_PLACE,
				o.getQuantity(),
				product.getProductDiscountedPrice() * o.getQuantity(),
				product,
				user
			);
			
			if(!isSingleProductCheckout) {
				List<Cart> cart=cartDao.findByUser(user);
				cart.stream().forEach(x->cartDao.deleteById(x.getCartId()));
			}
			
			orderDetailDao.save(orderDetail);
		}
	}
	
	public List<OrderDetail> getOrderDetails() {
		String currentUser = JwtRequestFilter.CURRENT_USER;
		User user = userDao.findById(currentUser).get();
		
		return orderDetailDao.findByUser(user);
	}

	public List<OrderDetail> getAllOrderDetails(String status) {
		List<OrderDetail> allOrderDetails = new ArrayList<>();
		
		if(status.equals("All")) {
			orderDetailDao.findAll().forEach(x->allOrderDetails.add(x));
		}
		else {
			orderDetailDao.findByOrderStatus(status).forEach(x->allOrderDetails.add(x));
		}
		return allOrderDetails;
	}
	
	public void markOrderAsDelivered(Integer orderId) {
		OrderDetail order = orderDetailDao.findById(orderId).get();
		if(order!=null) {
			order.setOrderStatus("Delivered");
			orderDetailDao.save(order);
		}
	}
}
