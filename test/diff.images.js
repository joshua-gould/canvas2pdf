var gm = require('gm');
var fs = require('fs');
var assert = require('assert');
fs.readdir('test/img/png', function (err, items) {
  if (err) {
    throw err;
  }
  var promises = [];
  var html = [];
  html.push('<html>');
  html.push('<body>');
  html.push('<div>');
  html.push('<div style="display: inline-block;width:600px;">PNG</div>');
  html.push('<div style="display: inline-block;width:600px;">PDF</div>');
  html.push('</div>');
  items.forEach(function (item) {
    var file1 = 'test/img/png/' + item;
    var file2 = 'test/img/pdf-to-png/' + item;

    promises.push(new Promise(function (resolve, reject) {
      gm.compare(file1, file2, {tolerance: 0.05}, function (err, isEqual, mismatch, raw, path1, path2) {
        if (err) {
          reject(err);
        }
        assert.ok(mismatch < 0.01, item + ' ' + mismatch);
        var file1 = 'test/img/png/' + item;
        var file2 = 'test/img/pdf-to-png/' + item;
        html.push('<div style="border-bottom:1px solid LightGrey;">');
        html.push('<p>' + item + ' - ' + mismatch + '</p>');
        html.push('<img alt="' + item + '" src="' + file1 + '">');
        html.push('<img alt="' + item + '" src="' + file2 + '">');
        html.push('</div>');
        resolve();
      });
    }));

  });
  Promise.all(promises).then(function () {
    html.push('</body>');
    html.push('</html>');
    fs.writeFileSync('diff.html', html.join(''));
  });

});


