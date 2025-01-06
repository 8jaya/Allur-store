package com.app.ecommerce.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.app.ecommerce.entity.User;

@Repository
public interface UserDao extends CrudRepository<User, String> {
}
