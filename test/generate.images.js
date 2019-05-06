var fs = require('fs');
var system = require('system');
var webPage = require('webpage');

function injectJSString(page, script) {
  page.evaluate(function (js) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = js;
    document.head.appendChild(script);
  }, script);
};
var dir = fs.workingDirectory;
if (fs.exists('test/img')) {
  fs.removeTree('test/img');
}
fs.makeTree('test/img');
fs.makeTree('test/img/png');
fs.makeTree('test/img/pdf');
fs.changeWorkingDirectory('test/img');
var scripts = [
  fs.absolute(dir + '/test/diff_test/init.js'),
  fs.absolute(dir + '/canvas2pdf.js'), fs.absolute(dir + '/lib/blob-stream.js'),
  fs.absolute(dir + '/lib/pdfkit.js')];

var specs = fs.list(fs.absolute(dir + '/test/diff_test/'));
CANVAS2PDF_DIFF_TEST = {};
for (var i = 0; i < specs.length; i++) {
  if (specs[i] !== '.' && specs[i] !== '..' && specs[i] !== 'init.js') {
    scripts.push(fs.absolute(dir + '/test/diff_test/' + specs[i]));
    require(fs.absolute(dir + '/test/diff_test/' + specs[i]));
  }
}

var exampleNames = Object.keys(CANVAS2PDF_DIFF_TEST);
var pdfExampleNames = exampleNames.slice();
var canvasExampleNames = exampleNames.slice();
// pdf
exampleNames.forEach(function (exampleName) {
  var page = webPage.create();
  scripts.forEach(function (script) {
    injectJSString(page, fs.read(script));
  });
  page.settings.localToRemoteUrlAccessEnabled = true;
  page.onConsoleMessage = function (msg) {
    console.log(msg);
  };
  page.onCallback = function (cbData) {
    pdfExampleNames.splice(pdfExampleNames.indexOf(cbData.name), 1);
    var out = fs.open('pdf/' + cbData.name + '.pdf', 'wb');
    out.write(cbData.data);
    out.close();
    if (pdfExampleNames.length === 0 && canvasExampleNames.length === 0) {
      phantom.exit();
    }
  };
  page.evaluate(function (name) {
    var CANVAS_WIDTH = 600;
    var CANVAS_HEIGHT = 600;
    var example = CANVAS2PDF_DIFF_TEST[name];
    document.body.innerHTML = '';

    var ctx = new canvas2pdf.PdfContext(blobStream(), {size: [CANVAS_WIDTH, CANVAS_HEIGHT]});
    example(ctx);
    ctx.stream.on('finish', function () {
      var blob = ctx.stream.toBlob('application/pdf');
      var reader = new FileReader();
      reader.onloadend = function () {
        window.callPhantom({data: reader.result, name: name});
      };
      reader.readAsBinaryString(blob);
    });
    ctx.end();
  }, exampleName);

});
// canvas
exampleNames.forEach(function (exampleName) {
  var page = webPage.create();
  scripts.forEach(function (script) {
    injectJSString(page, fs.read(script));
  });
  page.settings.localToRemoteUrlAccessEnabled = true;
  page.onConsoleMessage = function (msg) {
    console.log(msg);
  };
  page.onCallback = function (cbData) {
    canvasExampleNames.splice(canvasExampleNames.indexOf(cbData.name), 1);
    var out = fs.open('png/' + cbData.name + '.png', 'wb');
    var base64 = cbData.data.substring('data:image/png;base64,'.length);
    out.write(atob(base64));
    out.close();
    if (pdfExampleNames.length === 0 && canvasExampleNames.length === 0) {
      phantom.exit();
    }
  };
  page.evaluate(function (name) {
    var CANVAS_WIDTH = 600;
    var CANVAS_HEIGHT = 600;
    var example = CANVAS2PDF_DIFF_TEST[name];
    document.body.innerHTML = '';
    var canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = 'black';
    example(ctx);
    var base64 = canvas.toDataURL('image/png', 0);
    window.callPhantom({data: base64, name: name});
  }, exampleName);

});





