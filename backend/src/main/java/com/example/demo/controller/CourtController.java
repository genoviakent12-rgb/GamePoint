package com.example.demo.controller;

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

import com.example.demo.model.Court;
import com.example.demo.service.CourtService;

@RestController
@RequestMapping("/api/courts")
public class CourtController {
    private final CourtService courtService;

    public CourtController(CourtService courtService) {
        this.courtService = courtService;
    }

    @GetMapping
    public Iterable<Court> getAllCourts() {
        return courtService.findAllCourt();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Court> getCourtById(@PathVariable Long id) {
        Optional<Court> court = courtService.findCourtById(id);
        return court.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public Iterable<Court> getByPlayerAmount(@RequestParam Integer playerAmount) {
        return courtService.findByPlayerAmount(playerAmount);
    }

    @PostMapping
    public Court addCourt(@RequestBody Court court) {
        return courtService.addCourt(court);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Court> deleteCourt(@PathVariable Long id) {
        Court deleted = courtService.deleteCourt(id);
        if (deleted == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(deleted);
    }
}