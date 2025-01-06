package com.app.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.ecommerce.entity.OrderDetail;
import com.app.ecommerce.entity.OrderInput;
import com.app.ecommerce.service.OrderDetailService;

@RestController
public class OrderDetailController {

	@Autowired 
	OrderDetailService orderDetailService;
	
	@PostMapping({"/placeOrder/{isSingleProductCheckout}"})
	public void placeOrder(@PathVariable(name="isSingleProductCheckout") boolean isSingleProductCheckout, @RequestBody OrderInput orderInput) {
		orderDetailService.placeOrder(orderInput,isSingleProductCheckout);
	}
	
	@PreAuthorize("hasRole('User')")
	@GetMapping({"/orders"})
	public List<OrderDetail> getOrders() {
		return orderDetailService.getOrderDetails();
	}
	
	@PreAuthorize("hasRole('Admin')")
	@GetMapping({"/allOrders/{status}"})
	public List<OrderDetail> getAllOrderDetails(@PathVariable(name="status") String status) {
		System.out.println("status value is : "+status);
		return orderDetailService.getAllOrderDetails(status);
	}
	
	@PreAuthorize("hasRole('Admin')")
	@GetMapping({"/markOrderAsDelivered/{orderId}"})
	public void markOrderAsDelivered(@PathVariable(name="orderId") Integer orderId) {
		orderDetailService.markOrderAsDelivered(orderId);
	}
}
