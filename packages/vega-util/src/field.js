import accessor from './accessor';
import splitAccessPath from './splitAccessPath';
import stringValue from './stringValue'

export default function(field, name) {
  var path = splitAccessPath(field);
  var fn = function(p) {
    let path = p.map(s => stringValue(s));

    return function anonymous(_) {
      return path.reduce(function(acc, value) {
        let number = JSON.parse(value);
        let isNumber = typeof(number === 'number');

        return isNumber ? Reflect.get(acc, [number]) : Reflect.get(acc, value);
      }, _);
    };
  };

  return accessor(
    fn(path),
    [(field = path.length===1 ? path[0] : field)],
    name || field
  );
}
