# Canvas2PDF (fork)

Canvas2PDF is a HTML Canvas Renderer for PDF output. This means you can use the same CanvasRenderingContext2D (canvas.getContext('2d')) API to generate a PDF.

This library generates actual drawing calls to create a proper PDF with vector graphics, unlike many alternate libraries which just rasterize the canvas and place it as an image in a PDF.

This is a fork of https://github.com/joshua-gould/canvas2pdf, which aims to provide better support for the entire HTML canvas API as well as updates and fixes.

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

## Missing PDF API Calls

- setTransform 
- createPattern  
- setLineDash  
- drawFocusRing  
- createImageData  
- getImageData  
- putImageData  
- globalCompositeOperation  
- arcTo  
- ellipse

(there are more, which are not documented yet)

## Notes
+ Inspired by [Canvas2Svg](https://github.com/gliffy/canvas2svg)
+ Calling fill and then stroke consecutively only executes fill
+ Some canvas 2d context methods are not implemented yet (e.g. setTransform and arcTo)

## Status
[![Build Status](https://travis-ci.org/joshua-gould/canvas2pdf.svg?branch=master)](https://travis-ci.org/joshua-gould/canvas2pdf)

## License
MIT

# Developer Dependencies
+ Ghostscript and GraphicsMagick are required for running tests
