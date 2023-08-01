const gm = require('gm');
const fs = require('fs');
if (!fs.existsSync('tests/img/pdf-to-png')) {
  fs.mkdirSync('tests/img/pdf-to-png');
}
fs.readdir('tests/img/pdf', function (err, items) {
  if (err) {
    throw err;
  }
  for (let i = 0, nitems = items.length; i < nitems; i++) {
    const item = items[i];
    gm('tests/img/pdf/' + item)
        .write('tests/img/pdf-to-png/' + item.substring(0, item.length - '.pdf'.length) + '.png', function (err) {
          if (err) {
            throw err;
          }
        });

  }
});

