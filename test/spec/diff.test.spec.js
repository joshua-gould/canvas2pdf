jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 10;
console.log(page);

describe('canvas2pdf diff with canvas', function () {
  var examples = Object.keys(window.CANVAS2PDF_DIFF_TEST);
  var CANVAS_WIDTH = 600;
  var CANVAS_HEIGHT = 600;

  function drawExample(example, callback) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', '' + CANVAS_WIDTH);
    canvas.setAttribute('height', '' + CANVAS_HEIGHT);
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    var pdfGraphics = new canvas2pdf.PdfContext(blobStream(), {size: [CANVAS_WIDTH, CANVAS_HEIGHT]});

    example(ctx);
    example(pdfGraphics);

    pdfGraphics.end();
    pdfGraphics.stream.on('finish', function () {

      pdfFrame.src = pdfGraphics.stream.toBlobURL('application/pdf');

    });
  }

  examples.forEach(function (example) {

  });
});
