# Canvas2PDF

Canvas2PDF exports your HTML canvas as PDF using JavaScript.
Note that this library generates actual PDF drawing calls to create a PDF with vector graphics,
unlike some alternate libraries which rasterize your canvas and place it as an image in your PDF.

## Usage

```javascript
import PdfContext from "/src/canvas2pdf";
import blobStream from "blob-stream";
import { saveAs } from "file-saver";

// Create a new PDF canvas context.
const ctx = new PdfContext(blobStream());

// draw your canvas like you would normally
ctx.fillStyle = "yellow";
ctx.fillRect(100, 100, 100, 100);
// more canvas drawing, etc...

// convert your PDF to a Blob and save to file
ctx.stream.on("finish", function () {
  const blob = ctx.stream.toBlob("application/pdf");
  saveAs(blob, "example.pdf", true);
});
ctx.end();
```

## Interactive Browser Demo

[Open Demo](https://joshua-gould.github.io/canvas2pdf/dist/index.html)

## Notes

- Calling fill and then stroke consecutively only executes fill
- Some canvas 2d context methods are not implemented yet (e.g. arcTo)

## License

MIT

## Developer Dependencies

- GraphicsMagick is required for running tests
