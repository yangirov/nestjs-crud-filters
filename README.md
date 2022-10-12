# CRUD with Nest.js
With onion architecture.

## Running the app in Docker environment
This mode includes PostgreSQL, Nginx, Cadvisor, Prometheus, Loki, Grafana, Promtail and other stuff for monitoring the infrastructure (like node-exporter, nginx-exporter, postgres-exporter)
```
# docker-compose up --build -d 
```

## Installation

```bash
$ npm install
```

## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``
