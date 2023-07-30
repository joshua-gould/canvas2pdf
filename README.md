# Canvas2PDF 

Canvas2PDF exports your HTML canvas as PDF using JavaScript. Note that this library generates actual PDF drawing calls to create a PDF with vector graphics, unlike some alternate libraries which rasterize your canvas and place it as an image in your PDF.

## How it works

We create a mock 2d canvas context. Use the canvas context like you would on a normal canvas. As you call methods, we 
use PDFKit to generate a PDF document.

## Browser Usage

```javascript
//Create a new PDF canvas context.
var ctx = new canvas2pdf.PdfContext(blobStream());

//draw your canvas like you would normally
ctx.fillStyle='yellow';
ctx.fillRect(100,100,100,100);
// more canvas drawing, etc...

//convert your PDF to a Blob and save to file
ctx.stream.on('finish', function () {
    var blob = ctx.stream.toBlob('application/pdf');
    saveAs(blob, 'example.pdf', true);
});
ctx.end();
```

## Node Usage

```javascript
PDFDocument = require('pdfkit')
const fs = require('fs')
const canvas2pdf = require('canvas2pdf')

const file = fs.createWriteStream('example.pdf')
//Create a new PDF canvas context.
const ctx = new canvas2pdf.PdfContext(file)

//draw your canvas like you would normally
ctx.fillStyle = 'yellow'
ctx.fillRect(100, 100, 100, 100)
// more canvas drawing, etc...

ctx.stream.on('finish', function () {
  file.end()
})
ctx.end()
```

## Dependencies
+ [PDFKit](http://pdfkit.org/)
+ [blob-stream](https://github.com/devongovett/blob-stream) required when using in a web browser.

## Using with node.js

`canvas2pdf` works with node.js. Note that neither a DOM or canvas library is needed.  

## Interactive Browser Demo
[Open Demo](https://joshua-gould.github.io/canvas2pdf/demo.html)

## Notes
+ Inspired by [Canvas2Svg](https://github.com/gliffy/canvas2svg)
+ Calling fill and then stroke consecutively only executes fill
+ Some canvas 2d context methods are not implemented yet (e.g. setTransform and arcTo)
+ 

## License
MIT

# Developer Dependencies
+ Ghostscript and GraphicsMagick are required for running tests
