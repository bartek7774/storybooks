
exports.getCurrentYear = () => {
  return new Date().getFullYear();
};

exports.list = function (items, options) {
  let out = `<ul>`;
  for (let i = 0, n = items.length; i < n; i++) {
    out += `<li>
            ${options.fn(items[i])}
          </li>`;
  }
  return `${out} </ul>`;
}