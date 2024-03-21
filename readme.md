# support.badgerherald.org 💙📰

WordPress theme & dev ops for [support.badgerherald.org](support.badgerherald.org)

## Compiling the theme

The WordPress theme is a Single Page Application built with [Stencil](https://stenciljs.com/docs/introduction) component. These components load their data from the WordPress API using [webpress](https://github.com/wjhdev/webpress).

1. Install [Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), then:
2. From the root of the repo, run

```
npm install
npm run build
```

To watch for changes (during development) instead run:

```
npm run start
```

## Running a local development server at https://192.168.19.10

To run a development WordPress server locally:

1. Copy `dev.env` to `.env`
2. Install docker
3. Run:

```bash
docker-compose up
```
