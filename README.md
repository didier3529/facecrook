# facecrook

A React single?page application parodying crypto mania with spoof personas, a satirical social feed, AI-driven character chat, in-app token gamification, mock NFT minting, and a premium store.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Components & Services](#components--services)
7. [Dependencies](#dependencies)
8. [Project Structure](#project-structure)
9. [Configuration](#configuration)
10. [Testing & CI/CD](#testing--ci-cd)
11. [Roadmap](#roadmap)
12. [Contributing](#contributing)
13. [License](#license)

---

## Project Overview

FaceCrook is a tongue-in-cheek social platform that lets you:

- Create **fake crypto identities** (aliases, bios, avatars)
- Post and react to **memes** and media in an infinite-scroll parody feed
- Chat with AI impersonations of famous figures (Elon, Satoshi, etc.)
- Earn and spend **in-app tokens**, view real-time balances, and compete on leaderboards
- Mint and share **mock NFTs** via IPFS or simulated blockchain
- Purchase premium avatar frames and item packs in a token-based store

Built with React, React Router, Context API, Tailwind CSS, and backed by REST/WebSocket APIs, AI services, S3/IPFS, and Dockerized local environments.

---

## Features

- **Onboarding Wizard**: Multi-step alias, bio, avatar setup
- **Infinite-scroll Feed**: PostComposer + live PostCard updates
- **Reactions & Threaded Comments**: Token-rewarding reaction buttons and nested comments
- **AI Parody Chat**: Converse with spoof personas powered by OpenAI
- **Token Gamification**: Earn tokens for engagement, real-time balance via WebSockets
- **Leaderboards**: Daily and weekly rankings of top token earners
- **Mock NFT Minting**: Pin media to IPFS or simulate chain mint, viewable in a gallery
- **Premium Store**: Spend tokens on avatar frames, packs, and other cosmetic upgrades
- **User Settings & Privacy**: Manage account and opt-in preferences
- **Global Error & Loading Handling**: ErrorBoundary and LoadingSpinner components

---

## Architecture

### Client (React)

- **Entry**: `index.js` ? renders `App.jsx`
- **Routing**: `AppRouter.jsx` (public vs. protected via `ProtectedRoute.jsx`)
- **State Management**: Contexts
  - `AuthContext.jsx`
  - `ApiContext.jsx`
  - `TokenContext.jsx`
  - `ChatContext.jsx`
  - `NftContext.jsx`
  - `LeaderboardContext.jsx`
- **Styling**: Tailwind CSS (`tailwind.config.js`)
- **Services** (in `/services`):
  - `authService.js`
  - `apiService.js`
  - `aiChatService.js`
  - `fileUploadService.js`
  - `socketService.js`
  - `tokenService.js`
  - `nftService.js`
  - `leaderboardService.js`
  - `analyticsService.js`
- **Utilities**: `validation.js`, `errorHandling.js`, `useDebounce.js`, `constants.js`

### Server

- Node.js + Express (or GraphQL) APIs for auth, posts, tokens, chat logs
- AWS S3 for media uploads
- Socket.io for real-time updates
- OpenAI integration for AI chat
- IPFS or mock chain for NFT pinning/minting

---

## Installation

1. Clone the repo
   ```bash
   git clone https://github.com/your-org/facecrook.git
   cd facecrook
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file at project root with:
   ```env
   REACT_APP_API_BASE_URL=https://api.facecrook.local
   REACT_APP_AWS_S3_BUCKET=your-s3-bucket
   REACT_APP_OPENAI_KEY=sk-yourkey
   REACT_APP_IPFS_ENDPOINT=https://ipfs.infura.io:5001
   ```
4. Start local development
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

---

## Usage

- **Onboard**: Visit `/` ? complete alias/bio/avatar wizard
- **Feed**: Post memes, react, comment, watch for live updates
- **Chat**: Navigate to `/chat` ? select a persona ? start messaging
- **Tokens**: View your balance in the navbar; earn with reactions & posts
- **Leaderboards**: See rankings at `/leaderboard` (daily/weekly filters)
- **Mint NFT**: Click ?Mint NFT? on a PostCard ? view in `/nft-gallery`
- **Store**: Spend tokens on avatar frames at `/store`
- **Settings**: Update account and privacy at `/settings`

---

## Components & Services

### Context Providers

- **AuthContext**: Manages user authentication state & JWT refresh
- **ApiContext**: Centralizes API client config & headers
- **TokenContext**: Tracks token balance; handles real-time updates
- **ChatContext**: Maintains AI chat session state
- **NftContext**: Manages mock NFT gallery & minting
- **LeaderboardContext**: Provides leaderboard data & refresh methods

### Pages / Views

- `OnboardingWizard.jsx`
- `FeedView.jsx`
- `ChatList.jsx`
- `ChatWindow.jsx`
- `LeaderboardView.jsx`
- `NftGalleryView.jsx`
- `PremiumStorePage.jsx`
- `SettingsPage.jsx`

### UI Components

- `NavBar.jsx` + `TokenBalanceIndicator.jsx`
- `PostComposer.jsx`
- `PostCard.jsx`
- `ReactionButton.jsx`
- `CommentThread.jsx`
- `ProtectedRoute.jsx`
- `ErrorBoundary.jsx`
- `LoadingSpinner.jsx`

### Services (in `/services`)

- **authService.js**: Signup, login, token refresh
- **apiService.js**: Axios wrapper for REST endpoints
- **aiChatService.js**: Prompts & responses via OpenAI
- **fileUploadService.js**: Media uploads to S3
- **socketService.js**: WebSocket / Socket.io integration
- **tokenService.js**: Token earning logic & sync
- **nftService.js**: Mock NFT minting & IPFS pinning
- **leaderboardService.js**: Leaderboard fetching & caching
- **analyticsService.js**: Event logging

### Utilities

- `validation.js`, `errorHandling.js`, `useDebounce.js`, `constants.js`

---

## Dependencies

- React 18+
- react-router-dom v6
- Tailwind CSS
- Axios
- Socket.io-client
- OpenAI SDK
- AWS SDK (S3)
- ipfs-http-client
- classnames
- date-fns (or dayjs)

Dev & Tooling:

- ESLint, Prettier, Husky
- Jest & React Testing Library
- Storybook
- Docker

---

## Project Structure

```
facecrook/
?? public/
?? src/
?  ?? components/
?  ?? contexts/
?  ?? services/
?  ?? utils/
?  ?? App.jsx
?  ?? AppRouter.jsx
?  ?? index.js
?? tailwind.config.js
?? package.json
?? .env.example
```

---

## Configuration

- Tailwind: `tailwind.config.js` + global CSS resets
- Axios: base URL & interceptors in `apiService.js`
- WebSocket: `socketService.js` connects on auth
- OpenAI: key in `REACT_APP_OPENAI_KEY`

---

## Testing & CI/CD

- Run tests:
  ```bash
  npm test
  # or
  yarn test
  ```
- Storybook:
  ```bash
  npm run storybook
  ```
- Lint & format:
  ```bash
  npm run lint
  npm run format
  ```
- CI with GitHub Actions: build, test, lint on push
- Docker: development & production Dockerfiles
- Error monitoring: Sentry integration

---

## Roadmap

- Complete missing service modules & contexts
- Flesh out ChatWindow, PremiumStorePage, SettingsPage
- Add unit & integration tests
- Integrate Storybook stories for all components
- Enhance CI/CD workflows & Docker compose
- Production hardening & Sentry error tracking

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m "feat: add ?"`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) and [Contributing Guidelines](CONTRIBUTING.md).

---

## License

MIT ? Your Name / Organization

---

_Happy spoofing!_
