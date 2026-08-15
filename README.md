GamePoint 

A mobile sports community platform that enables users to discover, create, and participate in local sports activities.

GamePoint connects players by providing an easy way to organize games, find nearby venues, and join sporting events within their community. The application combines a React Native mobile interface with a Spring Boot REST API backend to deliver a scalable full-stack experience.

---

##  Overview

Finding people to play sports with can often be difficult due to scheduling conflicts, lack of available players, or difficulty discovering suitable locations.

GamePoint aims to solve this problem by providing a centralized platform where users can:

- Create and manage sports games
- Discover available games nearby
- Join games hosted by other players
- Search for sports venues using location-based services
- View game details including time, venue, difficulty, and player availability

---

#  Key Features

## Game Management

- Create sports games with custom details:
  - Sport category
  - Venue location
  - Date and time
  - Maximum players
  - Difficulty level

- View available games
- Join existing games
- Track current players
- Allow hosts to cancel their created games

---

## Venue Discovery

Integrated with Google Places API to provide:

- Sports venue search
- Location details
- Venue ratings
- Address information
- Geographic coordinates

---

## Mobile Application

Built with React Native and Expo, providing:

- Cross-platform mobile experience
- Responsive user interface
- Smooth navigation
- Reusable component architecture

---

# System Architecture

GamePoint follows a client-server architecture:

```
                 ┌──────────────────┐
                 │   React Native   │
                 │   Mobile App     │
                 └────────┬─────────┘
                          │
                          │ REST API
                          │
                 ┌────────▼─────────┐
                 │  Spring Boot API │
                 │     Backend      │
                 └────────┬─────────┘
                          │
                          │ JPA/Hibernate
                          │
                 ┌────────▼─────────┐
                 │   PostgreSQL     │
                 │    Database      │
                 └──────────────────┘
```

---

# Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React Native | Mobile application development |
| Expo | Development environment and deployment |
| JavaScript | Application logic |
| Expo Router | Navigation |
| React Native Components | User interface |
| Google Places API | Location and venue search |

---

## Backend

| Technology | Purpose |
|---|---|
| Java | Backend programming language |
| Spring Boot | REST API framework |
| Spring Data JPA | Database interaction |
| Hibernate | ORM framework |
| PostgreSQL | Relational database |
| Maven | Dependency management |

---

# Project Structure

```
GamePoint
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
│   ├── assets
│   └── package.json
│
├── backend
│   ├── src/main/java
│   │   └── com.example.demo
│   │       ├── controller
│   │       ├── model
│   │       ├── repository
│   │       └── service
│   │
│   └── pom.xml
│
└── README.md
```

---

# Installation Guide

## Prerequisites

Before running GamePoint, ensure you have installed:

- Node.js
- npm
- Java JDK 21+
- Maven
- PostgreSQL
- Expo CLI

---

# Frontend Setup

Clone the repository:

```bash
git clone https://github.com/genoviakent12-rgb/GamePoint.git
```

Navigate to the frontend:

```bash
cd GamePoint/frontend
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```
.env
```

Add your Google API key:

```env
GOOGLE_API_KEY=your_api_key_here
```

Start the application:

```bash
npx expo start
```

---

# Backend Setup

Navigate to backend:

```bash
cd GamePoint/backend
```

Configure PostgreSQL connection:

`src/main/resources/application.properties`

Example:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/database_name
spring.datasource.username=username
spring.datasource.password=password

spring.jpa.hibernate.ddl-auto=update
```

Run the backend:

```bash
./mvnw spring-boot:run
```

The API will run on:

```
http://localhost:8080
```

---

# REST API Endpoints

## Games

### Retrieve all games

```
GET /api/games
```

### Create a game

```
POST /api/games
```

### Retrieve a game by ID

```
GET /api/games/{id}
```

### Join a game

```
POST /api/games/{id}/join
```

### Delete a hosted game

```
DELETE /api/games/{gameId}?hostId={hostId}
```

---

# Security & Environment Configuration

Sensitive information is excluded from version control using `.gitignore`.

Protected files include:

- Environment variables
- API keys
- Database credentials
- Build files
- Dependency folders

Example:

```
.env
node_modules/
target/
```

---

# Application Screenshots - Documentation

https://docs.google.com/document/d/1hWY4cykujLEIEq4gKx8ZRyDWc7g4vQOC3u3OvMgOL5o/edit?usp=sharing
[Uploading Game Point User Interface.pdf…]()

---

# Future Development

Planned improvements include:

- User authentication and authorization
- Player profiles
- Profile pictures
- Real-time chat functionality
- Push notifications
- Game history tracking
- Venue booking integration
- Player rating system

---

# Author

**Kent Genovia**

Software Engineering Student  
University of Stirling - Ras Al Khaimah

GitHub:
https://github.com/genoviakent12-rgb

---

## Project Status

Currently under active development.

GamePoint is continuously being improved with new features and optimizations.
