const moment = require('moment');

function truncate(str, len) {
  if (str.length > len && str.length > 0) {
    let new_s = str + " ";
    new_s = str.substr(0, len);
    new_s = str.substr(0, new_s.lastIndexOf(" "));
    new_s = (new_s.length > 0) ? new_s : str.substr(0, len);
    return new_s + '...';
  }
  return str;
}

function stripTags(input) {
  return input.replace(/<(?:.|\n)*?>/gm, '');
}

function getCurrentYear() {
  return new Date().getFullYear();
};

function list(items, options) {
  let out = `<ul>`;
  for (let i = 0, n = items.length; i < n; i++) {
    out += `<li>
            ${options.fn(items[i])}
          </li>`;
  }
  return `${out} </ul>`;
}

function formatDate(date, format) {
  return moment(date).format(format);
}

function whenPost(date) {
  return moment(date).startOf("h").fromNow();
}

function select(selected, options) {
  return options.fn(this)
    .replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"');
  // .replace(new RegExp('>'+selected+'</option>'),'selected="selected"$&');
}

function editIcon(storyUser, loggedUser, storyId, floating = true) {
  if (storyUser == loggedUser) {
    if (floating) {
      return `<a href="/stories/edit/${storyId}" class="btn-floating fab-pos waves-effect waves-light red"><i class="material-icons">mode_edit</i></a>`;
    }
    else {
      return `<a href="/stories/edit/${storyId}"><i class="material-icons">mode_edit</i></a>`;
    }
  } else {
    return '';
  }
}

function checkUser(storyUser, loggedUser, options) {
  if (storyUser == loggedUser) {
    return options.fn(this);
  }
  else {
    return '';
  }
}

module.exports = {
  getCurrentYear, truncate, stripTags, formatDate, whenPost, select, editIcon, checkUser
}