# MVC [![Circle CI](https://circleci.com/gh/AlexKvazos/MVC.svg?style=svg)](https://circleci.com/gh/AlexKvazos/MVC)

MVC Framework for quick API development and browserified clientside applications.
Best for React, Angular, Ember, and other SPA frameworks.

## Getting started

```bash
$ git clone git@github.com:AlexKvazos/MVC.git
$ cd MVC
$ npm install

# Rename .env.default to .env and change config parameters

$ npm start
```

`npm install` will automatically perform the necessary tasks to bundle the app.

## Development

#### Npm Tasks

* `npm run dev` Run development server with auto-restarts, automatic less compiling, automatic javascript transpiling, and browser refresh
* `npm run build` Bundle application with compression and no source mapping

_Note: Source maps will only be generated when the bundle is built by 'npm run dev'_

## Testing
```bash
$ npm test
```
