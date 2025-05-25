# Environment variables reference

The API sever in development mode reads configuration from the `.env` file in the root folder of the project.
The same file is used by the API tests.
In production, it is good practice to use environment variables instead of the `.env` file.

## Environment variables

```.env
# Application
PORT=
NODE_ENV=
CORS_ORIGIN=

# Database
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_SYNCHRONIZE=

# Relax
RELAX_PARTNER=
RELAX_PARTNER_ID=
RELAX_LAUNCHER_URL=

RELAX_PLAYER_COUNTRYCODE=
RELAX_PLAYER_JURISDICTION=

BASIC_AUTH_ENABLED=
BASIC_AUTH_USERNAME=
BASIC_AUTH_PASSWORD=

# JWT Configuration
JWT_SECRET=
JWT_LIFETIME_MINUTES=
```

*Note:* Use single quotes for string values in the `.env` file containing special characters, e.g. `BASIC_AUTH_PASSWORD='P@s$w0rd'`.

| Variable              | Description |
| -----------           | ----------- |
| `PORT`         | Specifies the port number on which a server listens for incoming connections from clients. |
| `NODE_ENV`            | Defines the application running mode. Possible values: `development`, `production`. |
| `CORS_ORIGIN`         | Specifies the allowed origin for CORS requests. If not set, defaults to '*' (all origins). |
| `DB_HOST`             | Specifies the hostname or IP address of the database server. |
| `DB_PORT`             | Represents the port number on which the database server is listening for connections. |
| `DB_USERNAME`         | Represents the username used to authenticate with the database server. |
| `DB_PASSWORD`         | Represents the password associated with the username used to authenticate with the database server. |
| `DB_DATABASE`         | Specifies the name of the database to which the application should connect. |
| `DB_SYNCHRONIZE`      | Whether to synchronize the database schema with the annotated entities (should be false in production). |
| `RELAX_PARTNER`       | Specifies the partner for the Relax platform. |
| `RELAX_PARTNER_ID`    | Specifies the partner ID for the Relax platform. |
| `RELAX_LAUNCHER_URL`  | Specifies the URL to launch games in the Relax platform. |
| `RELAX_PLAYER_COUNTRYCODE`| Specifies the country code for the player. Must be "US" for the social casino. |
| `RELAX_PLAYER_JURISDICTION`| Specifies the jurisdiction for the player. Must be "MI" for the social casino. |
| `BASIC_AUTH_ENABLED`  | Whether to enable basic authentication. Set the value to **1** to turn it on. |
| `BASIC_AUTH_USERNAME` | A username to protect relax webhook URLs. Only required if `BASIC_AUTH_ENABLED` is set to **1**. |
| `BASIC_AUTH_PASSWORD` | A password to protect relax webhook URLs. Only required if `BASIC_AUTH_ENABLED` is set to **1**. |
| `JWT_SECRET`          | A secret key used for signing and verifying JWT tokens. |
| `JWT_LIFETIME_MINUTES`| The lifetime of JWT tokens in minutes. Works only for the demo user JWT tokens. |