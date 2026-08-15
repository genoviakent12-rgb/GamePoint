package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Game;
import com.example.demo.model.User;
import java.time.LocalTime;


public interface GameRepository extends JpaRepository<Game, Long> {
    List<Game> findBySport(String sport);
    List<Game> findByStatus(String status);
    List<Game> findByHostId(Long hostId);
    List<Game> findByHost(User host);
    List<Game> findByGameDifficulty(Integer difficulty);
    List<Game> findByStartTime(LocalTime startTime);
    List<Game> findByEndTime(LocalTime endTime);
    List<Game> findByTimePeriod(String timePeriod);
    List<Game> findByPlayersGoing(Integer playersGoing);
}