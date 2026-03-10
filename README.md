# Local Food Guide (Pampanga Focus)

Frontend-only repository for quiz submission.

## Project Structure

- `frontend/` React + Redux UI

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm start
```

## Required UI Coverage

Implemented screens/pages:

- `LoginScreen`
- `RegisterScreen`
- `HomeScreen`

Implemented components:

- `FormComponent`
- `Loader`
- `Message`
- `ConversationItem`
- `EmptyState` (Welcome screen)

## Dummy Data Policy

Dummy data is enabled by default in frontend through `VITE_USE_DUMMY_DATA=true`.

To integrate a real backend later:

- Set `VITE_USE_DUMMY_DATA=false` in `frontend/.env`
- Set `VITE_API_BASE_URL` to your API URL in `frontend/.env`

The frontend already calls centralized API routes via `frontend/src/app/api.js`.

## Screenshot Checklist for Submission

- UI screenshots for:
  - Login screen
  - Register screen
  - Home screen (with recommendation results)
