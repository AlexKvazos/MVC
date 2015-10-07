# MVC [![Circle CI](https://circleci.com/gh/AlexKvazos/MVC.svg?style=svg)](https://circleci.com/gh/AlexKvazos/MVC)

MVC Framework for quick API development and browserified clientside applications.
Best for React, Angular, Ember, and other SPA frameworks.

## Getting started

```bash
$ git clone git@github.com:AlexKvazos/MVC.git
$ cd MVC
$ npm install
$ npm start
```

`npm install` will automatically perform the necessary Gulp tasks to bundle the app.

## Development

#### Gulp Tasks

* `gulp lint` Test javascript code against ESLint
* `gulp start` Development task with LiveReload and auto-bundle with sourcemaps
* `gulp build` Build app for production

_Note: Sourcemaps will only be generated when the bundle is rebuilt by 'gulp start'_

## Testing
```bash
$ npm test
```
