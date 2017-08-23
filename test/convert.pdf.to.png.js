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

// gm.compare('/path/to/image1.jpg', '/path/to/another.png', function (err, isEqual, equality, raw, path1, path2) {
//   if (err) {
//     return;
//     throw(err);
//   }
//
//   // if the images were considered equal, `isEqual` will be true, otherwise, false.
//   console.log('The images were equal: %s', isEqual);
//
//   // to see the total equality returned by graphicsmagick we can inspect the `equality` argument.
//   console.log('Actual equality: %d', equality);
//
//   // inspect the raw output
//   console.log(raw);
//
//   // print file paths
//   console.log(path1, path2);
// });
