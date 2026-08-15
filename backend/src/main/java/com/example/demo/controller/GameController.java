package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Game;
import com.example.demo.service.GameService;

@RestController
@RequestMapping("/api/games")
public class GameController {

  private final GameService gameService;

  public GameController(GameService gameService) {
    this.gameService = gameService;
  }

  @GetMapping
  public Iterable<Game> getAllGames() {
    return gameService.findAllGames();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Game> getGameById(@PathVariable Long id) {

    Optional<Game> game = gameService.getGameById(id);

    return game
        .map(ResponseEntity::ok)
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public Game addGame(@RequestBody Game game) {
    return gameService.addGame(game);
  }

  @GetMapping("/sport/{sport}")
  public List<Game> getGameBySport(@PathVariable String sport) {
    return gameService.findGameBySport(sport);
  }

  @DeleteMapping("/{gameId}")
  public ResponseEntity<Void> deleteGame(
      @PathVariable Long gameId,
      @RequestParam Long hostId) {
    boolean deleted = gameService.deleteGame(gameId, hostId);

    if (!deleted) {
      return ResponseEntity.status(403).build();
    }

    return ResponseEntity.noContent().build();
  }

  @PostMapping("/{id}/join")
  public ResponseEntity<Game> joinGame(@PathVariable Long id) {

    Game updated = gameService.joinGame(id);

    if (updated == null) {
      return ResponseEntity.badRequest().build();
    }

    return ResponseEntity.ok(updated);
  }
}