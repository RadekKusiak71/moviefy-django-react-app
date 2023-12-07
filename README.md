# Moviefy - Movie Tracking App

Moviefy is a web application that allows users to explore movies using the IMDb API, add movies to their watchlist. The app is built using React for the frontend and Django for the backend.

## Features

- **User Authentication:**
  - Users can register and log in to the application to personalize their experience.
  - Authentication is handled securely using JWT tokens.

- **Movie Search:**
  - Users can search for movies using the IMDb API.
  - Movie details such as title, release date, overview, and poster are displayed.

- **Watchlist:**
  - Users can add movies to their watchlist for later viewing.
  - Watchlist management is provided, including the ability to delete movies from the watchlist.

## Technologies Used

- **Frontend:**
  - React
  - React Router

- **Backend:**
  - Django
  - Django Rest Framework
  - IMDb API: Integrated to fetch movie details.

- **Authentication:**
  - JWT (JSON Web Tokens): Used for secure user authentication.

## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine.
- Python: Install Python on your system.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd moviefy
   ```
2. **Backend setup:**
    ```bash
    cd backend
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py runserver
    ```
2. **Frontend setup:**
    ```bash
    cd frontend
    npm install
    npm run
    ```
3. **Access Servers:**
    - http://localhost:3000 -> React
    - http://localhost:8000 -> Django