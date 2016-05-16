# [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url]

gulp-examplejs
-----

> Code block processing with [examplejs](https://github.com/zswang/gulp-examplejs).

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-examplejs`

## Usage

```javascript
var examplejs = require('gulp-examplejs');

gulp.task('dist', function() {
  return gulp.src('lib/*.js')
    .pipe(examplejs())
    .pipe(gulp.dest('dist'));
});
```

## Options

- `desc`

  Test case description

- `timeout`

  Test case timeout

## License

MIT © [zswang](http://weibo.com/zswang)

[npm-url]: https://npmjs.org/package/gulp-examplejs
[npm-image]: https://badge.fury.io/js/gulp-examplejs.svg
[travis-url]: https://travis-ci.org/zswang/gulp-examplejs
[travis-image]: https://travis-ci.org/zswang/gulp-examplejs.svg?branch=master
[coverage-url]: https://coveralls.io/github/zswang/gulp-examplejs?branch=master
[coverage-image]: https://coveralls.io/repos/zswang/gulp-examplejs/badge.svg?branch=master&service=github
