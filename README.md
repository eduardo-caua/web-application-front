# web-application-front

This a single page application to manage users. The base code is written in <a href="https://nestjs.com/" target="_blank">Typescript</a> with <a href="https://reactjs.org/" target="_blank">React</a> library and <a href="https://mui.com/" target="_blank">Material UI</a>.

## Features
* Users Management
* Users Report

## Next Steps
- Features
  - Question modal instead of native alerts to capture users approve
  - Authentication with JWT
- Architecture
  - Should we use selectors?
  - Service worker to handle connection problems
- Security
  - Http only to manage cookies/sessions

## Installation

```bash
$ make install
```

## Running the app

### locally

```bash
$ make dev
```

### via Docker

```bash
$ docker-compose up
```

## Test

```bash
$ make test
```

## Build

```bash
$ make build
```

## License

[MIT licensed](LICENSE).
