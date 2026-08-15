package com.example.demo.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public Iterable<User> findAllUsers() {
    return userRepository.findAll();
  }

  public Optional<User> getUserById(Long id) {
    return userRepository.findById(id);
  }

  public Optional<User> getUserByFirebaseUid(String firebaseUid) {
    return userRepository.findByFirebaseUid(firebaseUid);
}

  public User addUser(User user) {
    return userRepository.save(user);
  }

  public User updateUser(Long id, User updatedUser) {
    Optional<User> userOptional = userRepository.findById(id);

    if (!userOptional.isPresent()) {
      return null;
    }

    User userToUpdate = userOptional.get();
    userToUpdate.setFirstName(updatedUser.getFirstName());
    userToUpdate.setSurname(updatedUser.getSurname());
    userToUpdate.setEmail(updatedUser.getEmail());
    userToUpdate.setSkillLevel(updatedUser.getSkillLevel());
    userToUpdate.setFavoriteSports(updatedUser.getFavoriteSports());
    userToUpdate.setProfilePicture(updatedUser.getProfilePicture());
    userToUpdate.setBio(updatedUser.getBio());

    return userRepository.save(userToUpdate);
  }

  public User deleteUser(Long id) {
    Optional<User> userOptional = userRepository.findById(id);

    if (!userOptional.isPresent()) {
      return null;
    }

    User userToDelete = userOptional.get();
    userRepository.delete(userToDelete);
    return userToDelete;
  }
  
}