const gm = require("gm");
const fs = require("fs");
const assert = require("assert");
fs.readdir("tests/img/png", function (err, items) {
  if (err) {
    throw err;
  }
  const promises = [];
  const html = [];
  html.push("<html>");
  html.push("<body>");
  html.push("<div>");
  html.push('<div style="display: inline-block;width:600px;">PNG</div>');
  html.push('<div style="display: inline-block;width:600px;">PDF</div>');
  html.push("</div>");
  items.forEach(function (item) {
    const file1 = "tests/img/png/" + item;
    const file2 = "tests/img/pdf-to-png/" + item;

    promises.push(
      new Promise(function (resolve, reject) {
        gm.compare(
          file1,
          file2,
          { tolerance: 0.05 },
          function (err, isEqual, mismatch, raw, path1, path2) {
            if (err) {
              reject(err);
            }
            assert.ok(mismatch < 0.01, item + " " + mismatch);
            const file1 = "tests/img/png/" + item;
            const file2 = "tests/img/pdf-to-png/" + item;
            html.push('<div style="border-bottom:1px solid LightGrey;">');
            html.push("<p>" + item + " - " + mismatch + "</p>");
            html.push('<img alt="' + item + '" src="' + file1 + '">');
            html.push('<img alt="' + item + '" src="' + file2 + '">');
            html.push("</div>");
            resolve();
          },
        );
      }),
    );
  });
  Promise.all(promises).then(function () {
    html.push("</body>");
    html.push("</html>");
    fs.writeFileSync("diff.html", html.join(""));
  });
});
