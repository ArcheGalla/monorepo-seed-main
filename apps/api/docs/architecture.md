# Architecture

## Overview

The Relax webhooks are implemented within the relax module. There are two groups of endpoints:
- Endpoints that are called from the browser ([UI Integration](/ui-integration.md))
- Endpoints that are called from the relax backend ([Webhooks](/webhooks.md))

The module stores all the required data in the PostgreSQL database. The data is stored in the following tables:

- relax_tokens: Stores the player tokens and their associated game IDs
- relax_transactions: Stores the transactions: deposits, withdrawals, rollbacks
- relax_wallets: Stores the player wallets

There is no table to store the player data, as everything the module needs to know about the user is stored in the JWT token.

There is no API to create user wallets at the moment, but this can be added in the future. The initial migration creates two wallets for the Demo user (ID 2d63516e-496c-4ac7-a8c3-233723735c59) with the following balances:

- GC. wallet: 100000
- SC. wallet: 100000