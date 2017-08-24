var gm = require('gm');
var fs = require('fs');
if (!fs.existsSync('test/img/pdf-to-png')) {
  fs.mkdirSync('test/img/pdf-to-png');
}
fs.readdir('test/img/pdf', function (err, items) {
  if (err) {
    throw err;
  }
  for (var i = 0, nitems = items.length; i < nitems; i++) {
    var item = items[i];
    gm('test/img/pdf/' + item)
        .write('test/img/pdf-to-png/' + item.substring(0, item.length - '.pdf'.length) + '.png', function (err) {
          if (err) {
            throw err;
          }
        });

  }
});

