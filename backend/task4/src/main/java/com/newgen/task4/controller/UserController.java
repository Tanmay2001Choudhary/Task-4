package com.newgen.task4.controller;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newgen.task4.models.User;
import com.newgen.task4.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/allusers")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userService.getUserById(Long.parseLong(id));
    }

    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam(required = false) String username) {
        if (username == null || username.trim().isEmpty() || username.length() < 3) {
            return new ArrayList<>();
        }
        return userService.searchByUsername(username);
    }

    @PutMapping("/update-username/{id}")
    public User updateUsername(@PathVariable Long id, @RequestParam String name) {
        User user = userService.updateUsername(id, name);
        System.out.println(user);
        return user;
    }

}
