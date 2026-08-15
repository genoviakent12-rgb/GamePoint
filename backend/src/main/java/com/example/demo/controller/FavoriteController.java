package com.example.demo.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Favorite;
import com.example.demo.service.FavoriteService;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteController {
  private final FavoriteService favoriteService;

  public FavoriteController(FavoriteService favoriteService) {
    this.favoriteService = favoriteService;
  }

  @PostMapping
  public Favorite addFavorite(@RequestBody Favorite favorite) {
    return favoriteService.addFavorite(favorite);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Favorite> deleteFavorite(@PathVariable Long id) {
    Favorite deleted = favoriteService.deleteFavorite(id);
    if (deleted == null)
      return ResponseEntity.notFound().build();
    return ResponseEntity.ok(deleted);
  }

  @GetMapping("/user/{userId}")
  public List<Favorite> getFavoritesByUser(@PathVariable Long userId) {
    return favoriteService.getFavoritesByUserId(userId);
  }
}