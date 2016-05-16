/**
 * @file gulp-examplejs
 *
 * A tool for converting example code into test cases
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 0.0.4
 * @date 2016-05-17
 */
var examplejs = require('examplejs');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = require('gulp-util/lib/PluginError');
var pluginName = 'gulp-examplejs';
var fs = require('fs');
var url = require('url');
var path = require('path');
/**
 * 创建异常对象
 *
 * @param {GulpFile} file 当前文件对象
 * @param {string} err 异常信息
 * @return {PluginError} 返回异常对象
 */
function createError(file, err) {
  return new PluginError(pluginName, file.path + ': ' + err, {
    fileName: file.path,
    showStack: false
  });
}
/**
 * 处理 examplejs 任务
 *
 * @param {Object} options 配置项
 * @return {Object} 返回 gulp 任务处理器对象
 */
function gulpExamplejs(options) {
  options = options || {};
  return through.obj(function (file, enc, callback) {
    if (file.isStream()) {
      return callback(createError(file, 'Streaming not supported'));
    }
    if (file.isBuffer()) {
      var header;
      if (options.head) {
        header = String(fs.readFileSync(options.head));
      }
      var contents = examplejs.build(file.contents, {
        timeout: options.timeout,
        desc: options.desc || url.format(path.relative('', file.path)),
        header: header
      });
      file.contents = new Buffer(contents);
    }
    return callback(null, file);
  });
}
module.exports = gulpExamplejs;