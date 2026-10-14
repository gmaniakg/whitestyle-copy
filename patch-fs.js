const fs = require('fs');
const origReadlink = fs.readlink;
const origReadlinkSync = fs.readlinkSync;
const origPromisesReadlink = fs.promises ? fs.promises.readlink : null;

fs.readlinkSync = function(path, options) {
  try {
    return origReadlinkSync.call(fs, path, options);
  } catch (err) {
    if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
      const e = new Error('not a symlink (exFAT patch)');
      e.code = 'EINVAL';
      throw e;
    }
    throw err;
  }
};

fs.readlink = function(path, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = null;
  }
  return origReadlink.call(fs, path, options, (err, linkString) => {
    if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
      const e = new Error('not a symlink (exFAT patch)');
      e.code = 'EINVAL';
      return callback(e);
    }
    callback(err, linkString);
  });
};

if (origPromisesReadlink) {
  fs.promises.readlink = async function(path, options) {
    try {
      return await origPromisesReadlink.call(fs.promises, path, options);
    } catch (err) {
      if (err && (err.code === 'EISDIR' || err.code === 'UNKNOWN')) {
        const e = new Error('not a symlink (exFAT patch)');
        e.code = 'EINVAL';
        throw e;
      }
      throw err;
    }
  };
}
