package com.app.ecommerce.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.app.ecommerce.entity.Role;

@Repository
public interface RoleDao extends CrudRepository<Role, String> {

}
