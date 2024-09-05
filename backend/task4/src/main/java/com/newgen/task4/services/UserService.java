
package com.newgen.task4.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newgen.task4.models.User;
import com.newgen.task4.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> searchByUsername(String username) {
        if (username == null || username.trim().isEmpty() || username.length() < 3) {
            return new ArrayList<>();
        }
        return userRepository.searchByUsername(username);
    }

    public User updateUsername(Long id, String name) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setUsername(name);
            return userRepository.save(user);
        }
        return null;
    }
}