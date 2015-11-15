'use strict';
function calculate (calculation) {
  var parts = calculation.match(
    /(?:\-?[\d\.]+)|[-\+\*\/]|\s+/g
    );

  if( calculation !== parts.join('')) {

    throw new Error("couldn't parse calculation");
  }

  parts = parts.map(Function.prototype.call, String.prototype.trim);
  parts = parts.filter(Boolean);

  var nums = parts.map(parseFloat);
  var processed = [];

  for(var i = 0; i < parts.length; i++){
    if( nums[i] === nums[i]) {
      processed.push( nums[i]);
    } else {
      switch( parts[i] ) {
        case "+":
          continue;
        case "-":
          processed.push(nums[i++] * -1);
          continue;
        case "*":
          processed.push(processed.pop() * nums[++i]);
          break;
        case "/":
          processed.push(processed.pop() / nums[++i]);
          break;
        default:
          throw new Error("unknown operation: " + parts[i]);
      }
    }
  }
  return processed.reduce(function(result, elem) {
    return result + elem;
  });
}

// usage
console.log(" 2 + 6 * 4 / 2");
