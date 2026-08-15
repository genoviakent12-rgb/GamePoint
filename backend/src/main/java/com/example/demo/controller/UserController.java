package com.example.demo.controller;

import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
  private final UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public Iterable<User> getAllUsers() {
    return userService.findAllUsers();
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getUserById(@PathVariable Long id) {
    Optional<User> user = userService.getUserById(id);
    return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public User addUser(@RequestBody User user) {
    return userService.addUser(user);
  }

  @PutMapping("/{id}")
  public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
    User updated = userService.updateUser(id, user);
    if (updated == null)
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(updated);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<User> deleteUser(@PathVariable Long id) {
    User deleted = userService.deleteUser(id);
    if (deleted == null)
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(deleted);
  }

  @GetMapping("/firebase/{firebaseUid}")
public ResponseEntity<User> getUserByFirebaseUid(@PathVariable String firebaseUid) {
    Optional<User> user = userService.getUserByFirebaseUid(firebaseUid);
    return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
}
}