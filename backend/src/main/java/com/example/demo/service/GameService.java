package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.model.Game;
import com.example.demo.repository.GameRepository;

@Service
public class GameService {

  private final GameRepository gameRepository;

  public GameService(GameRepository gameRepository) {
    this.gameRepository = gameRepository;
  }

  public Iterable<Game> findAllGames() {
    return gameRepository.findAll();
  }

  public List<Game> findGameBySport(String sport) { 
    return gameRepository.findBySport(sport); 
  }
  public Optional<Game> getGameById(Long id) {
    return gameRepository.findById(id);
  }

  public Game addGame(Game game) {
    return gameRepository.save(game);
  }

  public boolean deleteGame(Long gameId, Long hostId) {
    Optional<Game> gameOptional = gameRepository.findById(gameId);

    if (gameOptional.isEmpty()) {
        return false;
    }

    Game game = gameOptional.get();

    if (
        game.getHost() == null ||
        !game.getHost().getId().equals(hostId)
    ) {
        return false;
    }

    gameRepository.delete(game);
    return true;
}

  public Game joinGame(Long id) {
    Optional<Game> gameOptional = gameRepository.findById(id);
    if (gameOptional.isEmpty()) {
      return null;
    }

    Game game = gameOptional.get();
    if (game.getPlayersGoing() >= game.getMaxPlayers()) {
      return null;
    }

    game.setPlayersGoing(game.getPlayersGoing() + 1);

    // Keep currentPlayers synchronized
    game.setCurrentPlayers(game.getPlayersGoing());
    if (game.getPlayersGoing().equals(game.getMaxPlayers())) {
      game.setStatus("full");
    }

    return gameRepository.save(game);
  }
}