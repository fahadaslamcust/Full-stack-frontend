# campus-connect (Frontend)

## Frontend Technology / Stack

This project is a **React single-page application (SPA)** built with **Vite**.

### Core framework
- **React 19** (`react`, `react-dom`)
- **React Router DOM** (`react-router-dom`) for client-side routing

### Build & tooling
- **Vite** (dev server + production bundling)
- **ESLint** for linting
- **Vite React plugin** (`@vitejs/plugin-react`)
- **React Compiler** enabled via the React Vite plugin preset

### Styling
- **Tailwind CSS** (`tailwindcss`, `@tailwindcss/vite`)

### State / data fetching
- **@tanstack/react-query** for server-state management
- **React Query Devtools** (`@tanstack/react-query-devtools`)

### UI & UX libraries
- **Toast notifications**: `react-toastify`
- **Icons**: `lucide-react`, `react-icons`
- **Emoji picker**: `emoji-picker-react`

### Internationalization (i18n)
- **i18next** + **react-i18next**
- Locales located in `src/locales/` (e.g., `en.json`, `fr.json`, `ur.json`)

### Authentication-related integration
- **Google OAuth** via `@react-oauth/google`
- Also includes code/hooks for **Facebook/Google auth** (see `src/components/auth/` and `src/hooks/`)

### Networking (API + realtime)
- **REST API client**: `axios` (`src/api/client.js`)
  - Base URL: `https://full-stack-backend-d1g9.onrender.com/api/v1`
  - Adds `Authorization: Bearer <token>` from `localStorage`
- **Realtime**: `socket.io-client`
  - Socket connection is managed by `src/context/SocketContext.jsx`

## Project Purpose (high level)
The UI provides pages for login/signup, dashboard features (events, posts, messages, search, settings, notifications), and user profile flows, with realtime messaging support through Socket.IO.

---

## Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

