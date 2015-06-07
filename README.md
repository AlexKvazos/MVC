# MVC

[![Circle CI](https://circleci.com/gh/AlexKvazos/MVC.svg?style=svg)](https://circleci.com/gh/AlexKvazos/MVC)
[![Dependency Status](https://david-dm.org/AlexKvazos/MVC.svg)](https://david-dm.org/AlexKvazos/MVC)

## Getting started

```bash
$ git clone git@github.com:AlexKvazos/MVC.git
$ cd MVC
$ npm install   // this will also run bower install and gulp build
$ npm start
```

## Gulp Tasks

* **gulp lint** Test javascript code against ESLint
* **gulp serve** Start server and (restart when server side code changes) && (re-bundle client side js when client code changes)
* **gulp build** Build application

_Note: Client code will only have sourcemaps if process.env.NODE\_ENV === 'development'_

## Testing
```bash
$ npm test
```
