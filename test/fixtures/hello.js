/**
 * @example 表达式相等预判
　```js
  var a = 1;
  var b = 2;
  console.log(a === b);
  // > false
　```
 */

/**
 * @example 表达式结果预判
　```js
  var a = 1;
  var b = 2;
  console.log(a + b);
  // > 3
　```
 */

/*
 * @example 表达式类型预判
　```js
  var a = 1;
  console.log(JSON.stringify(a + '1'));
  // > "11"
　```
 */


/*
 * @example 批量表达式预判
　```js
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  // > 0
  // > 1
  // > 2
  // > 3
  // > 4
　```
 */

/*
 * @example 异步执行预判
　```js
  var a = 1;
  setTimeout(function () {
    console.log(a);
    // > 2
    // * done
  }, 1000);
  a++;
　```
 */

/*
 * @example 异常执行预判
　```js
  var a = JSON.parse('#error');
  // * throw
　```
*/