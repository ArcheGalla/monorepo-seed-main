# Webhooks

## Overview

Relax Provider API supports the following webhooks:

- verifyToken
- getBalance
- withdraw
- deposit
- rollback

They are all exposed under the `/api/relax` prefix, e.g. `/api/relax/verifyToken`.

## Webhooks security

Webhooks can be optionally secured with the basic authentication configured in the environment variables.