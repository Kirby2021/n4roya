/**
 *
 * @param {String} string_
 */
module.exports = function (string_) {
  string_ = string_.replace(/_/g, " ");
  const split = string_.trim().split(" ");
  const splitFixed = [];
  for (e of split) {
    e = e.charAt(0).toUpperCase() + e.slice(1).toLocaleLowerCase();
    splitFixed.push(e);
  }
  return splitFixed.join(" ");
};
