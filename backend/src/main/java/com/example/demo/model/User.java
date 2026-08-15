package com.example.demo.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firebaseUid;

    private String firstName;

    private String surname;

    private String email;

    private String skillLevel;

    @ElementCollection
    @CollectionTable(
        name = "user_favorite_sports",
        joinColumns = @JoinColumn(name = "user_id")
    )
    @Column(name = "sport")
    private List<String> favoriteSports;

    private String profilePicture;

    private String bio;

    @JsonIgnore
    @OneToMany(mappedBy = "host")
    private List<Game> hostedGames;
}