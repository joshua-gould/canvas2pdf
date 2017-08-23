var gm = require('gm');
var fs = require('fs');
var resemble = require('node-resemble-js');
fs.readdir('test/img/png', function (err, items) {
  if (err) {
    throw err;
  }
  items.forEach(function (item) {
    var file1 = 'test/img/png/' + item;
    var file2 = 'test/img/pdf-to-png/' + item;
    gm.compare(file1, file2, {tolerance: 0.05}, function (err, isEqual, mismatch, raw, path1, path2) {
      if (err) {
        throw(err);
      }
      if (mismatch > 0.015) {
        console.log(path1, path2, mismatch);
      }
    });
  });

});


