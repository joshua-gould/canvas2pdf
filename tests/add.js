import PdfContext from '/src/canvas2pdf';
import blobStream from 'blob-stream';
import arc from '/tests/diff/arc';
import emptyArc from '/tests/diff/emptyArc';
import globalalpha from '/tests/diff/globalalpha';
import gradient from '/tests/diff/gradient';
import linecap from '/tests/diff/linecap';
import linewidth from '/tests/diff/linewidth';
import rgb from '/tests/diff/rgb';
import rgba from '/tests/diff/rgba';
import saveandrestore from '/tests/diff/saveandrestore';
import text from '/tests/diff/text';
import fillstyle from '/tests/diff/fillstyle';

const tests = [arc, emptyArc, fillstyle, globalalpha, gradient, linecap, linewidth, rgb, rgba, saveandrestore, text];
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const pdfText = document.getElementById('pdf-text');
const canvas = document.getElementById('canvas-output');


function done() {
  const e = document.createElement('div');
  e.id = 'test';
  document.body.appendChild(e);
}

const createImages = function(t) {
  const pdfContext = new PdfContext(blobStream(), {size: [CANVAS_WIDTH, CANVAS_HEIGHT]});
  const context = canvas.getContext('2d');
  t(context);
  pdfContext.stream.on('finish', function() {
    const blob = pdfContext.stream.toBlob('application/pdf');
    pdfText.textContent = URL.createObjectURL(blob);
    done();
  });
  t(pdfContext);
  pdfContext.end();

};
const search = window.location.search; //?name=arc
const name = search.substring(6);
let index = -1;
for (let i = 0; i < tests.length; i++) {
  const testName = tests[i].name;
  if (name === testName) {
    index = i;
    break;
  }
}
if (index !== -1) {
  createImages(tests[index]);
}
