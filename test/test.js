'use strict';

var examplejs = require('../');
var gutil = require('gulp-util');
var should = require('should');
var fs = require('fs');

function generateFile(contents) {
  contents = contents || '';

  return new gutil.File({
    path: './testfile.js',
    cwd: './',
    base: './',
    contents: new Buffer(contents)
  });
}

function expect_equals(options, input, output, done) {
  var stream = examplejs(options);

  stream.on('data', function (file) {
    String(file.contents).should.equal(output);
    done();
  });

  stream.write(generateFile(input));
  stream.end();
}

describe('fixtures', function () {
  it('case1', function (done) {
    var input = 'console.log(1)';
    var output = '';
    expect_equals(null, input, output, done);
  });

  it('case2 base', function (done) {
    var input = "'@example\n\`\`\`js\nconsole.log(1);\n// > 1\n\`\`\`'";
    var output = "\ndescribe(\"testfile.js\", function () {\n  var assert = require('should');\n  var util = require('util');\n  var examplejs_printLines;\n  function examplejs_print() {\n    examplejs_printLines.push(util.format.apply(util, arguments));\n  }\n  \n  \n\n  it(\"none\", function () {\n    examplejs_printLines = [];\nexamplejs_print(1);\nassert.equal(examplejs_printLines.join(\"\\n\"), \"1\"); examplejs_printLines = [];\n  });\n          \n});\n         ";
    expect_equals({}, input, output, done);
  });

  it('case3 options.timeout', function (done) {
    var input = "'@example\n\`\`\`js\nconsole.log(1);\n// > 1\n\`\`\`'";
    var output = "\ndescribe(\"testfile.js\", function () {\n  var assert = require('should');\n  var util = require('util');\n  var examplejs_printLines;\n  function examplejs_print() {\n    examplejs_printLines.push(util.format.apply(util, arguments));\n  }\n  \n  this.timeout(1234);\n\n  it(\"none\", function () {\n    examplejs_printLines = [];\nexamplejs_print(1);\nassert.equal(examplejs_printLines.join(\"\\n\"), \"1\"); examplejs_printLines = [];\n  });\n          \n});\n         ";
    expect_equals({
      timeout: 1234
    }, input, output, done);
  });

  it('case4  options.head', function (done) {
    var input = "'@example\n\`\`\`js\nconsole.log(1);\n// > 1\n\`\`\`'";
    var output = "var fs = require('fs');\n\ndescribe(\"testfile.js\", function () {\n  var assert = require('should');\n  var util = require('util');\n  var examplejs_printLines;\n  function examplejs_print() {\n    examplejs_printLines.push(util.format.apply(util, arguments));\n  }\n  \n  \n\n  it(\"none\", function () {\n    examplejs_printLines = [];\nexamplejs_print(1);\nassert.equal(examplejs_printLines.join(\"\\n\"), \"1\"); examplejs_printLines = [];\n  });\n          \n});\n         ";
    expect_equals({
      head: 'head.js'
    }, input, output, done);
  });

  it('case5 options.header', function (done) {
    var input = "'@example\n\`\`\`js\nconsole.log(flag);\n// > 1\n\`\`\`'";
    var output = "var flag = 1;\n\ndescribe(\"testfile.js\", function () {\n  var assert = require('should');\n  var util = require('util');\n  var examplejs_printLines;\n  function examplejs_print() {\n    examplejs_printLines.push(util.format.apply(util, arguments));\n  }\n  \n  \n\n  it(\"none\", function () {\n    examplejs_printLines = [];\nexamplejs_print(flag);\nassert.equal(examplejs_printLines.join(\"\\n\"), \"1\"); examplejs_printLines = [];\n  });\n          \n});\n         ";
    expect_equals({
      header: 'var flag = 1;'
    }, input, output, done);
  });
});

describe('null', function () {
  it('does nothing', function (done) {
    var file = new gutil.File({
      contents: null
    });
    var stream = examplejs();
    stream.on('data', function (file) {
      done();
    });
    stream.write(file);
    stream.end();
  });
});

describe('Streaming not supported', function () {
  it('does nothing', function (done) {
    var file = new gutil.File({
      path: 'test/fixtures/hello.js',
      cwd: 'test',
      base: 'test/fixtures',
      contents: new fs.createReadStream('test/fixtures/hello.js')
    });
    var stream = examplejs({});
    stream.on('error', function (err) {
      done();
    });
    stream.write(file);
    stream.end();
  });
});
