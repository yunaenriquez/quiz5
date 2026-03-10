# Local Food Guide (Pampanga Focus)

Quiz frontend built with React + Redux.

## Frontend Coverage

Screens/pages:

- `LoginScreen`
- `RegisterScreen`
- `HomeScreen`

Components:

- `FormComponent`
- `Loader`
- `Message`
- `ConversationItem`
- `EmptyState` (welcome screen)

## Behavior Rules Implemented

- Recommends specific Kapampangan dishes or local eateries in Pampanga.
- Rejects non-food prompts.
- Rejects requests that ask for places outside Pampanga.
- Uses backend API calls only (no dummy data in frontend state flow).

## API Configuration

Frontend API client:

- `frontend/src/app/api.js`

Default base URL:

- `http://localhost:8000/api`

Override with environment variable:

- `REACT_APP_API_BASE_URL`

Guide endpoint used by frontend:

- `POST /chat/` with body `{ "message": "..." }`

## Run Frontend

```bash
npm --prefix frontend install
npm --prefix frontend start
```
