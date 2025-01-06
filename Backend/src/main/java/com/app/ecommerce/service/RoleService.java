package com.app.ecommerce.service;

import com.app.ecommerce.dao.RoleDao;
import com.app.ecommerce.entity.Role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;

    public Role createNewRole(Role role) {
        return roleDao.save(role);
    }
}
