# Detailed Backend Architecture & Team Collaboration Plan

To address your question: **Yes, you absolutely need a server environment, but you will also use Git!** 

Here is why: **Git/GitHub** is used for sharing and tracking your code as a team. However, **PHP and MySQL** cannot run directly inside a web browser like HTML or JavaScript can. They require a "server engine" to process the code and database queries. Since you are building this on your own computers, you install a "local server" (like XAMPP) so your computer acts like a server to test the code, while you use Git to share that code with your team.

Below is a highly structured, step-by-step plan for your team to build the backend and collaborate efficiently.

---

## Phase 1: Team Infrastructure Setup (Git & XAMPP)

Before writing any backend code, the team must have the same working environment.

### 1. Version Control (Git/GitHub)
- **Action:** Create a central GitHub Repository named `YALLA-Backend`.
- **Action:** Upload your current frontend files into this repository.
- **Action:** Every team member must `git clone` this repository to their own computer. This ensures everyone has the exact same starting point.

### 2. Local Server Setup (XAMPP)
- **Action:** Every team member downloads and installs **XAMPP** (this provides Apache for running PHP and MySQL for the database).
- **Action:** Team members must move their cloned Git repository folder into the `C:\xampp\htdocs\` directory.
- **Action:** To view the project, team members will open their XAMPP Control Panel, start "Apache" and "MySQL", and go to `http://localhost/YALLA-Backend` in their browser.

> [!IMPORTANT]  
> **The Golden Rule:** You write code in your `htdocs` folder, test it on `localhost`, and when it works, you use Git to `commit` and `push` the changes to GitHub so the rest of the team gets it.

---

## Phase 2: Database Architecture (phpMyAdmin)

You need a central database structure. Since everyone is running a local server, one person will design the database and share the `.sql` export file via Git so everyone else can import it.

### 1. Create the Database
- Open `http://localhost/phpmyadmin` and create a database named `yalla_db`.

### 2. Define the Tables
You will need the following core tables to make the application dynamic:

**Table 1: `users`**
- `id` (INT, Primary Key, Auto Increment)
- `first_name` (VARCHAR)
- `last_name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `password_hash` (VARCHAR) - *Never store plain text passwords!*

**Table 2: `destinations`**
- `id` (INT, Primary Key, Auto Increment)
- `name` (VARCHAR)
- `theme` (VARCHAR)
- `description` (TEXT)

**Table 3: `wishlist`**
- `id` (INT, Primary Key, Auto Increment)
- `user_id` (INT, Foreign Key linking to users)
- `item_id` (VARCHAR)
- `type` (VARCHAR - e.g., 'destination', 'guide')

**Table 4: `bookings`**
- `id` (INT, Primary Key, Auto Increment)
- `user_id` (INT, Foreign Key)
- `booking_type` (VARCHAR - e.g., 'transport', 'premium_guide')
- `total_price` (DECIMAL)
- `status` (VARCHAR - e.g., 'pending', 'confirmed')

---

## Phase 3: Backend API Development (PHP)

Your team will build a RESTful API. This means creating PHP files that receive requests from the frontend, talk to the database, and return JSON data.

**Folder Structure:** Create an `api/` folder in your project root.
```text
/api
  /config
    - db.php           (Handles the PDO MySQL connection)
  /auth
    - login.php        (Verifies credentials, creates PHP session)
    - signup.php       (Hashes password, inserts new user)
    - logout.php       (Destroys session)
  /user
    - get_profile.php  (Fetches user data)
    - wishlist.php     (Adds/removes items from wishlist table)
```

### Team Work Breakdown:
- **Member A:** Focuses on `/auth` (Login, Signup, Password Hashing).
- **Member B:** Focuses on `/user` (Profile fetching, Wishlist database interactions).
- **Member C:** Focuses on the Bookings and Guides tables.

---

## Phase 4: Frontend Integration (JavaScript)

Currently, your site relies on `localStorage` to pretend a user is logged in. Your team will rewrite the JavaScript to talk to your new PHP files.

**Example Conversion (Login):**
Instead of saving data to localStorage, your JavaScript will look like this:
```javascript
fetch('api/auth/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: userEmail, password: userPassword })
})
.then(response => response.json())
.then(data => {
    if (data.status === 'success') {
        window.location.href = 'dashboard.html';
    } else {
        alert(data.error_message);
    }
});
```

---

## Phase 5: Team Git Workflow

To prevent team members from deleting each other's code, follow this structured Git workflow:

1. **Main Branch:** The `main` branch on GitHub should only contain working code.
2. **Feature Branches:** When Member A works on login, they type `git checkout -b feature-login`.
3. **Pushing:** Once login works, Member A pushes the branch to GitHub and creates a "Pull Request".
4. **Review & Merge:** The team reviews the code. If it looks good, it is merged into `main`.
5. **Syncing:** Every day, all members type `git pull origin main` to get the latest changes from the rest of the team.

## Open Questions for You

1. Does this architecture and workflow make sense for your team?
2. Would you like me to generate the exact PHP code for `db.php` and the SQL commands so your team has a perfect starting template to copy and paste?
