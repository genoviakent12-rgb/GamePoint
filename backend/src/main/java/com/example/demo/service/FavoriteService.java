package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.Favorite;
import com.example.demo.repository.FavoriteRepository;

@Service
public class FavoriteService {
  private final FavoriteRepository favoriteRepository;

  public FavoriteService(FavoriteRepository favoriteRepository) {
    this.favoriteRepository = favoriteRepository;
  }

  public Favorite addFavorite(Favorite favorite) {
    return favoriteRepository.save(favorite);
  }

  public Favorite deleteFavorite(Long id) {
    Optional<Favorite> favoriteOptional = favoriteRepository.findById(id);

    if (!favoriteOptional.isPresent()) {
      return null;
    }

    Favorite favoriteToDelete = favoriteOptional.get();
    favoriteRepository.delete(favoriteToDelete);
    return favoriteToDelete;
  }

  public List<Favorite> getFavoritesByUserId(Long userId) {
    return favoriteRepository.findByUserId(userId);
  }
}