# YALLA — Morocco Travel Portal

YALLA is a travel portal for discovering Morocco ahead of the **2030 FIFA World Cup**: explore 23 destinations, plan a stay city by city (restaurants, accommodation, activities), book World Cup travel packages and private guides, and keep a wishlist.

Built by **Youssra Haddouch** and **[@louzz333](https://github.com/louzz333)**.

## Features

- **Landing page** with Morocco's iconic cities, an interactive map and traveler reviews
- **Destinations**: 23 Moroccan cities loaded from the API, filterable by theme, weather and budget
- **City planner**: restaurants, accommodation and activities for each city, with booking and checkout
- **World Cup 2030 packages**: official match and travel tours
- **Premium guides**: browse and book private local guides
- **Accounts**: sign up, sign in and profile management backed by the database (hashed passwords, JWT sessions)
- **My Trips**: every booking (World Cup packages, guides, activities, transport tickets) saved to the database and shown on the dashboard
- **Wishlist** synced across devices, **traveler reviews** on the homepage, and a **user profile** with site preferences

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
   Already have an older `yalla_db`? Run the files in `database/migrations/` in order instead.
2. Configure and start the backend:
   ```bash
   cd backend
   cp .env.example .env    # then set your MySQL user/password and a random JWT_SECRET
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
| POST | `/api/auth/signup` | Create an account, returns a token |
| POST | `/api/auth/login` | Sign in, returns a token |
| GET | `/api/auth/me` | Current user 🔒 |
| PUT | `/api/users/me` | Update profile (name, phone, avatar, preferences…) 🔒 |
| PUT | `/api/users/me/password` | Change password 🔒 |
| GET / POST | `/api/wishlist` | List / save wishlist items 🔒 |
| DELETE | `/api/wishlist/:type/:id` | Remove a wishlist item 🔒 |
| GET / POST | `/api/bookings` | List / create bookings (World Cup, guides, activities, transport) 🔒 |
| PATCH | `/api/bookings/:id/cancel` | Cancel one of your bookings 🔒 |
| GET | `/api/reviews` | Latest traveler reviews |
| POST | `/api/reviews` | Post a review (1–5 stars) 🔒 |

🔒 = requires an `Authorization: Bearer <token>` header. Passwords are hashed with bcrypt and sessions use signed JWTs (7 days).
