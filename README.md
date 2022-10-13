# Nest.js CRUD with onion architecture

## API documentation
See [Redoc](https://nestjs-crud-filters.vercel.app)

## Running the app in Docker environment
This mode includes PostgreSQL, Nginx, Cadvisor, Prometheus, Loki, Grafana, Promtail and other stuff for monitoring the infrastructure (like node-exporter, nginx-exporter, postgres-exporter). But first, you have to rename `.env.sample` to `.env` and filling empty values.
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
```
