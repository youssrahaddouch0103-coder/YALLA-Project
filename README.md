# YALLA — Morocco Travel Portal

YALLA is a travel portal for discovering Morocco ahead of the **2030 FIFA World Cup**: explore 23 destinations, plan a stay city by city (restaurants, accommodation, activities), book World Cup travel packages and private guides, and keep a wishlist.

Built by **Youssra Haddouch** and **[@louzz333](https://github.com/louzz333)**.

## Features

- **Landing page** with Morocco's iconic cities, an interactive map and traveler reviews
- **Destinations**: 23 Moroccan cities loaded from the API, filterable by theme, weather and budget
- **City planner**: restaurants, accommodation and activities for each city, with booking and checkout
- **World Cup 2030 packages**: official match and travel tours
- **Premium guides**: browse and book private local guides
- **Wishlist** and **user profile** with site preferences

## Tech stack

| Layer | Technology |
|---|---|
| Front-end | HTML, CSS, vanilla JavaScript |
| Back-end | Node.js, Express 5 |
| Database | MySQL / MariaDB (`mysql2`) |

## Project structure

```
frontend/    # static website (pages, scripts, styles, images)
backend/     # Express REST API, also serves the frontend
database/    # yalla_db.sql: schema + seed data
```

## Getting started

Prerequisites: Node.js 18+ and MySQL or MariaDB (XAMPP works).

1. Create the database and load the data:
   ```bash
   mysql -u root -p < database/yalla_db.sql
   ```
2. Configure and start the backend:
   ```bash
   cd backend
   cp .env.example .env    # then set your MySQL user and password
   npm install
   npm start               # or `npm run dev` to reload on changes
   ```
3. Open **http://localhost:3000**. The backend serves both the website and the API.

## API

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/destinations` | All destinations, most popular first |
| GET | `/api/destinations/:id` | One destination |
| GET | `/api/restaurants/:city_id` | Restaurants in a city |
| GET | `/api/accommodations/:city_id` | Accommodation in a city |
| GET | `/api/activities/:city_id` | Activities in a city |
