package com.app.ecommerce.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.app.ecommerce.entity.Cart;
import com.app.ecommerce.entity.User;

@Repository
public interface CartDao extends CrudRepository<Cart,Integer>{
	public List<Cart> findByUser(User user);
	
	public void deleteByProductProductId(Integer productId);
}
