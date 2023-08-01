import PdfContext from '/src/canvas2pdf';
import blobStream from 'blob-stream';

const editor = document.getElementById('editor_source');

const examplePicker = document.getElementById('example_picker');
examplePicker.onchange = function() {
  editor.textContent = document.getElementById(examplePicker.value).textContent;
  createPdf();
};

const iframe = document.querySelector('iframe');
const createPdf = function() {
  const text = editor.textContent;

  const stream = blobStream();
  const ctx = new PdfContext(stream);

  ctx.stream.on('finish', function() {
    iframe.src = ctx.stream.toBlobURL('application/pdf');
  });
  eval(text);
};
;
document.getElementById('redraw').addEventListener(
  'click',
  function() {
    createPdf();
  },
  false
);

createPdf();
