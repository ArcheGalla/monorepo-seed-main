# UI Integration

## Launch endpoint

For the social casino UI the API server exposes **launch** ednpoint.

URL: `/api/relax/launch`

Method: `POST`

Request Body:

```json
{
  "gameid": "moneytrain4",
  "channel": "web",
  "currency": "GC."
}
```

Response Body:

```json
{
  "gameUrl": "https://relax-api.example.com/api/relax/launch?gameid=moneytrain4&channel=web&moneymode=real&partner=2d63516e-496c-4ac7-a8c3-233723735c59&partnerid=2d63516e-496c-4ac7-a8c3-233723735c59&ticket=a0176dc9-4c4a-43c8-8964-f3484fadf8d3"
}
```

The base URL is configured in the [environment variables](/environment.md).

## Launch endpoint security

The launch endpoint is secured with JWT token. The token must be passed in the `Authorization` header in the format `Bearer <token>` and contain the `sub` claim. The token is verfied with the JWT secret configured in the  [environment variables](/environment.md). The `sub` claim is the player ID, which is used to identify the player in the database. It must be a valid UUID v4.

## Demo user JWT

It is possible to get a Demo user JWT token with the `/api/demo/jwt` endpoint.

URL: `/api/demo/jwt`

Method: `GET`

Response Body:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyZDYzNTE2ZS00OTZjLTRhYzctYThjMy0yMzM3MjM3MzVjNTkiLCJpYXQiOjE3NDc4MTQ3MTUsImV4cCI6MTc0NzgxODMxNX0.Qgt9oAp_oaFA5OiZVJsAIb9nY3RM4FOoMSbS1v-ZgbU"
}
```