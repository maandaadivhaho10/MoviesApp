# StreamHub (Movies App)

A responsive React + Vite application for discovering popular movies with a cinematic hero carousel, quick details (year, rating), search, and navigation. Data is fetched from The Movie Database (TMDB) API.

## Project Overview

- **Tech stack**: React 19, Vite 7, Tailwind CSS v4, React Router, Lucide Icons
- **Key features**:
  - Featured hero slider with background artwork, title, year, and rating
  - Movie details navigation via CTA
  - Responsive layout with mobile/desktop search in the navbar
  - Clean UI with modern components

## Setup Steps

1. **Prerequisites**

   - Node.js 18+ and npm

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure API key (TMDB)**

   - Create a free account and API key at: https://www.themoviedb.org/
   - Recommended: use a Vite environment variable
     - Create a file named `.env.local` in the project root (`MoviesApp`):
       ```bash
       VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE
       ```
     - In code, you can read it using `import.meta.env.VITE_TMDB_API_KEY`.
   - Note: The project currently demonstrates usage with a hardcoded key in `src/components/HeroSection.jsx`. For security and flexibility, switch to the env-based key above.

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   - Open the printed local URL in your browser (e.g., http://localhost:5173).

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview the production build**
   ```bash
   npm run preview
   ```

## API Used

- **Provider**: The Movie Database (TMDB)
- **Base URL**: `https://api.themoviedb.org/3`
- **Image Base**: `https://image.tmdb.org/t/p/`
  - Hero uses original size: `https://image.tmdb.org/t/p/original`
- **Endpoints referenced**:
  - Popular Movies: `GET /movie/popular`
    - Common query params:
      - `api_key`: your TMDB API key
      - `language`: e.g., `en-US`
      - `page`: pagination (1..N)

### Example (fetch popular movies)

```js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // recommended
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchPopular() {
  const res = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  return res.json();
}
```

## Notes and Recommendations

- **Rate limits**: TMDB enforces request limits; cache or debounce requests when possible.
- **Security**: API keys in client apps are exposed. For production, consider a backend proxy to keep secrets server-side.
- **Styling**: Tailwind CSS v4 is used via the official Vite integration.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — build for production
- `npm run preview` — preview production build locally

## Folder Structure (key folders)

- `src/components` — UI components (e.g., `HeroSection.jsx`, `Navbar.jsx`)
- `src/pages` — routed pages
- `public` — static assets

---

If you need me to switch the code to use `.env` automatically, say “convert TMDB key to env” and I’ll apply the change end-to-end.
