# 🎙️ Podcast Explorer

## Overview

A React application that allows users to browse, search, filter, and explore podcasts. Users can view detailed podcast information, browse seasons and episodes, and navigate through an intuitive, responsive interface. Built to practice React state management, routing, context, API integration, and dynamic user interfaces.

## 📱 Features

- Browse podcasts from a live API
- Search podcasts by title (live filtering)
- Sort podcasts by newest, oldest, A–Z, or Z–A
- Filter podcasts by genre
- Responsive pagination
- View detailed podcast information
- Display podcast artwork, description, genres, last updated date, seasons, and total episodes
- Expand seasons to view episode lists
- Season dropdown navigation with automatic scrolling to the selected season
- Display season artwork alongside every episode
- Shortened episode descriptions for improved readability
- Responsive layout for desktop and mobile devices

## ⚙️ Setup

```bash
npm install
npm run dev
```

## 📡 API

Podcast data is fetched from:

https://podcast-api.netlify.app/shows

Podcast details are fetched from:

https://podcast-api.netlify.app/id/:id

Genres are mapped locally using `data.js`.