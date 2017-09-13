# siggame/colisee-matchmaker

Service to schedule matchups between teams using different types of scheduling.

[![Travis](https://img.shields.io/travis/siggame/colisee-matchmaker.svg?style=flat-square)](https://travis-ci.org/siggame/colisee-matchmaker)
[![Docker Pulls](https://img.shields.io/docker/pulls/colisee-matchmaker/registre.svg?style=flat-square)](https://hub.docker.com/r/siggame/colisee-matchmaker/)
[![GitHub release](https://img.shields.io/github/release/siggame/colisee-matchmaker.svg?style=flat-square)](https://github.com/siggame/colisee-matchmaker/releases)
[![Dependencies](https://img.shields.io/david/siggame/colisee-matchmaker.svg)](https://github.com/siggame/colisee-matchmaker)

## Table Of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributors](#contributors)
- [Change Log](#change-log)
- [License](#license)
- [Contributing](#contributing)

## Description

A long description of the project.

## Getting Started

Using docker.

```bash
docker pull siggame/colisee-matchmaker
```

Using npm.

```bash
npm run setup
```

## Usage

Create `.env` file. (See [.env options](#environment-options))

```bash
echo "PORT=8080" > .env
```

Using docker.

```bash
docker run --init --rm --env-file .env -p 8080:8080 siggame/colisee-matchmaker
```

Using npm.

```bash
npm run start:prod
```

### Environment Options

- `INTERVAL`: the interval at which new matchups will be generated.
- `MAX`: maximum number of queued games.
- `PORT`: the port for the matchmaker to listen on.
- `REPLICATIONS`: number of times to replicate a matchup.

## Contributors

- [Russley Shaw](https://github.com/russleyshaw)
- [user404d](https://github.com/user404d)
- [Hannah Reinbolt](https://github.com/LoneGalaxy)
- [Matthew Qualls](https://github.com/MatthewQualls)
- [Dylan Warren](https://github.com/Uhuh)

## Change Log

View our [CHANGELOG.md](https://github.com/siggame/colisee-matchmaker/blob/master/CHANGELOG.md)

## License

View our [LICENSE.md](https://github.com/siggame/colisee/blob/master/LICENSE.md)

## Contributing

View our [CONTRIBUTING.md](https://github.com/siggame/colisee/blob/master/CONTRIBUTING.md)
